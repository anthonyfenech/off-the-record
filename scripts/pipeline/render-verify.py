#!/usr/bin/env python3
"""render-verify.py — visual-fidelity gate for chapters.js → Binge Mode.

Renders chapters.js through the Binge Mode template (replicated from
_recovered/binge-mode/binge-init.js), generates a pandoc reference from
the .docx, and diffs the two at three levels:

  1. Content  — paragraph-granularity diff on normalized bodies
  2. Structure — tag-count comparison (p, em, strong, span-by-class, br)
  3. Wrapper  — counts of protected classes (has-dateline, signature, etc.)

The wrapper-class counts are the locked baseline a candidate must preserve.
"""
import argparse
import difflib
import html
import json
import re
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

# Protected wrapper classes per spec
PROTECTED_CLASSES = [
    "has-dateline",
    "dateline",
    "signature",
    "small-caps",
    "scene-break",
    "email-line",
    "no-indent",
    "flashback-header",
]

TAG_RE = re.compile(r"<[^>]+>")
H1_RE = re.compile(r"<h1\b[^>]*>([\s\S]*?)</h1>", re.IGNORECASE)


# ─── extraction & normalization ──────────────────────────────────────────────

def normalize_text(s):
    s = html.unescape(s)
    s = s.replace(" ", " ")
    s = re.sub(r"\s+", " ", s)
    return s.strip()


def strip_class_attrs(html_str):
    """Remove class="..." from <p> and <span> tags only (other tags' classes kept)."""
    out = re.sub(
        r'<(p|span)\b([^>]*?)\s+class="[^"]*"([^>]*)>',
        r"<\1\2\3>",
        html_str,
        flags=re.IGNORECASE,
    )
    return out


def normalize_body_for_compare(body_html):
    s = strip_class_attrs(body_html)
    s = re.sub(r"<br\s*/\s*>", "<br>", s, flags=re.IGNORECASE)
    s = html.unescape(s)
    s = re.sub(r"\s+", " ", s).strip()
    return s


def extract_paragraphs(body_html):
    """Tag-stripped, normalized paragraph list (split on </p>)."""
    parts = re.split(r"</p\s*>", body_html, flags=re.IGNORECASE)
    out = []
    for p in parts:
        plain = normalize_text(TAG_RE.sub(" ", p))
        if plain:
            out.append(plain)
    return out


def count_tags(body_html):
    """Tag counts: p, em, strong, br + span class buckets."""
    counts = {
        "p": len(re.findall(r"<p\b", body_html, re.IGNORECASE)),
        "em": len(re.findall(r"<em\b", body_html, re.IGNORECASE)),
        "strong": len(re.findall(r"<strong\b", body_html, re.IGNORECASE)),
        "br": len(re.findall(r"<br\b", body_html, re.IGNORECASE)),
    }
    spans = {}
    for m in re.finditer(r'<span\s+class="([^"]+)"', body_html, re.IGNORECASE):
        spans[m.group(1)] = spans.get(m.group(1), 0) + 1
    bare_spans = len(re.findall(r"<span(?:\s[^>]*)?>", body_html, re.IGNORECASE)) - sum(spans.values())
    counts["span_classes"] = spans
    counts["span_bare"] = max(0, bare_spans)
    return counts


CLASS_ATTR_RE = re.compile(r'class="([^"]*)"')


def count_wrapper_classes(body_html):
    """Per-chapter counts: how many elements have each protected class.

    A class match is by whitespace-separated token, not substring — so
    `class="has-dateline"` does NOT count toward the `dateline` total.
    """
    counts = {cls: 0 for cls in PROTECTED_CLASSES}
    for m in CLASS_ATTR_RE.finditer(body_html):
        tokens = m.group(1).split()
        for cls in PROTECTED_CLASSES:
            if cls in tokens:
                counts[cls] += 1
    return counts


# ─── chapters.js loader ──────────────────────────────────────────────────────

def load_chapters_js(path):
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
    return json.loads(proc.stdout)


# ─── Binge renderer (replicates _recovered/binge-mode/binge-init.js:23-44) ───

def render_binge(chapters):
    """Apply the exact binge-init.js template. Returns full HTML string.

    Replicates the production renderer character-for-character (no locked
    chapters, since lockedChapters defaults to [] without localStorage).
    """
    parts = []
    n = len(chapters)
    for i, ch in enumerate(chapters):
        is_special = ch.get("section") in ("title", "toc")
        is_last = (i == n - 1)
        show_separator = not is_special and not is_last

        special_cls = " special-page" if is_special else ""
        slug = ch.get("slug") or ""
        title = ch.get("title") or ""
        content = ch.get("content") or ""

        header = "" if is_special else (
            f'<header class="chapter-header"><h2 class="chapter-title">{title}</h2></header>'
        )
        sep = '<p class="scene-break">***</p>' if show_separator else ""

        parts.append(
            f"\n        <article class=\"chapter-section{special_cls}\" id=\"{slug}\" data-chapter=\"{i}\">\n"
            f"            {header}\n"
            f'            <div class="chapter-body">{content}</div>\n'
            f"            {sep}\n"
            f"        </article>\n    "
        )
    body = "".join(parts)
    return (
        "<!DOCTYPE html>\n"
        "<html><head><meta charset=\"UTF-8\"><title>Binge Mode (rendered for verification)</title></head>\n"
        "<body>\n"
        '<main id="content">'
        f"{body}"
        "</main>\n"
        "</body></html>\n"
    )


# ─── parse rendered Binge into per-article slices ────────────────────────────

ARTICLE_OPEN_RE = re.compile(r'<article\s+class="chapter-section([^"]*)"\s+id="([^"]*)"\s+data-chapter="(\d+)"\s*>', re.IGNORECASE)

def parse_binge_articles(rendered_html):
    """Return list of {slug, title, body, is_special, data_chapter:int}.

    Uses depth-counted scan for the chapter-body <div>'s matching </div>,
    so nested <div class="toc-page"> etc. don't fool the extractor.
    """
    articles = []
    for m in ARTICLE_OPEN_RE.finditer(rendered_html):
        article_cls = m.group(1)
        slug = m.group(2)
        data_ch = int(m.group(3))
        is_special = "special-page" in article_cls

        # find this article's end tag (next </article>)
        art_end = rendered_html.find("</article>", m.end())
        if art_end == -1:
            continue
        art_inner = rendered_html[m.end():art_end]

        # title from <h2 class="chapter-title">…</h2> (may not exist for special)
        title = ""
        ht = re.search(r'<h2 class="chapter-title">([\s\S]*?)</h2>', art_inner)
        if ht:
            title = normalize_text(TAG_RE.sub("", ht.group(1)))

        # locate body div with depth-tracked matching close
        bm = re.search(r'<div class="chapter-body">', art_inner)
        if not bm:
            articles.append({"slug": slug, "title": title, "body": "", "is_special": is_special, "data_chapter": data_ch})
            continue
        body_start = bm.end()
        depth = 1
        pos = body_start
        end = None
        while pos < len(art_inner):
            no = art_inner.find("<div", pos)
            nc = art_inner.find("</div>", pos)
            if nc == -1:
                break
            if no != -1 and no < nc:
                # confirm it's a tag, not <divx ...>
                if art_inner[no:no+5] == "<div " or art_inner[no:no+5] == "<div>":
                    depth += 1
                pos = no + 4
            else:
                depth -= 1
                if depth == 0:
                    end = nc
                    break
                pos = nc + 6
        body = art_inner[body_start:end] if end is not None else ""
        articles.append({
            "slug": slug,
            "title": title,
            "body": body,
            "is_special": is_special,
            "data_chapter": data_ch,
        })
    return articles


# ─── parse pandoc reference into per-chapter slices ──────────────────────────

def parse_pandoc_chapters(reference_html):
    """{title_upper: body_html} ; skip pre-first-<h1> front-matter."""
    out = {}
    matches = list(H1_RE.finditer(reference_html))
    for i, m in enumerate(matches):
        title = normalize_text(TAG_RE.sub("", m.group(1)))
        key = title.strip().upper()
        body_start = m.end()
        body_end = matches[i + 1].start() if i + 1 < len(matches) else len(reference_html)
        body = reference_html[body_start:body_end]
        if key in out:
            out[key] = out[key] + "\n" + body
        else:
            out[key] = body
    return out


# ─── build comparison view: skip front-matter, concat hidden subs ────────────

def build_comparison_view(chapters, articles):
    """Returns {title_upper: concatenated_body_html} keyed by upper-trimmed title.

    Skips chapters with section in {'title','copyright','toc'}. Hidden chapters
    get their body appended to the previous non-hidden chapter (same logic as
    word-diff.py extract_js).
    """
    view = {}
    last_key = None
    # article order must match chapter order; defensive map
    by_idx = {a["data_chapter"]: a for a in articles}
    for i, ch in enumerate(chapters):
        if ch.get("section") in ("title", "copyright", "toc"):
            continue
        art = by_idx.get(i)
        if art is None:
            continue
        if ch.get("hidden"):
            if last_key is not None:
                view[last_key] = view[last_key] + "\n\n" + art["body"]
                continue
            # orphan: treat as own bucket
            key = (ch.get("title") or "").strip().upper()
            view[key] = (view.get(key, "") + ("\n\n" if view.get(key) else "") + art["body"]).strip()
        else:
            key = (ch.get("title") or "").strip().upper()
            last_key = key
            if key in view:
                view[key] = view[key] + "\n\n" + art["body"]
            else:
                view[key] = art["body"]
    return view


# ─── per-chapter diff ────────────────────────────────────────────────────────

def diff_chapter(rendered_body, pandoc_body):
    """Return {status, paragraph_diffs, paragraph_diff_entries, struct_rendered, struct_pandoc, struct_mismatches}."""
    # Tag counts: from the UN-stripped HTML (so we see classes for span buckets)
    struct_r = count_tags(rendered_body)
    struct_p = count_tags(pandoc_body)

    # Content paragraphs: normalize first
    norm_r = normalize_body_for_compare(rendered_body)
    norm_p = normalize_body_for_compare(pandoc_body)

    if norm_r == norm_p:
        return {
            "status": "content_identical",
            "paragraph_diffs": 0,
            "paragraph_diff_entries": [],
            "struct_rendered": struct_r,
            "struct_pandoc": struct_p,
            "struct_mismatches": _struct_mismatches(struct_r, struct_p),
        }

    # Paragraph-level diff
    paras_r = extract_paragraphs(rendered_body)
    paras_p = extract_paragraphs(pandoc_body)
    sm = difflib.SequenceMatcher(a=paras_r, b=paras_p, autojunk=False)
    entries = []
    diff_count = 0
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == "equal":
            continue
        if tag == "delete":
            for k in range(i1, i2):
                entries.append({"type": "rendered_only", "rendered": paras_r[k], "pandoc": None})
                diff_count += 1
        elif tag == "insert":
            for k in range(j1, j2):
                entries.append({"type": "pandoc_only", "rendered": None, "pandoc": paras_p[k]})
                diff_count += 1
        elif tag == "replace":
            a_slice = paras_r[i1:i2]
            b_slice = paras_p[j1:j2]
            common = min(len(a_slice), len(b_slice))
            for k in range(common):
                entries.append({"type": "modified", "rendered": a_slice[k], "pandoc": b_slice[k]})
                diff_count += 1
            for k in range(common, len(a_slice)):
                entries.append({"type": "rendered_only", "rendered": a_slice[k], "pandoc": None})
                diff_count += 1
            for k in range(common, len(b_slice)):
                entries.append({"type": "pandoc_only", "rendered": None, "pandoc": b_slice[k]})
                diff_count += 1
    return {
        "status": "content_diffs",
        "paragraph_diffs": diff_count,
        "paragraph_diff_entries": entries,
        "struct_rendered": struct_r,
        "struct_pandoc": struct_p,
        "struct_mismatches": _struct_mismatches(struct_r, struct_p),
    }


def _struct_mismatches(r, p):
    out = []
    for tag in ("p", "em", "strong", "br"):
        if r[tag] != p[tag]:
            out.append({"tag": tag, "rendered": r[tag], "pandoc": p[tag], "delta": r[tag] - p[tag]})
    # span classes: rendered side will have many; pandoc has zero. Aggregate.
    rendered_span_total = sum(r["span_classes"].values()) + r["span_bare"]
    pandoc_span_total = sum(p["span_classes"].values()) + p["span_bare"]
    if rendered_span_total != pandoc_span_total:
        out.append({"tag": "<span> total", "rendered": rendered_span_total, "pandoc": pandoc_span_total, "delta": rendered_span_total - pandoc_span_total})
    return out


# ─── markdown rendering ──────────────────────────────────────────────────────

def truncate(s, n=200):
    if s is None:
        return ""
    return s if len(s) <= n else s[:n] + "…"


def render_markdown(report):
    s = report["summary"]
    out = []
    out.append("# render-verify baseline")
    out.append("")
    out.append(f"- Chapters source: `{report['chapters_js']}`")
    out.append(f"- Docx reference:  `{report['docx']}`")
    out.append(f"- Rendered HTML:   `{report['rendered_html']}`")
    out.append(f"- Pandoc HTML:     `{report['reference_html']}`")
    out.append(f"- Generated:       {report['generated']}")
    out.append("")
    out.append("## Summary")
    out.append("")
    out.append("| Metric | Value |")
    out.append("|---|---:|")
    out.append(f"| Chapters in rendered Binge (incl. front-matter) | {s['rendered_articles_total']} |")
    out.append(f"| Chapters in comparison view (excl. front-matter) | {s['comparison_chapters_a']} |")
    out.append(f"| Pandoc reference chapters | {s['comparison_chapters_b']} |")
    out.append(f"| Matched (by upper title) | {s['matched_chapters']} |")
    out.append(f"| Content-identical | {s['content_identical']} |")
    out.append(f"| Content with diffs | {s['content_diffs']} |")
    out.append(f"| Total paragraph diffs | {s['total_paragraph_diffs']} |")
    out.append(f"| Chapters with structure mismatches | {s['structure_mismatches']} |")
    out.append(f"| Rendered-only chapters | {s['rendered_only_count']} |")
    out.append(f"| Pandoc-only chapters | {s['pandoc_only_count']} |")
    out.append("")

    out.append("## Wrapper-class baseline (protected)")
    out.append("")
    out.append("These are the counts in the **current** rendered chapters.js. A future")
    out.append("candidate MUST preserve every one of them — a drop in any count is a")
    out.append("formatting regression.")
    out.append("")
    out.append("| Class | Count |")
    out.append("|---|---:|")
    for cls in PROTECTED_CLASSES:
        out.append(f"| `{cls}` | {s['wrapper_class_counts'].get(cls, 0)} |")
    out.append("")

    out.append("## Content-identical chapters")
    out.append("")
    ident = [c for c in report["chapters"] if c["status"] == "content_identical"]
    if ident:
        for c in ident:
            out.append(f"- {c['title']}")
    else:
        out.append("(none)")
    out.append("")

    diffed = [c for c in report["chapters"] if c["status"] == "content_diffs"]
    diffed.sort(key=lambda c: c["paragraph_diffs"], reverse=True)
    out.append("## Chapters with content diffs")
    out.append("")
    if not diffed:
        out.append("(none)")
    for c in diffed:
        out.append(f"### {c['title']}")
        out.append("")
        out.append(f"- paragraph diffs: {c['paragraph_diffs']}")
        if c.get("struct_mismatches"):
            sm = ", ".join(f"{m['tag']}: rendered={m['rendered']}, pandoc={m['pandoc']} ({m['delta']:+d})" for m in c["struct_mismatches"])
            out.append(f"- structure mismatches: {sm}")
        out.append("")
        for d in c.get("paragraph_diff_entries", [])[:20]:
            if d["type"] == "rendered_only":
                out.append(f"- RENDERED only: {truncate(d['rendered'])}")
            elif d["type"] == "pandoc_only":
                out.append(f"- PANDOC only:   {truncate(d['pandoc'])}")
            else:
                out.append(f"- MODIFIED:")
                out.append(f"    - rendered: {truncate(d['rendered'])}")
                out.append(f"    - pandoc:   {truncate(d['pandoc'])}")
        if len(c.get("paragraph_diff_entries", [])) > 20:
            out.append(f"- … {len(c['paragraph_diff_entries']) - 20} more diff entries (see JSON)")
        out.append("")

    out.append("## Chapters with structure mismatches only")
    out.append("")
    struct_only = [c for c in report["chapters"] if c["status"] == "content_identical" and c.get("struct_mismatches")]
    if struct_only:
        for c in struct_only:
            sm = ", ".join(f"{m['tag']}: rendered={m['rendered']}, pandoc={m['pandoc']} ({m['delta']:+d})" for m in c["struct_mismatches"])
            out.append(f"- {c['title']}: {sm}")
    else:
        out.append("(none — every content-identical chapter also matched tag counts, modulo span classes)")
    out.append("")

    if s.get("rendered_only_count") or s.get("pandoc_only_count"):
        out.append("## Title alignment gaps")
        out.append("")
        for c in report["chapters"]:
            if c["status"] == "rendered_only":
                out.append(f"- RENDERED only (no pandoc match): {c['title']}")
            elif c["status"] == "pandoc_only":
                out.append(f"- PANDOC only (no rendered match): {c['title']}")
        out.append("")
    return "\n".join(out)


# ─── orchestration ───────────────────────────────────────────────────────────

def main():
    p = argparse.ArgumentParser(
        prog="render-verify.py",
        description=(
            "Render chapters.js through the Binge Mode template and diff "
            "against a pandoc reference of the .docx, at content / structure / "
            "wrapper-class level."
        ),
    )
    p.add_argument("--chapters-js", required=True, help="Path to chapters.js")
    p.add_argument("--docx", required=True, help="Path to manuscript .docx")
    p.add_argument("--output-md", required=True, help="Markdown report path")
    p.add_argument("--output-json", required=True, help="JSON report path")
    p.add_argument("--rendered-html", default="/tmp/rendered-binge.html", help="Rendered Binge output path")
    p.add_argument("--reference-html", default="/tmp/pandoc-reference.html", help="Pandoc reference output path")
    args = p.parse_args()

    chapters = load_chapters_js(args.chapters_js)
    rendered = render_binge(chapters)
    Path(args.rendered_html).write_text(rendered, encoding="utf-8")

    subprocess.run(["pandoc", args.docx, "-o", args.reference_html], check=True)
    reference_html = Path(args.reference_html).read_text(encoding="utf-8")

    articles = parse_binge_articles(rendered)
    binge_view = build_comparison_view(chapters, articles)
    pandoc_view = parse_pandoc_chapters(reference_html)

    # Global wrapper class counts (sum across comparison-view bodies)
    wrapper_totals = {cls: 0 for cls in PROTECTED_CLASSES}
    for body in binge_view.values():
        c = count_wrapper_classes(body)
        for cls in PROTECTED_CLASSES:
            wrapper_totals[cls] += c[cls]

    # Match & diff
    keys_a = sorted(binge_view.keys())
    keys_b = sorted(pandoc_view.keys())
    matched = sorted(set(keys_a) & set(keys_b))
    a_only = sorted(set(keys_a) - set(keys_b))
    b_only = sorted(set(keys_b) - set(keys_a))

    chapters_out = []
    content_identical = 0
    content_diffs = 0
    total_para_diffs = 0
    struct_mismatch_count = 0

    for key in matched:
        d = diff_chapter(binge_view[key], pandoc_view[key])
        if d["status"] == "content_identical":
            content_identical += 1
        else:
            content_diffs += 1
            total_para_diffs += d["paragraph_diffs"]
        if d["struct_mismatches"]:
            struct_mismatch_count += 1
        chapters_out.append({
            "title": key,
            "status": d["status"],
            "paragraph_diffs": d["paragraph_diffs"],
            "paragraph_diff_entries": d["paragraph_diff_entries"],
            "struct_rendered": d["struct_rendered"],
            "struct_pandoc": d["struct_pandoc"],
            "struct_mismatches": d["struct_mismatches"],
        })

    for key in a_only:
        chapters_out.append({
            "title": key,
            "status": "rendered_only",
            "paragraph_diffs": 0,
            "paragraph_diff_entries": [],
            "struct_rendered": count_tags(binge_view[key]),
            "struct_pandoc": None,
            "struct_mismatches": [],
        })
    for key in b_only:
        chapters_out.append({
            "title": key,
            "status": "pandoc_only",
            "paragraph_diffs": 0,
            "paragraph_diff_entries": [],
            "struct_rendered": None,
            "struct_pandoc": count_tags(pandoc_view[key]),
            "struct_mismatches": [],
        })

    summary = {
        "rendered_articles_total": len(articles),
        "comparison_chapters_a": len(binge_view),
        "comparison_chapters_b": len(pandoc_view),
        "matched_chapters": len(matched),
        "content_identical": content_identical,
        "content_diffs": content_diffs,
        "total_paragraph_diffs": total_para_diffs,
        "structure_mismatches": struct_mismatch_count,
        "rendered_only_count": len(a_only),
        "pandoc_only_count": len(b_only),
        "wrapper_class_counts": wrapper_totals,
    }

    report = {
        "generated": datetime.now(timezone.utc).isoformat(),
        "chapters_js": args.chapters_js,
        "docx": args.docx,
        "rendered_html": args.rendered_html,
        "reference_html": args.reference_html,
        "summary": summary,
        "chapters": chapters_out,
    }

    Path(args.output_json).write_text(
        json.dumps(report, sort_keys=True, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    Path(args.output_md).write_text(render_markdown(report), encoding="utf-8")

    print(
        f"matched={summary['matched_chapters']} "
        f"identical={summary['content_identical']} "
        f"diffs={summary['content_diffs']} "
        f"pdiffs={summary['total_paragraph_diffs']} "
        f"struct_mismatch={summary['structure_mismatches']}",
        file=sys.stderr,
    )


if __name__ == "__main__":
    main()
