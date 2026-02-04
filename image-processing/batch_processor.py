#!/usr/bin/env python3
"""
High-Speed Image Archive Processor
===================================
Parallel batch processing system for analyzing large image archives.
Uses Anthropic Batch API for 50% cost savings on OCR and analysis.

Usage:
    python batch_processor.py [--config config.json] [--phase ocr|analysis|all]
"""

import anthropic
import base64
import json
import os
import sys
import time
import argparse
from pathlib import Path
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import Optional
import hashlib

# Optional imports with fallbacks
try:
    import pandas as pd
    HAS_PANDAS = True
except ImportError:
    HAS_PANDAS = False
    print("Warning: pandas not installed. CSV generation will use basic method.")

try:
    from PIL import Image
    import pillow_heif
    pillow_heif.register_heif_opener()
    HAS_HEIF = True
except ImportError:
    HAS_HEIF = False
    print("Warning: pillow-heif not installed. HEIC files will be skipped.")


# =============================================================================
# CONFIGURATION
# =============================================================================

class Config:
    """Load and validate configuration."""

    def __init__(self, config_path: str = "config.json"):
        with open(config_path, 'r') as f:
            data = json.load(f)

        self.hard_drive_path = Path(data.get("hard_drive_path", "/Volumes/CHANGEME/archive"))
        self.api_key = data.get("api_key", os.environ.get("ANTHROPIC_API_KEY", ""))
        self.priority_folders = data.get("priority_folders", ["photos", "screenshots"])
        self.output_folder = Path(data.get("output_folder", "./processing_results"))
        self.max_concurrent_batches = data.get("max_concurrent_batches", 5)
        self.batch_size = data.get("batch_size", 2000)
        self.special_keywords = data.get("special_keywords", [])
        self.key_people = data.get("key_people", [])

        # Validate
        if not self.api_key or self.api_key == "YOUR_API_KEY_HERE":
            raise ValueError("Please set your API key in config.json or ANTHROPIC_API_KEY environment variable")

        # Create output directories
        self.output_folder.mkdir(parents=True, exist_ok=True)
        (self.output_folder / "extracted_text").mkdir(exist_ok=True)
        (self.output_folder / "analysis").mkdir(exist_ok=True)
        (self.output_folder / "checkpoints").mkdir(exist_ok=True)
        (self.output_folder / "csv").mkdir(exist_ok=True)


# =============================================================================
# CHECKPOINT SYSTEM
# =============================================================================

class Checkpoint:
    """Manage processing checkpoints for resume capability."""

    def __init__(self, output_folder: Path):
        self.checkpoint_file = output_folder / "checkpoints" / "progress.json"
        self.data = self._load()

    def _load(self) -> dict:
        """Load checkpoint from disk."""
        if self.checkpoint_file.exists():
            try:
                with open(self.checkpoint_file, 'r') as f:
                    return json.load(f)
            except json.JSONDecodeError:
                print("Warning: Corrupted checkpoint file, starting fresh")
                return self._default()
        return self._default()

    def _default(self) -> dict:
        """Default checkpoint structure."""
        return {
            "ocr_completed": [],
            "analysis_completed": [],
            "failed_files": [],
            "pending_batches": {},
            "last_updated": None,
            "stats": {
                "total_scanned": 0,
                "total_ocr_completed": 0,
                "total_analysis_completed": 0,
                "total_failed": 0
            }
        }

    def save(self):
        """Save checkpoint to disk."""
        self.data["last_updated"] = datetime.now().isoformat()
        self.data["stats"]["total_ocr_completed"] = len(self.data["ocr_completed"])
        self.data["stats"]["total_analysis_completed"] = len(self.data["analysis_completed"])
        self.data["stats"]["total_failed"] = len(self.data["failed_files"])

        with open(self.checkpoint_file, 'w') as f:
            json.dump(self.data, f, indent=2)

    def is_ocr_completed(self, file_path: str) -> bool:
        """Check if OCR is done for a file."""
        return file_path in self.data["ocr_completed"]

    def is_analysis_completed(self, file_path: str) -> bool:
        """Check if analysis is done for a file."""
        return file_path in self.data["analysis_completed"]

    def mark_ocr_completed(self, file_paths: list):
        """Mark files as OCR completed."""
        self.data["ocr_completed"].extend(file_paths)
        self.save()

    def mark_analysis_completed(self, file_paths: list):
        """Mark files as analysis completed."""
        self.data["analysis_completed"].extend(file_paths)
        self.save()

    def mark_failed(self, file_path: str, error: str):
        """Mark a file as failed."""
        self.data["failed_files"].append({
            "path": file_path,
            "error": error,
            "timestamp": datetime.now().isoformat()
        })

    def add_pending_batch(self, batch_id: str, file_paths: list, batch_type: str):
        """Track a pending batch."""
        self.data["pending_batches"][batch_id] = {
            "files": file_paths,
            "type": batch_type,
            "submitted": datetime.now().isoformat()
        }
        self.save()

    def remove_pending_batch(self, batch_id: str):
        """Remove a completed batch."""
        if batch_id in self.data["pending_batches"]:
            del self.data["pending_batches"][batch_id]
            self.save()


# =============================================================================
# IMAGE SCANNER
# =============================================================================

class ImageScanner:
    """Scan directories for images."""

    SUPPORTED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.heic'}

    def __init__(self, config: Config, checkpoint: Checkpoint):
        self.config = config
        self.checkpoint = checkpoint

    def scan(self, phase: str = "ocr") -> list:
        """
        Scan for images that need processing.

        Args:
            phase: "ocr" or "analysis" - determines which checkpoint to check

        Returns:
            List of image paths to process
        """
        print(f"\n{'='*60}")
        print("PHASE 1: SCANNING FOR IMAGES")
        print(f"{'='*60}")
        print(f"Base path: {self.config.hard_drive_path}")
        print(f"Priority folders: {self.config.priority_folders}")

        all_images = []

        # Check if base path exists
        if not self.config.hard_drive_path.exists():
            print(f"Error: Path does not exist: {self.config.hard_drive_path}")
            print("Make sure your external drive is connected.")
            return []

        # Scan priority folders first
        for folder_name in self.config.priority_folders:
            folder_path = self.config.hard_drive_path / folder_name
            if folder_path.exists():
                print(f"\nScanning: {folder_path}")
                images = self._scan_folder(folder_path)
                all_images.extend(images)
                print(f"  Found: {len(images)} images")

        # Also scan root for any images
        print(f"\nScanning root: {self.config.hard_drive_path}")
        root_images = self._scan_folder(self.config.hard_drive_path, depth=1)
        all_images.extend(root_images)
        print(f"  Found: {len(root_images)} images in root")

        # Remove duplicates
        all_images = list(set(all_images))

        # Filter out already processed
        if phase == "ocr":
            remaining = [p for p in all_images if not self.checkpoint.is_ocr_completed(p)]
        else:
            remaining = [p for p in all_images if not self.checkpoint.is_analysis_completed(p)]

        # Update stats
        self.checkpoint.data["stats"]["total_scanned"] = len(all_images)
        self.checkpoint.save()

        print(f"\n{'='*60}")
        print(f"SCAN COMPLETE")
        print(f"{'='*60}")
        print(f"Total images found: {len(all_images)}")
        print(f"Already processed: {len(all_images) - len(remaining)}")
        print(f"Remaining to process: {len(remaining)}")

        return remaining

    def _scan_folder(self, folder: Path, depth: int = None) -> list:
        """Recursively scan a folder for images."""
        images = []

        try:
            if depth == 1:
                # Only scan immediate children
                items = list(folder.iterdir())
            else:
                # Recursive scan
                items = list(folder.rglob("*"))

            for item in items:
                if item.is_file():
                    ext = item.suffix.lower()
                    if ext in self.SUPPORTED_EXTENSIONS:
                        # Skip HEIC if not supported
                        if ext == '.heic' and not HAS_HEIF:
                            continue
                        images.append(str(item))
        except PermissionError:
            print(f"  Permission denied: {folder}")
        except Exception as e:
            print(f"  Error scanning {folder}: {e}")

        return images


# =============================================================================
# IMAGE ENCODER
# =============================================================================

class ImageEncoder:
    """Encode images to base64 for API submission."""

    MEDIA_TYPES = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.heic': 'image/jpeg',  # HEIC converted to JPEG
    }

    @classmethod
    def encode(cls, file_path: str) -> tuple:
        """
        Encode an image to base64.

        Returns:
            Tuple of (base64_data, media_type) or (None, None) on error
        """
        path = Path(file_path)
        ext = path.suffix.lower()

        try:
            if ext == '.heic':
                # Convert HEIC to JPEG
                if not HAS_HEIF:
                    return None, None
                img = Image.open(file_path)
                import io
                buffer = io.BytesIO()
                img.convert('RGB').save(buffer, format='JPEG', quality=85)
                data = buffer.getvalue()
                media_type = 'image/jpeg'
            else:
                # Read directly
                with open(file_path, 'rb') as f:
                    data = f.read()
                media_type = cls.MEDIA_TYPES.get(ext, 'image/jpeg')

            base64_data = base64.standard_b64encode(data).decode('utf-8')
            return base64_data, media_type

        except Exception as e:
            print(f"  Error encoding {file_path}: {e}")
            return None, None

    @classmethod
    def get_custom_id(cls, file_path: str) -> str:
        """Generate a unique ID for a file (used in batch API)."""
        # Use hash of path for shorter IDs
        path_hash = hashlib.md5(file_path.encode()).hexdigest()[:16]
        return f"img_{path_hash}"


# =============================================================================
# BATCH PROCESSOR
# =============================================================================

class BatchProcessor:
    """Process images using Anthropic Batch API."""

    def __init__(self, config: Config, checkpoint: Checkpoint):
        self.config = config
        self.checkpoint = checkpoint
        self.client = anthropic.Anthropic(api_key=config.api_key)

        # Mapping from custom_id back to file path
        self.id_to_path = {}

    def process_ocr(self, image_paths: list):
        """
        Run OCR on images using Batch API.

        Args:
            image_paths: List of image file paths to process
        """
        if not image_paths:
            print("\nNo images to process for OCR.")
            return

        print(f"\n{'='*60}")
        print("PHASE 2: OCR (TEXT EXTRACTION)")
        print(f"{'='*60}")
        print(f"Images to process: {len(image_paths)}")
        print(f"Batch size: {self.config.batch_size}")
        print(f"Max concurrent batches: {self.config.max_concurrent_batches}")

        # Split into batches
        batches = self._create_batches(image_paths)
        print(f"Total batches: {len(batches)}")

        # Process batches concurrently
        with ThreadPoolExecutor(max_workers=self.config.max_concurrent_batches) as executor:
            futures = {}
            batch_num = 0

            # Submit initial batches
            for i in range(min(self.config.max_concurrent_batches, len(batches))):
                batch = batches[batch_num]
                future = executor.submit(self._submit_ocr_batch, batch, batch_num + 1, len(batches))
                futures[future] = batch_num
                batch_num += 1

            # Process completed batches and submit new ones
            while futures:
                for future in as_completed(futures):
                    completed_batch_num = futures.pop(future)
                    try:
                        result = future.result()
                        if result:
                            batch_id, file_paths = result
                            self._wait_and_process_ocr_batch(batch_id, file_paths)
                    except Exception as e:
                        print(f"  Batch {completed_batch_num + 1} error: {e}")

                    # Submit next batch if available
                    if batch_num < len(batches):
                        batch = batches[batch_num]
                        future = executor.submit(self._submit_ocr_batch, batch, batch_num + 1, len(batches))
                        futures[future] = batch_num
                        batch_num += 1

        print(f"\n OCR phase complete!")
        print(f"  Total processed: {len(self.checkpoint.data['ocr_completed'])}")

    def _create_batches(self, items: list) -> list:
        """Split items into batches."""
        batches = []
        for i in range(0, len(items), self.config.batch_size):
            batches.append(items[i:i + self.config.batch_size])
        return batches

    def _submit_ocr_batch(self, image_paths: list, batch_num: int, total_batches: int) -> tuple:
        """Submit a batch of images for OCR."""
        print(f"\n Submitting OCR batch {batch_num}/{total_batches} ({len(image_paths)} images)...")

        requests = []
        valid_paths = []

        for file_path in image_paths:
            try:
                base64_data, media_type = ImageEncoder.encode(file_path)
                if base64_data is None:
                    self.checkpoint.mark_failed(file_path, "Failed to encode image")
                    continue

                custom_id = ImageEncoder.get_custom_id(file_path)
                self.id_to_path[custom_id] = file_path

                request = {
                    "custom_id": custom_id,
                    "params": {
                        "model": "claude-sonnet-4-20250514",
                        "max_tokens": 4096,
                        "messages": [
                            {
                                "role": "user",
                                "content": [
                                    {
                                        "type": "image",
                                        "source": {
                                            "type": "base64",
                                            "media_type": media_type,
                                            "data": base64_data
                                        }
                                    },
                                    {
                                        "type": "text",
                                        "text": """Extract ALL text visible in this image. Include:
- All words, numbers, dates
- Handwritten text (do your best to decipher)
- Text on screens, documents, signs
- Watermarks, timestamps, metadata
- Names of people if visible

If the image contains no text, respond with: [NO TEXT DETECTED]

Format as plain text, preserving line breaks where logical."""
                                    }
                                ]
                            }
                        ]
                    }
                }
                requests.append(request)
                valid_paths.append(file_path)

            except Exception as e:
                print(f"    Error preparing {file_path}: {e}")
                self.checkpoint.mark_failed(file_path, str(e))

        if not requests:
            print(f"    No valid images in batch {batch_num}")
            return None

        # Submit batch
        try:
            batch = self.client.batches.create(requests=requests)
            print(f"    Batch {batch_num} submitted: {batch.id}")
            self.checkpoint.add_pending_batch(batch.id, valid_paths, "ocr")
            return (batch.id, valid_paths)
        except Exception as e:
            print(f"    Failed to submit batch: {e}")
            return None

    def _wait_and_process_ocr_batch(self, batch_id: str, file_paths: list):
        """Wait for OCR batch to complete and process results."""
        print(f"\n Waiting for batch {batch_id}...")

        while True:
            try:
                batch = self.client.batches.retrieve(batch_id)
                status = batch.processing_status

                if status == "ended":
                    print(f"    Batch {batch_id} completed!")
                    break
                elif status == "failed":
                    print(f"    Batch {batch_id} failed!")
                    return
                else:
                    # Still processing
                    counts = batch.request_counts
                    print(f"    Status: {status} | Succeeded: {counts.succeeded}/{counts.processing + counts.succeeded}")
                    time.sleep(30)

            except Exception as e:
                print(f"    Error checking batch status: {e}")
                time.sleep(30)

        # Process results
        try:
            results = list(self.client.batches.results(batch_id))
            processed_paths = []

            for result in results:
                custom_id = result.custom_id
                file_path = self.id_to_path.get(custom_id)

                if not file_path:
                    continue

                if result.result.type == "succeeded":
                    # Extract text from response
                    text = ""
                    for block in result.result.message.content:
                        if hasattr(block, 'text'):
                            text += block.text

                    # Save extracted text
                    output_file = self._get_text_output_path(file_path)
                    output_file.parent.mkdir(parents=True, exist_ok=True)
                    with open(output_file, 'w', encoding='utf-8') as f:
                        json.dump({
                            "source_file": file_path,
                            "extracted_text": text,
                            "timestamp": datetime.now().isoformat()
                        }, f, indent=2)

                    processed_paths.append(file_path)
                else:
                    error = getattr(result.result, 'error', 'Unknown error')
                    self.checkpoint.mark_failed(file_path, str(error))

            # Update checkpoint
            self.checkpoint.mark_ocr_completed(processed_paths)
            self.checkpoint.remove_pending_batch(batch_id)
            print(f"    Processed {len(processed_paths)} images from batch")

        except Exception as e:
            print(f"    Error processing batch results: {e}")

    def _get_text_output_path(self, source_path: str) -> Path:
        """Get output path for extracted text."""
        path_hash = hashlib.md5(source_path.encode()).hexdigest()[:16]
        return self.config.output_folder / "extracted_text" / f"{path_hash}.json"

    def process_analysis(self):
        """
        Analyze extracted text for importance scoring.
        """
        print(f"\n{'='*60}")
        print("PHASE 3: IMPORTANCE ANALYSIS")
        print(f"{'='*60}")

        # Find all extracted text files
        text_folder = self.config.output_folder / "extracted_text"
        text_files = list(text_folder.glob("*.json"))

        # Filter out already analyzed
        to_analyze = []
        for text_file in text_files:
            with open(text_file, 'r') as f:
                data = json.load(f)
            source_path = data.get("source_file", "")
            if not self.checkpoint.is_analysis_completed(source_path):
                to_analyze.append((text_file, source_path, data.get("extracted_text", "")))

        print(f"Text files found: {len(text_files)}")
        print(f"Already analyzed: {len(text_files) - len(to_analyze)}")
        print(f"Remaining: {len(to_analyze)}")

        if not to_analyze:
            print("\nNo files to analyze.")
            return

        # Create batches
        batches = self._create_batches(to_analyze)
        print(f"Total batches: {len(batches)}")

        # Process batches
        with ThreadPoolExecutor(max_workers=self.config.max_concurrent_batches) as executor:
            futures = {}
            batch_num = 0

            for i in range(min(self.config.max_concurrent_batches, len(batches))):
                batch = batches[batch_num]
                future = executor.submit(self._submit_analysis_batch, batch, batch_num + 1, len(batches))
                futures[future] = batch_num
                batch_num += 1

            while futures:
                for future in as_completed(futures):
                    completed_batch_num = futures.pop(future)
                    try:
                        result = future.result()
                        if result:
                            batch_id, paths = result
                            self._wait_and_process_analysis_batch(batch_id, paths)
                    except Exception as e:
                        print(f"  Batch {completed_batch_num + 1} error: {e}")

                    if batch_num < len(batches):
                        batch = batches[batch_num]
                        future = executor.submit(self._submit_analysis_batch, batch, batch_num + 1, len(batches))
                        futures[future] = batch_num
                        batch_num += 1

        print(f"\n Analysis phase complete!")

    def _submit_analysis_batch(self, items: list, batch_num: int, total_batches: int) -> tuple:
        """Submit a batch for analysis."""
        print(f"\n Submitting analysis batch {batch_num}/{total_batches} ({len(items)} items)...")

        # Build keyword and people lists for prompt
        keywords_str = ", ".join(self.config.special_keywords)
        people_str = ", ".join(self.config.key_people)

        requests = []
        paths = []

        for text_file, source_path, extracted_text in items:
            if not extracted_text or extracted_text == "[NO TEXT DETECTED]":
                # Skip empty extractions
                continue

            custom_id = ImageEncoder.get_custom_id(source_path)
            self.id_to_path[custom_id] = source_path

            prompt = f"""Analyze this text extracted from an image in a journalism archive. Rate its importance for a memoir about a sports journalist's career.

EXTRACTED TEXT:
{extracted_text}

KEY PEOPLE TO LOOK FOR: {people_str}

SPECIAL KEYWORDS: {keywords_str}

SCORING CRITERIA (1-10):
- 10: Direct evidence of major incidents, threats, or wrongdoing involving key people
- 9: Personal communications with key people, emotional vulnerability shown
- 8: Key people mentioned with significant context, important dates/events
- 7: Interesting conflict, pressure, or memorable moments
- 6: Notable people or events mentioned
- 5: General work-related content with some interest
- 4: Standard work content, minimal interest
- 3: Generic content with little relevance
- 2: Mostly irrelevant but some identifiable content
- 1: No relevant content or completely generic

Respond ONLY with valid JSON in this exact format:
{{
    "score": <1-10>,
    "reason": "<brief explanation, max 100 chars>",
    "tags": ["<keyword1>", "<keyword2>"],
    "people": ["<person1>", "<person2>"],
    "date_mentioned": "<YYYY-MM-DD or null>",
    "emotions": ["<emotion1>", "<emotion2>"]
}}"""

            request = {
                "custom_id": custom_id,
                "params": {
                    "model": "claude-sonnet-4-20250514",
                    "max_tokens": 512,
                    "messages": [
                        {"role": "user", "content": prompt}
                    ]
                }
            }
            requests.append(request)
            paths.append(source_path)

        if not requests:
            return None

        try:
            batch = self.client.batches.create(requests=requests)
            print(f"    Batch {batch_num} submitted: {batch.id}")
            self.checkpoint.add_pending_batch(batch.id, paths, "analysis")
            return (batch.id, paths)
        except Exception as e:
            print(f"    Failed to submit batch: {e}")
            return None

    def _wait_and_process_analysis_batch(self, batch_id: str, file_paths: list):
        """Wait for analysis batch and process results."""
        print(f"\n Waiting for analysis batch {batch_id}...")

        while True:
            try:
                batch = self.client.batches.retrieve(batch_id)
                status = batch.processing_status

                if status == "ended":
                    print(f"    Batch {batch_id} completed!")
                    break
                elif status == "failed":
                    print(f"    Batch {batch_id} failed!")
                    return
                else:
                    counts = batch.request_counts
                    print(f"    Status: {status} | Succeeded: {counts.succeeded}/{counts.processing + counts.succeeded}")
                    time.sleep(30)

            except Exception as e:
                print(f"    Error checking batch status: {e}")
                time.sleep(30)

        # Process results
        try:
            results = list(self.client.batches.results(batch_id))
            processed_paths = []

            for result in results:
                custom_id = result.custom_id
                file_path = self.id_to_path.get(custom_id)

                if not file_path:
                    continue

                if result.result.type == "succeeded":
                    # Extract analysis from response
                    text = ""
                    for block in result.result.message.content:
                        if hasattr(block, 'text'):
                            text += block.text

                    # Parse JSON
                    try:
                        # Clean up response (sometimes Claude adds markdown)
                        text = text.strip()
                        if text.startswith("```json"):
                            text = text[7:]
                        if text.startswith("```"):
                            text = text[3:]
                        if text.endswith("```"):
                            text = text[:-3]
                        text = text.strip()

                        analysis = json.loads(text)
                        analysis["source_file"] = file_path
                        analysis["analyzed_at"] = datetime.now().isoformat()

                        # Save analysis
                        output_file = self._get_analysis_output_path(file_path)
                        output_file.parent.mkdir(parents=True, exist_ok=True)
                        with open(output_file, 'w', encoding='utf-8') as f:
                            json.dump(analysis, f, indent=2)

                        processed_paths.append(file_path)

                    except json.JSONDecodeError as e:
                        print(f"    JSON parse error for {file_path}: {e}")
                        self.checkpoint.mark_failed(file_path, f"JSON parse error: {e}")
                else:
                    error = getattr(result.result, 'error', 'Unknown error')
                    self.checkpoint.mark_failed(file_path, str(error))

            # Update checkpoint
            self.checkpoint.mark_analysis_completed(processed_paths)
            self.checkpoint.remove_pending_batch(batch_id)
            print(f"    Processed {len(processed_paths)} analyses from batch")

        except Exception as e:
            print(f"    Error processing batch results: {e}")

    def _get_analysis_output_path(self, source_path: str) -> Path:
        """Get output path for analysis."""
        path_hash = hashlib.md5(source_path.encode()).hexdigest()[:16]
        return self.config.output_folder / "analysis" / f"{path_hash}.json"


# =============================================================================
# CSV GENERATOR
# =============================================================================

class CSVGenerator:
    """Generate CSV reports from analysis results."""

    def __init__(self, config: Config):
        self.config = config

    def generate(self):
        """Generate all CSV reports."""
        print(f"\n{'='*60}")
        print("PHASE 4: DATABASE GENERATION")
        print(f"{'='*60}")

        # Load all analyses
        analysis_folder = self.config.output_folder / "analysis"
        analyses = []

        for analysis_file in analysis_folder.glob("*.json"):
            try:
                with open(analysis_file, 'r') as f:
                    data = json.load(f)

                # Flatten for CSV
                record = {
                    "source_file": data.get("source_file", ""),
                    "score": data.get("score", 0),
                    "reason": data.get("reason", ""),
                    "tags": "|".join(data.get("tags", [])),
                    "people": "|".join(data.get("people", [])),
                    "date_mentioned": data.get("date_mentioned"),
                    "emotions": "|".join(data.get("emotions", [])),
                    "analyzed_at": data.get("analyzed_at", "")
                }
                analyses.append(record)
            except Exception as e:
                print(f"  Error loading {analysis_file}: {e}")

        if not analyses:
            print("No analyses found to generate CSV.")
            return

        print(f"Total analyses loaded: {len(analyses)}")

        # Sort by score descending
        analyses.sort(key=lambda x: x.get("score", 0), reverse=True)

        if HAS_PANDAS:
            self._generate_with_pandas(analyses)
        else:
            self._generate_basic(analyses)

        print(f"\n CSV generation complete!")

    def _generate_with_pandas(self, analyses: list):
        """Generate CSVs using pandas."""
        df = pd.DataFrame(analyses)

        csv_folder = self.config.output_folder / "csv"

        # Full analysis
        df.to_csv(csv_folder / "FULL_ANALYSIS.csv", index=False)
        print(f"   Created FULL_ANALYSIS.csv ({len(df)} rows)")

        # High value only (7+)
        high_value = df[df['score'] >= 7]
        high_value.to_csv(csv_folder / "HIGH_VALUE_ONLY.csv", index=False)
        print(f"   Created HIGH_VALUE_ONLY.csv ({len(high_value)} rows)")

        # Score 10
        score_10 = df[df['score'] == 10]
        score_10.to_csv(csv_folder / "SCORE_10.csv", index=False)
        print(f"   Created SCORE_10.csv ({len(score_10)} rows)")

        # Score 9
        score_9 = df[df['score'] == 9]
        score_9.to_csv(csv_folder / "SCORE_9.csv", index=False)
        print(f"   Created SCORE_9.csv ({len(score_9)} rows)")

        # Score 8
        score_8 = df[df['score'] == 8]
        score_8.to_csv(csv_folder / "SCORE_8.csv", index=False)
        print(f"   Created SCORE_8.csv ({len(score_8)} rows)")

        # Summary stats
        print(f"\n Score Distribution:")
        print(df['score'].value_counts().sort_index(ascending=False).to_string())

    def _generate_basic(self, analyses: list):
        """Generate CSVs without pandas."""
        import csv

        csv_folder = self.config.output_folder / "csv"
        headers = ["source_file", "score", "reason", "tags", "people", "date_mentioned", "emotions", "analyzed_at"]

        def write_csv(filename, data):
            with open(csv_folder / filename, 'w', newline='', encoding='utf-8') as f:
                writer = csv.DictWriter(f, fieldnames=headers)
                writer.writeheader()
                writer.writerows(data)

        # Full analysis
        write_csv("FULL_ANALYSIS.csv", analyses)
        print(f"   Created FULL_ANALYSIS.csv ({len(analyses)} rows)")

        # High value only (7+)
        high_value = [a for a in analyses if a.get('score', 0) >= 7]
        write_csv("HIGH_VALUE_ONLY.csv", high_value)
        print(f"   Created HIGH_VALUE_ONLY.csv ({len(high_value)} rows)")

        # Score 10
        score_10 = [a for a in analyses if a.get('score', 0) == 10]
        write_csv("SCORE_10.csv", score_10)
        print(f"   Created SCORE_10.csv ({len(score_10)} rows)")

        # Score 9
        score_9 = [a for a in analyses if a.get('score', 0) == 9]
        write_csv("SCORE_9.csv", score_9)
        print(f"   Created SCORE_9.csv ({len(score_9)} rows)")

        # Score 8
        score_8 = [a for a in analyses if a.get('score', 0) == 8]
        write_csv("SCORE_8.csv", score_8)
        print(f"   Created SCORE_8.csv ({len(score_8)} rows)")


# =============================================================================
# MAIN
# =============================================================================

def main():
    parser = argparse.ArgumentParser(description="High-Speed Image Archive Processor")
    parser.add_argument("--config", default="config.json", help="Path to config file")
    parser.add_argument("--phase", choices=["ocr", "analysis", "csv", "all"], default="all",
                        help="Which phase to run (default: all)")
    parser.add_argument("--resume-batches", action="store_true",
                        help="Resume any pending batches from previous run")
    args = parser.parse_args()

    print("""
    ╔══════════════════════════════════════════════════════════════╗
    ║     HIGH-SPEED IMAGE ARCHIVE PROCESSOR                       ║
    ║     Anthropic Batch API - 50% Cost Savings                   ║
    ╚══════════════════════════════════════════════════════════════╝
    """)

    # Load configuration
    try:
        config = Config(args.config)
        print(f"Configuration loaded from: {args.config}")
    except FileNotFoundError:
        print(f"Error: Config file not found: {args.config}")
        print("Create a config.json file with your settings.")
        sys.exit(1)
    except ValueError as e:
        print(f"Configuration error: {e}")
        sys.exit(1)

    # Initialize checkpoint
    checkpoint = Checkpoint(config.output_folder)
    print(f"Checkpoint loaded: {checkpoint.checkpoint_file}")
    if checkpoint.data["last_updated"]:
        print(f"  Last updated: {checkpoint.data['last_updated']}")
        print(f"  OCR completed: {checkpoint.data['stats']['total_ocr_completed']}")
        print(f"  Analysis completed: {checkpoint.data['stats']['total_analysis_completed']}")

    # Initialize processors
    scanner = ImageScanner(config, checkpoint)
    processor = BatchProcessor(config, checkpoint)
    csv_gen = CSVGenerator(config)

    start_time = time.time()

    try:
        if args.phase in ["ocr", "all"]:
            # Scan and process OCR
            images = scanner.scan(phase="ocr")
            if images:
                processor.process_ocr(images)

        if args.phase in ["analysis", "all"]:
            # Run analysis on extracted text
            processor.process_analysis()

        if args.phase in ["csv", "all"]:
            # Generate CSV reports
            csv_gen.generate()

    except KeyboardInterrupt:
        print("\n\n Interrupted! Progress has been saved.")
        print("Run again to resume from where you left off.")
        checkpoint.save()

    elapsed = time.time() - start_time
    hours = int(elapsed // 3600)
    minutes = int((elapsed % 3600) // 60)
    seconds = int(elapsed % 60)

    print(f"\n{'='*60}")
    print("PROCESSING COMPLETE")
    print(f"{'='*60}")
    print(f"Total time: {hours}h {minutes}m {seconds}s")
    print(f"Results saved to: {config.output_folder}")
    print(f"\nCSV files in: {config.output_folder / 'csv'}")


if __name__ == "__main__":
    main()
