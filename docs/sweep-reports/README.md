# Sweep Reports

Historical record of maintenance sweeps run against the OTR codebase.

## Structure

```
docs/sweep-reports/
├── README.md                     ← this file
├── TEMPLATE.md                   ← copy this for each new sweep
├── METRICS-COLLECTOR.sh          ← shell snippets that auto-fill the template
├── 001-2026-XX-XX.md            ← first sweep (in progress)
├── 002-2026-XX-XX.md            ← second sweep
└── ...
```

## Process

1. **Before running a sweep:** Copy `TEMPLATE.md` to a new file named
   `NNN-YYYY-MM-DD.md` (zero-padded sweep number + ISO date).
2. **Run pre-sweep baseline:** Execute `METRICS-COLLECTOR.sh --pre` against
   the current state. Paste output into the "PRE-SWEEP BASELINE" section.
3. **Run the sweep:** Use the latest maintenance sweep spec (currently
   v5.4.4) from `/mnt/user-data/outputs/`. Output goes into "PHASE 1
   FINDINGS" section.
4. **If Phase 2 runs (fixes applied):** Execute `METRICS-COLLECTOR.sh --post`
   after fixes commit. Paste output into "POST-SWEEP BASELINE".
5. **Fill in subjective sections:** trend commentary, decisions made,
   notes for next sweep.
6. **Commit the report:** `git add docs/sweep-reports/NNN-*.md && git commit`

### Modes

- `--snapshot` — print current metrics to stdout (one-shot).
- `--pre` — capture current metrics to `.pre-snapshot.md` (silent;
  only a confirmation message goes to stdout).
- `--post` — capture current metrics, print them, then append a
  unified diff vs. `.pre-snapshot.md`. Deletes the pre-snapshot
  when done.

Typical sweep workflow:

    bash docs/sweep-reports/METRICS-COLLECTOR.sh --pre
    # ... perform maintenance work ...
    bash docs/sweep-reports/METRICS-COLLECTOR.sh --post > docs/sweep-reports/sweep-NNN.md

## Why this exists

Without a structured historical record, sweeps are point-in-time exercises
that can't be compared. With this template, every sweep produces a
consistent artifact that shows:

- How the codebase changed (line counts, structure, dead code)
- How architecture strengthened over time (composite scores)
- Trend lines across sweeps (improvement, drift, regression)
- Time spent and efficiency ratios
- Decisions made + reasoning preserved

## Numbering

- Sweep #001 = first formal sweep using this template (2026-05-XX)
- All sweeps before this template existed are NOT retroactively numbered
- Comparisons begin sweep #002 (#001 establishes baseline)

## Schedule

Per v5.4.4 cadence guidance:
- **Pre-launch (until May 26):** Weekly
- **Post-launch (May 26 → Aug 26):** Monthly
- **Steady-state (Aug 26+):** Quarterly
- **Triggered:** After any major refactor, feature launch, or migration

## Sweep file naming convention

`NNN-YYYY-MM-DD.md` where NNN is zero-padded sweep number (001, 002, 003...).
Example: `003-2026-06-15.md` for the third sweep on June 15, 2026.

If two sweeps happen the same day: `NNN-YYYY-MM-DD-a.md` and `NNN-YYYY-MM-DD-b.md`.
