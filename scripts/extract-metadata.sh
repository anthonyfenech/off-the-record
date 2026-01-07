#!/bin/bash
# Extract metadata from media files
# Run from project root: ./scripts/extract-metadata.sh

echo "=== MEDIA METADATA EXTRACTION ==="
echo ""

# Find all audio/video files and extract duration
echo "--- AUDIO/VIDEO DURATIONS ---"
find ./assets -type f \( -name "*.mp3" -o -name "*.m4a" -o -name "*.mp4" -o -name "*.wav" \) | while read file; do
    duration=$(mdls -name kMDItemDurationSeconds "$file" 2>/dev/null | awk -F' = ' '{print $2}')
    if [ "$duration" != "(null)" ] && [ -n "$duration" ]; then
        # Convert to mm:ss format
        mins=$(echo "$duration" | awk '{printf "%d", $1/60}')
        secs=$(echo "$duration" | awk '{printf "%02d", int($1)%60}')
        filename=$(basename "$file")
        echo "$filename: ${mins}:${secs} (${duration}s)"
    fi
done

echo ""
echo "--- IMAGE DATES (if EXIF available) ---"
find ./assets -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) | head -20 | while read file; do
    date=$(mdls -name kMDItemDateTimeOriginal "$file" 2>/dev/null | awk -F' = ' '{print $2}')
    if [ "$date" != "(null)" ] && [ -n "$date" ]; then
        filename=$(basename "$file")
        echo "$filename: $date"
    fi
done

echo ""
echo "=== DONE ==="
