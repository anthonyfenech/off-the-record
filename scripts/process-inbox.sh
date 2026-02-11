#!/bin/bash
# ============================================
# OTR Asset Processor
# ============================================
# Drop files in _inbox/, run this script
# Processed files go to _processed/
#
# Standards:
#   - Max dimension: 1200px (longest edge)
#   - JPG quality: 80%
#   - Keeps original aspect ratio
#
# Usage: ./scripts/process-inbox.sh
# ============================================

INBOX="_inbox"
OUTPUT="_processed"

# Create output folder
mkdir -p "$OUTPUT"

# Count files
COUNT=$(find "$INBOX" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.webp" \) 2>/dev/null | wc -l | tr -d ' ')

if [ "$COUNT" -eq 0 ]; then
    echo "No images found in $INBOX/"
    echo "Drop your files there and run again."
    exit 0
fi

echo "============================================"
echo "OTR ASSET PROCESSOR"
echo "============================================"
echo "Found $COUNT images in $INBOX/"
echo ""

# Process each file
find "$INBOX" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.webp" \) -print0 | while IFS= read -r -d '' file; do
    filename=$(basename "$file")
    ext="${filename##*.}"
    name="${filename%.*}"

    echo "Processing: $filename"

    # Get dimensions
    width=$(sips -g pixelWidth "$file" | tail -1 | awk '{print $2}')
    height=$(sips -g pixelHeight "$file" | tail -1 | awk '{print $2}')

    # Determine if resize needed (max 1200px)
    MAX=1200
    if [ "$width" -gt "$MAX" ] || [ "$height" -gt "$MAX" ]; then
        if [ "$width" -gt "$height" ]; then
            # Landscape - resize by width
            sips -Z $MAX "$file" --out "$OUTPUT/$filename" >/dev/null 2>&1
            echo "  Resized: ${width}x${height} → max ${MAX}px"
        else
            # Portrait - resize by height
            sips -Z $MAX "$file" --out "$OUTPUT/$filename" >/dev/null 2>&1
            echo "  Resized: ${width}x${height} → max ${MAX}px"
        fi
    else
        # Just copy if already small enough
        cp "$file" "$OUTPUT/$filename"
        echo "  Size OK: ${width}x${height}"
    fi

    # Convert to JPG and compress (except PNGs with transparency)
    if [[ "$ext" =~ ^(jpg|jpeg)$ ]]; then
        # Re-compress JPG at 80% quality
        sips -s formatOptions 80 "$OUTPUT/$filename" --out "$OUTPUT/$filename" >/dev/null 2>&1
        echo "  Compressed: 80% quality"
    fi

    # Show final size
    newsize=$(ls -lh "$OUTPUT/$filename" | awk '{print $5}')
    oldsize=$(ls -lh "$file" | awk '{print $5}')
    echo "  Size: $oldsize → $newsize"
    echo ""
done

echo "============================================"
echo "Done! Processed files in: $OUTPUT/"
echo ""
echo "Next steps:"
echo "  1. Review files in $OUTPUT/"
echo "  2. Move to appropriate assets/ folder"
echo "  3. Run: node scripts/scan-assets.js"
echo "============================================"
