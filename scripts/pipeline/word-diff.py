#!/usr/bin/env python3
"""word-diff.py — chapter/paragraph/word diff between two manuscript sources.

Read two of {docx, html, js}, extract chapter-keyed paragraph lists,
align chapters by uppercased title, and run a two-tier difflib diff
(paragraphs, then words within replace ranges). Emit deterministic
JSON and a thin markdown render.
"""
import argparse
import difflib
import html
import json
import re
import shutil
import subprocess
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path

H1_RE = re.compile(r"<h1\b[^>]*>([\s\S]*?)</h1>", re.IGNORECASE)
P_CLOSE_RE = re.compile(r"</p\s*>", re.IGNORECASE)
TAG_RE = re.compile(r"<[^>]+>")


def normalize(text):
    text = html.unescape(text)
    text = text.replace(" ", " ")
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def strip_and_normalize(fragment):
    return normalize(TAG_RE.sub("", fragment))


def extract_html(path):
    raw = Path(path).read_text(encoding="utf-8")
    chapters = {}
    h1_matches = list(H1_RE.finditer(raw))

    fm_end = h1_matches[0].start() if h1_matches else len(raw)
    fm_body = raw[:fm_end]
    fm_paras = [strip_and_normalize(p) for p in P_CLOSE_RE.split(fm_body)]
    fm_paras = [p for p in fm_paras if p]
    if fm_paras:
        chapters["__FRONT_MATTER__"] = fm_paras

    for i, m in enumerate(h1_matches):
        title = strip_and_normalize(m.group(1))
        body_start = m.end()
        body_end = h1_matches[i + 1].start() if i + 1 < len(h1_matches) else len(raw)
        body = raw[body_start:body_end]
        paras = [strip_and_normalize(p) for p in P_CLOSE_RE.split(body)]
        paras = [p for p in paras if p]
        if title in chapters:
            chapters[title].extend(paras)
        else:
            chapters[title] = paras
    return chapters


def extract_docx(path):
    if not shutil.which("pandoc"):
        sys.exit("pandoc binary not found on PATH")
    with tempfile.NamedTemporaryFile(suffix=".html", delete=False) as tf:
        tmp = Path(tf.name)
    try:
        subprocess.run(["pandoc", str(path), "-o", str(tmp)], check=True)
        return extract_html(tmp)
    finally:
        try:
            tmp.unlink()
        except OSError:
            pass


def extract_js(path):
    abs_path = str(Path(path).resolve())
    code = (
        f"import('file://{abs_path}').then(m => "
        f"process.stdout.write(JSON.stringify(m.CHAPTERS))).catch(e => {{ "
        f"console.error(e); process.exit(1); }})"
    )
    proc = subprocess.run(
        ["node", "--no-warnings", "-e", code],
        check=True, capture_output=True, text=True,
    )
    chapters_raw = json.loads(proc.stdout)

    result = {}
    last_non_hidden_title = None
    for c in chapters_raw:
        if c.get("section") in ("title", "copyright", "toc"):
            continue
        content = c.get("content", "") or ""
        stripped = TAG_RE.sub("", content)
        paras = [normalize(p) for p in re.split(r"\n\s*\n", stripped)]
        paras = [p for p in paras if p]
        if c.get("hidden"):
            target = last_non_hidden_title
            if target is None:
                target = (c.get("title") or "").strip() or "__HIDDEN_ORPHAN__"
            if target in result:
                result[target].extend(paras)
            else:
                result[target] = paras
        else:
            title = (c.get("title") or "").strip()
            last_non_hidden_title = title
            if title in result:
                result[title].extend(paras)
            else:
                result[title] = paras
    return result


EXTRACTORS = {
    "docx": extract_docx,
    "html": extract_html,
    "js": extract_js,
}


def word_diff(a_para, b_para):
    a_tokens = a_para.split()
    b_tokens = b_para.split()
    sm = difflib.SequenceMatcher(a=a_tokens, b=b_tokens, autojunk=False)
    out = []
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        out.append({
            "op": tag,
            "a_tokens": a_tokens[i1:i2],
            "b_tokens": b_tokens[j1:j2],
        })
    return out


def paragraph_diff(a_paras, b_paras):
    sm = difflib.SequenceMatcher(a=a_paras, b=b_paras, autojunk=False)
    diffs = []
    p_count = 0
    w_count = 0
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == "equal":
            continue
        if tag == "delete":
            for k in range(i1, i2):
                diffs.append({
                    "type": "delete",
                    "a_paragraph": a_paras[k],
                    "b_paragraph": None,
                    "word_diff": None,
                })
                p_count += 1
        elif tag == "insert":
            for k in range(j1, j2):
                diffs.append({
                    "type": "insert",
                    "a_paragraph": None,
                    "b_paragraph": b_paras[k],
                    "word_diff": None,
                })
                p_count += 1
        elif tag == "replace":
            a_slice = a_paras[i1:i2]
            b_slice = b_paras[j1:j2]
            common = min(len(a_slice), len(b_slice))
            for k in range(common):
                wd = word_diff(a_slice[k], b_slice[k])
                w_count += sum(1 for op in wd if op["op"] != "equal")
                diffs.append({
                    "type": "replace",
                    "a_paragraph": a_slice[k],
                    "b_paragraph": b_slice[k],
                    "word_diff": wd,
                })
                p_count += 1
            for k in range(common, len(a_slice)):
                diffs.append({
                    "type": "delete",
                    "a_paragraph": a_slice[k],
                    "b_paragraph": None,
                    "word_diff": None,
                })
                p_count += 1
            for k in range(common, len(b_slice)):
                diffs.append({
                    "type": "insert",
                    "a_paragraph": None,
                    "b_paragraph": b_slice[k],
                    "word_diff": None,
                })
                p_count += 1
    return diffs, p_count, w_count


def build_report(a_path, a_type, a_chapters, b_path, b_type, b_chapters):
    keys_a = {k.strip().upper(): k for k in a_chapters.keys()}
    keys_b = {k.strip().upper(): k for k in b_chapters.keys()}
    matched = sorted(set(keys_a) & set(keys_b))
    a_only = sorted(set(keys_a) - set(keys_b))
    b_only = sorted(set(keys_b) - set(keys_a))

    chapters_out = []
    total_p = 0
    total_w = 0
    identical = 0
    diffed = 0

    for key in matched:
        a_paras = a_chapters[keys_a[key]]
        b_paras = b_chapters[keys_b[key]]
        diffs, p_count, w_count = paragraph_diff(a_paras, b_paras)
        if p_count == 0:
            identical += 1
            chapters_out.append({
                "title": keys_a[key],
                "status": "identical",
                "paragraph_diffs": 0,
                "word_diffs": 0,
                "diffs": [],
            })
        else:
            diffed += 1
            total_p += p_count
            total_w += w_count
            chapters_out.append({
                "title": keys_a[key],
                "status": "diffs",
                "paragraph_diffs": p_count,
                "word_diffs": w_count,
                "diffs": diffs,
            })

    for key in a_only:
        chapters_out.append({
            "title": keys_a[key],
            "status": "source_a_only",
            "paragraph_diffs": 0,
            "word_diffs": 0,
            "diffs": [],
        })
    for key in b_only:
        chapters_out.append({
            "title": keys_b[key],
            "status": "source_b_only",
            "paragraph_diffs": 0,
            "word_diffs": 0,
            "diffs": [],
        })

    summary = {
        "chapters_a": len(a_chapters),
        "chapters_b": len(b_chapters),
        "matched": len(matched),
        "source_a_only": len(a_only),
        "source_b_only": len(b_only),
        "chapters_identical": identical,
        "chapters_with_diffs": diffed,
        "total_paragraph_diffs": total_p,
        "total_word_diffs": total_w,
    }
    return {
        "generated": datetime.now(timezone.utc).isoformat(),
        "source_a": {"path": a_path, "type": a_type},
        "source_b": {"path": b_path, "type": b_type},
        "summary": summary,
        "chapters": chapters_out,
    }


def truncate(s, n=200):
    if s is None:
        return ""
    return s if len(s) <= n else s[:n] + "…"


def render_markdown(report):
    s = report["summary"]
    out = []
    out.append("# word-diff baseline")
    out.append("")
    out.append(f"- Source A: `{report['source_a']['path']}` ({report['source_a']['type']})")
    out.append(f"- Source B: `{report['source_b']['path']}` ({report['source_b']['type']})")
    out.append(f"- Generated: {report['generated']}")
    out.append("")
    out.append("## Summary")
    out.append("")
    out.append("| Metric | Value |")
    out.append("|---|---:|")
    out.append(f"| Chapters in A | {s['chapters_a']} |")
    out.append(f"| Chapters in B | {s['chapters_b']} |")
    out.append(f"| Matched | {s['matched']} |")
    out.append(f"| Source A only | {s['source_a_only']} |")
    out.append(f"| Source B only | {s['source_b_only']} |")
    out.append(f"| Identical chapters | {s['chapters_identical']} |")
    out.append(f"| Chapters with diffs | {s['chapters_with_diffs']} |")
    out.append(f"| Total paragraph diffs | {s['total_paragraph_diffs']} |")
    out.append(f"| Total word diffs | {s['total_word_diffs']} |")
    out.append("")
    out.append("## Identical chapters")
    out.append("")
    identical = [c for c in report["chapters"] if c["status"] == "identical"]
    if identical:
        for c in identical:
            out.append(f"- {c['title']}")
    else:
        out.append("(none)")
    out.append("")

    diffed = [c for c in report["chapters"] if c["status"] == "diffs"]
    diffed.sort(key=lambda c: c["paragraph_diffs"], reverse=True)
    out.append("## Chapters with diffs")
    out.append("")
    if not diffed:
        out.append("(none)")
    for c in diffed:
        out.append(f"### {c['title']}")
        out.append("")
        out.append(f"- paragraph diffs: {c['paragraph_diffs']}")
        out.append(f"- word diffs: {c['word_diffs']}")
        out.append("")
        for d in c["diffs"]:
            if d["type"] == "delete":
                out.append(f"- DELETE (A only): {truncate(d['a_paragraph'])}")
            elif d["type"] == "insert":
                out.append(f"- INSERT (B only): {truncate(d['b_paragraph'])}")
            elif d["type"] == "replace":
                out.append("- REPLACE:")
                out.append(f"    - A: {truncate(d['a_paragraph'])}")
                out.append(f"    - B: {truncate(d['b_paragraph'])}")
                pieces = []
                for op in (d.get("word_diff") or []):
                    if op["op"] == "equal":
                        continue
                    a_w = " ".join(op["a_tokens"])
                    b_w = " ".join(op["b_tokens"])
                    if op["op"] == "delete":
                        pieces.append(f"- {a_w}")
                    elif op["op"] == "insert":
                        pieces.append(f"+ {b_w}")
                    elif op["op"] == "replace":
                        pieces.append(f"- {a_w} + {b_w}")
                if pieces:
                    out.append(f"    - words: {' | '.join(pieces)}")
        out.append("")

    out.append("## Source A only chapters")
    out.append("")
    a_only = [c for c in report["chapters"] if c["status"] == "source_a_only"]
    if a_only:
        for c in a_only:
            out.append(f"- {c['title']}")
    else:
        out.append("(none)")
    out.append("")
    out.append("## Source B only chapters")
    out.append("")
    b_only = [c for c in report["chapters"] if c["status"] == "source_b_only"]
    if b_only:
        for c in b_only:
            out.append(f"- {c['title']}")
    else:
        out.append("(none)")
    out.append("")
    return "\n".join(out)


def main():
    p = argparse.ArgumentParser(
        prog="word-diff.py",
        description=(
            "Compare two manuscript sources at the chapter/paragraph/word "
            "level. Sources may be .docx, .html, or chapters.js. Chapters "
            "are aligned by uppercased title. Diff uses difflib only."
        ),
    )
    p.add_argument("--source-a", required=True, help="Path to source A")
    p.add_argument("--type-a", required=True, choices=["docx", "html", "js"],
                   help="Source A type")
    p.add_argument("--source-b", required=True, help="Path to source B")
    p.add_argument("--type-b", required=True, choices=["docx", "html", "js"],
                   help="Source B type")
    p.add_argument("--output-md", required=True, help="Markdown output path")
    p.add_argument("--output-json", required=True, help="JSON output path")
    args = p.parse_args()

    a_chapters = EXTRACTORS[args.type_a](Path(args.source_a))
    b_chapters = EXTRACTORS[args.type_b](Path(args.source_b))

    report = build_report(
        args.source_a, args.type_a, a_chapters,
        args.source_b, args.type_b, b_chapters,
    )

    Path(args.output_json).write_text(
        json.dumps(report, sort_keys=True, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    Path(args.output_md).write_text(render_markdown(report), encoding="utf-8")

    s = report["summary"]
    print(
        f"matched={s['matched']} identical={s['chapters_identical']} "
        f"diffs={s['chapters_with_diffs']} pdiffs={s['total_paragraph_diffs']} "
        f"wdiffs={s['total_word_diffs']}",
        file=sys.stderr,
    )


if __name__ == "__main__":
    main()
