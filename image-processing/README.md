# High-Speed Image Archive Processor

Parallel batch processing system for analyzing large image archives using the Anthropic Batch API (50% cost savings).

## Features

- **OCR Text Extraction**: Extract text from photos, screenshots, notebooks, receipts
- **Importance Analysis**: AI-powered scoring and categorization
- **Parallel Processing**: Run multiple batches concurrently
- **Checkpoint/Resume**: Automatically resume if interrupted
- **Searchable CSV Output**: Multiple filtered reports

## Installation

```bash
# Required
pip install anthropic pandas pillow

# Optional (for HEIC support)
pip install pillow-heif
```

### Full installation command:
```bash
pip install anthropic pandas pillow pillow-heif
```

## Configuration

Edit `config.json` before running:

```json
{
  "hard_drive_path": "/Volumes/YOUR_DRIVE/archive",
  "api_key": "sk-ant-api03-YOUR_KEY_HERE",
  "priority_folders": ["photos", "screenshots"],
  "output_folder": "./processing_results",
  "max_concurrent_batches": 5,
  "batch_size": 2000,
  "special_keywords": [
    "diversity",
    "investigative",
    "Deep Throat"
  ],
  "key_people": [
    "Verlander",
    "Cabrera",
    "Avila"
  ]
}
```

### Configuration Options

| Setting | Description | Default |
|---------|-------------|---------|
| `hard_drive_path` | Path to image archive | Required |
| `api_key` | Anthropic API key | Required |
| `priority_folders` | Folders to scan first | `["photos", "screenshots"]` |
| `output_folder` | Where to save results | `./processing_results` |
| `max_concurrent_batches` | Parallel batch limit | `5` |
| `batch_size` | Images per batch | `2000` |
| `special_keywords` | Keywords to flag | `[]` |
| `key_people` | People to flag | `[]` |

## Usage

### Run Everything
```bash
python batch_processor.py
```

### Run Specific Phase
```bash
# Just OCR
python batch_processor.py --phase ocr

# Just Analysis (requires OCR to be done)
python batch_processor.py --phase analysis

# Just CSV generation (requires analysis to be done)
python batch_processor.py --phase csv
```

### Custom Config
```bash
python batch_processor.py --config my_config.json
```

## Output Structure

```
processing_results/
├── extracted_text/      # OCR results (JSON per image)
│   ├── abc123def456.json
│   └── ...
├── analysis/            # Importance analysis (JSON per image)
│   ├── abc123def456.json
│   └── ...
├── csv/                 # CSV reports
│   ├── FULL_ANALYSIS.csv
│   ├── HIGH_VALUE_ONLY.csv
│   ├── SCORE_10.csv
│   ├── SCORE_9.csv
│   └── SCORE_8.csv
└── checkpoints/         # Resume data
    └── progress.json
```

### CSV Columns

| Column | Description |
|--------|-------------|
| `source_file` | Original image path |
| `score` | Importance (1-10) |
| `reason` | Brief explanation |
| `tags` | Matched keywords (pipe-separated) |
| `people` | Matched people (pipe-separated) |
| `date_mentioned` | Any date found |
| `emotions` | Detected emotions |
| `analyzed_at` | Timestamp |

## Resuming After Interruption

The system automatically saves progress after each batch completes. Simply run the same command again to resume:

```bash
# If interrupted, just run again
python batch_processor.py
```

The checkpoint tracks:
- Which files have completed OCR
- Which files have completed analysis
- Failed files with error messages
- Pending batches (auto-resumed)

## Time & Cost Estimates

### For 25,000 Images

| Metric | Estimate |
|--------|----------|
| **Scanning** | ~1 minute |
| **OCR Phase** | 4-6 hours |
| **Analysis Phase** | 2-3 hours |
| **CSV Generation** | <1 minute |
| **Total Time** | ~6-10 hours |

### Cost (with Batch API 50% discount)

| Phase | Per Image | 25K Images |
|-------|-----------|------------|
| OCR (Sonnet) | ~$0.003 | ~$75 |
| Analysis (Sonnet) | ~$0.0015 | ~$37 |
| **Total** | | **~$112** |

*Actual costs depend on image content and text length.*

## Scoring Criteria

| Score | Meaning |
|-------|---------|
| **10** | Direct evidence of major incidents, threats, wrongdoing |
| **9** | Personal communications with key people, emotional content |
| **8** | Key people mentioned with significant context |
| **7** | Interesting conflict, pressure, memorable moments |
| **6** | Notable people or events mentioned |
| **5** | General work content with some interest |
| **4** | Standard work content |
| **3** | Generic content |
| **2** | Mostly irrelevant |
| **1** | No relevant content |

## Supported Image Formats

- `.jpg` / `.jpeg`
- `.png`
- `.heic` (requires `pillow-heif`)

## Troubleshooting

### "Path does not exist"
Make sure your external drive is connected and the path in `config.json` is correct.

### "API key invalid"
Set your API key in `config.json` or as environment variable:
```bash
export ANTHROPIC_API_KEY=sk-ant-api03-...
```

### HEIC files skipped
Install HEIC support:
```bash
pip install pillow-heif
```

### Batch fails repeatedly
Check the `processing_results/checkpoints/progress.json` for error details.

### Out of memory
Reduce `batch_size` in config (try 500 or 1000).

## Example Run Output

```
╔══════════════════════════════════════════════════════════════╗
║     HIGH-SPEED IMAGE ARCHIVE PROCESSOR                       ║
║     Anthropic Batch API - 50% Cost Savings                   ║
╚══════════════════════════════════════════════════════════════╝

Configuration loaded from: config.json
Checkpoint loaded: ./processing_results/checkpoints/progress.json

============================================================
PHASE 1: SCANNING FOR IMAGES
============================================================
Base path: /Volumes/Archive/journalism
Priority folders: ['photos', 'screenshots']

Scanning: /Volumes/Archive/journalism/photos
  Found: 18,432 images
Scanning: /Volumes/Archive/journalism/screenshots
  Found: 6,891 images

============================================================
SCAN COMPLETE
============================================================
Total images found: 25,323
Already processed: 0
Remaining to process: 25,323

============================================================
PHASE 2: OCR (TEXT EXTRACTION)
============================================================
Images to process: 25,323
Batch size: 2000
Max concurrent batches: 5
Total batches: 13

🚀 Submitting OCR batch 1/13 (2000 images)...
    Batch 1 submitted: batch_abc123...
🚀 Submitting OCR batch 2/13 (2000 images)...
...

✓ OCR phase complete!
  Total processed: 25,323

============================================================
PHASE 3: IMPORTANCE ANALYSIS
============================================================
...

============================================================
PROCESSING COMPLETE
============================================================
Total time: 7h 23m 45s
Results saved to: ./processing_results

CSV files in: ./processing_results/csv
```

## License

Internal use only.
