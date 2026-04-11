#!/usr/bin/env python3
"""
mbox-reader.py — Parse .mbox files for the Fenech Files pipeline

Usage:
    python3 mbox-reader.py <path-to-mbox>

Supports:
    - Standard .mbox files (Gmail Takeout, Thunderbird)
    - Apple Mail .mbox bundles (folder containing 'mbox' file)

Outputs:
    - Email count
    - Date range (oldest to newest)
    - Unique senders
    - Subjects (newest first)

Does NOT modify the source file.
"""

import sys
import os
import mailbox
from email import policy
from email.parser import BytesParser
from email.utils import parsedate_to_datetime
from datetime import datetime
from collections import defaultdict


def resolve_mbox_path(path):
    """
    Handle both plain .mbox files and Apple Mail .mbox bundles.
    Apple Mail exports as a folder with 'mbox' file inside.
    """
    if os.path.isdir(path):
        # Apple Mail bundle — look for 'mbox' file inside
        inner = os.path.join(path, 'mbox')
        if os.path.isfile(inner):
            return inner
        else:
            raise FileNotFoundError(
                f"'{path}' is a directory but contains no 'mbox' file.\n"
                f"Expected Apple Mail bundle structure: {path}/mbox"
            )
    elif os.path.isfile(path):
        return path
    else:
        raise FileNotFoundError(f"'{path}' does not exist.")


def get_body_text(msg):
    """Extract plain text body from email message."""
    body = ""

    if msg.is_multipart():
        for part in msg.walk():
            content_type = part.get_content_type()
            content_disposition = str(part.get("Content-Disposition", ""))

            # Skip attachments
            if "attachment" in content_disposition:
                continue

            if content_type == "text/plain":
                try:
                    payload = part.get_payload(decode=True)
                    if payload:
                        charset = part.get_content_charset() or 'utf-8'
                        body = payload.decode(charset, errors='replace')
                        break
                except Exception:
                    pass
    else:
        try:
            payload = msg.get_payload(decode=True)
            if payload:
                charset = msg.get_content_charset() or 'utf-8'
                body = payload.decode(charset, errors='replace')
        except Exception:
            body = str(msg.get_payload())

    return body.strip()


def get_attachments(msg):
    """List attachments in email message."""
    attachments = []

    if msg.is_multipart():
        for part in msg.walk():
            content_disposition = str(part.get("Content-Disposition", ""))
            if "attachment" in content_disposition:
                filename = part.get_filename()
                if filename:
                    attachments.append(filename)

    return attachments


def parse_date(date_str):
    """Parse email date string to datetime object."""
    if not date_str:
        return None
    try:
        return parsedate_to_datetime(date_str)
    except Exception:
        return None


def read_mbox(mbox_path):
    """Read and parse mbox file, return list of email dicts."""
    resolved_path = resolve_mbox_path(mbox_path)
    mbox = mailbox.mbox(resolved_path, create=False)

    emails = []

    for key, msg in mbox.items():
        try:
            date = parse_date(msg.get('Date'))

            email_data = {
                'message_id': msg.get('Message-ID', ''),
                'from': msg.get('From', ''),
                'to': msg.get('To', ''),
                'subject': msg.get('Subject', '(no subject)'),
                'date': date,
                'date_str': msg.get('Date', ''),
                'in_reply_to': msg.get('In-Reply-To', ''),
                'references': msg.get('References', ''),
                'body_preview': get_body_text(msg)[:200],
                'attachments': get_attachments(msg),
            }
            emails.append(email_data)
        except Exception as e:
            print(f"Warning: Could not parse email {key}: {e}", file=sys.stderr)

    mbox.close()
    return emails


def print_report(emails, mbox_path):
    """Print summary report of mbox contents."""
    if not emails:
        print(f"\nNo emails found in: {mbox_path}")
        return

    # Sort by date (newest first)
    dated_emails = [e for e in emails if e['date']]
    undated_emails = [e for e in emails if not e['date']]
    dated_emails.sort(key=lambda x: x['date'], reverse=True)
    sorted_emails = dated_emails + undated_emails

    # Collect stats
    senders = defaultdict(int)
    for e in emails:
        sender = e['from']
        if sender:
            # Simplify sender (extract email or name)
            senders[sender] += 1

    # Date range
    if dated_emails:
        oldest = min(e['date'] for e in dated_emails)
        newest = max(e['date'] for e in dated_emails)
    else:
        oldest = newest = None

    # Thread grouping check
    threaded = sum(1 for e in emails if e['in_reply_to'] or e['references'])

    # Attachments
    with_attachments = sum(1 for e in emails if e['attachments'])

    # Print report
    print("\n" + "=" * 60)
    print(f"MBOX REPORT: {os.path.basename(mbox_path)}")
    print("=" * 60)

    print(f"\nEMAIL COUNT: {len(emails)}")

    if oldest and newest:
        print(f"DATE RANGE:  {oldest.strftime('%Y-%m-%d')} to {newest.strftime('%Y-%m-%d')}")
    if undated_emails:
        print(f"UNDATED:     {len(undated_emails)} emails have no parseable date")

    print(f"\nTHREADING:   {threaded} emails have In-Reply-To or References headers")
    print(f"ATTACHMENTS: {with_attachments} emails have attachments")

    print(f"\n--- UNIQUE SENDERS ({len(senders)}) ---")
    for sender, count in sorted(senders.items(), key=lambda x: -x[1])[:20]:
        print(f"  [{count:3d}] {sender[:70]}")
    if len(senders) > 20:
        print(f"  ... and {len(senders) - 20} more")

    print(f"\n--- SUBJECTS (newest first, up to 30) ---")
    for i, email in enumerate(sorted_emails[:30]):
        date_str = email['date'].strftime('%Y-%m-%d') if email['date'] else 'NO DATE'
        subj = email['subject'][:60] if email['subject'] else '(no subject)'
        print(f"  {date_str}  {subj}")
    if len(sorted_emails) > 30:
        print(f"  ... and {len(sorted_emails) - 30} more")

    print("\n" + "=" * 60)
    print("PIPELINE INTEGRATION:")
    print("  This mbox can be processed at Step 0C (email split)")
    print("  Each email → individual .txt file")
    print("  Naming: YYYY-MM-DD_EMAIL_sender_subject-slug.txt")
    print("=" * 60 + "\n")


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 mbox-reader.py <path-to-mbox>")
        print()
        print("Examples:")
        print("  python3 mbox-reader.py ~/Desktop/Takeout.mbox")
        print("  python3 mbox-reader.py '~/Library/Mail/V10/Mailboxes/Archive.mbox'")
        sys.exit(1)

    mbox_path = os.path.expanduser(sys.argv[1])

    try:
        emails = read_mbox(mbox_path)
        print_report(emails, mbox_path)
    except FileNotFoundError as e:
        print(f"ERROR: {e}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"ERROR: Failed to read mbox: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
