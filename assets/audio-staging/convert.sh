#!/bin/bash

# OTR Universal Asset Converter
# Converts images, audio, video, and PDFs to web-optimized formats
# Following the OTR Asset Protocol

set -e

# Directories
CONVERT_DIR="$HOME/Desktop/FILE CONVERTER"
READY_DIR="$HOME/Desktop/FILE CONVERTER/READY TO GO"
LOG_FILE="$READY_DIR/conversion-log.txt"
TEMP_DIR="$CONVERT_DIR/.temp"

# Counters
IMAGES_PROCESSED=0
AUDIO_PROCESSED=0
VIDEO_PROCESSED=0
PDF_PROCESSED=0
ERRORS=0
FLAGGED_FILES=()
ERROR_FILES=()

# Initialize
mkdir -p "$READY_DIR" "$TEMP_DIR"
echo "========================================" > "$LOG_FILE"
echo "OTR CONVERSION LOG - $(date)" >> "$LOG_FILE"
echo "========================================" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"

log() {
    echo "$1"
    echo "$1" >> "$LOG_FILE"
}

log_detail() {
    echo "$1" >> "$LOG_FILE"
}

flag_file() {
    FLAGGED_FILES+=("$1: $2")
    log_detail "  [FLAGGED] $2"
}

get_filesize_kb() {
    local size_bytes=$(stat -f%z "$1" 2>/dev/null || echo 0)
    echo $((size_bytes / 1024))
}

get_filesize_mb() {
    local size_bytes=$(stat -f%z "$1" 2>/dev/null || echo 0)
    echo $((size_bytes / 1024 / 1024))
}

# ============================================
# IMAGE CONVERSION
# ============================================
convert_image() {
    local input="$1"
    local filename=$(basename "$input")
    local name="${filename%.*}"
    local output="$TEMP_DIR/${name}.webp"

    log_detail "Processing image: $filename"

    # Get dimensions
    local dims=$(magick identify -format "%w %h" "$input" 2>/dev/null)
    if [ -z "$dims" ]; then
        log_detail "  [ERROR] Could not read image dimensions"
        return 1
    fi

    local width=$(echo "$dims" | awk '{print $1}')
    local height=$(echo "$dims" | awk '{print $2}')
    local orig_width=$width

    log_detail "  Original: ${width}x${height}"

    # Determine orientation and target size
    local target_width
    if [ "$width" -gt "$height" ]; then
        # Horizontal
        target_width=1440
        log_detail "  Orientation: Horizontal -> resize to 1440px wide"
    elif [ "$height" -gt "$width" ]; then
        # Vertical
        target_width=1080
        log_detail "  Orientation: Vertical -> resize to 1080px wide"
    else
        # Square
        target_width=1080
        log_detail "  Orientation: Square -> resize to 1080px wide"
    fi

    # Determine size limit (screenshot vs photo)
    local size_limit_kb
    if [ "$orig_width" -lt 1000 ]; then
        size_limit_kb=200
        log_detail "  Type: Screenshot (original width < 1000px) -> 200KB limit"
    else
        size_limit_kb=250
        log_detail "  Type: Photo -> 250KB limit"
    fi

    # Initial conversion at 82% quality
    magick "$input" -resize "${target_width}x>" -quality 82 "$output" 2>/dev/null

    local size_kb=$(get_filesize_kb "$output")
    log_detail "  First pass (82%): ${size_kb}KB"

    # Recompress if needed
    if [ "$size_kb" -gt "$size_limit_kb" ]; then
        log_detail "  Over limit, recompressing at 75%..."
        magick "$input" -resize "${target_width}x>" -quality 75 "$output" 2>/dev/null
        size_kb=$(get_filesize_kb "$output")
        log_detail "  Second pass (75%): ${size_kb}KB"

        if [ "$size_kb" -gt "$size_limit_kb" ]; then
            log_detail "  Still over limit, recompressing at 70%..."
            magick "$input" -resize "${target_width}x>" -quality 70 "$output" 2>/dev/null
            size_kb=$(get_filesize_kb "$output")
            log_detail "  Third pass (70%): ${size_kb}KB"
        fi
    fi

    # Move to ready folder
    mv "$output" "$READY_DIR/"
    log_detail "  Output: ${name}.webp (${size_kb}KB)"

    return 0
}

# ============================================
# AUDIO CONVERSION
# ============================================
convert_audio() {
    local input="$1"
    local filename=$(basename "$input")
    local name="${filename%.*}"
    local output="$TEMP_DIR/${name}.mp3"

    log_detail "Processing audio: $filename"

    # Get duration in seconds
    local duration=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$input" 2>/dev/null | cut -d. -f1)
    duration=${duration:-0}
    log_detail "  Duration: ${duration}s"

    # Convert with normalization and silence trimming
    ffmpeg -y -i "$input" \
        -af "silenceremove=start_periods=1:start_silence=0.1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_silence=0.1:start_threshold=-50dB,areverse,loudnorm=I=-16:TP=-1.5:LRA=11" \
        -codec:a libmp3lame -b:a 128k \
        "$output" 2>/dev/null

    if [ ! -f "$output" ]; then
        log_detail "  [ERROR] Conversion failed"
        return 1
    fi

    local size_mb=$(get_filesize_mb "$output")
    local size_kb=$(get_filesize_kb "$output")
    log_detail "  Output size: ${size_kb}KB (${size_mb}MB)"

    # Check size limits
    if [ "$duration" -lt 120 ] && [ "$size_mb" -ge 2 ]; then
        flag_file "$name.mp3" "Audio under 2 minutes exceeds 2MB (${size_mb}MB)"
    elif [ "$duration" -ge 120 ] && [ "$duration" -lt 300 ] && [ "$size_mb" -ge 5 ]; then
        flag_file "$name.mp3" "Audio 2-5 minutes exceeds 5MB (${size_mb}MB)"
    fi

    # Move to ready folder
    mv "$output" "$READY_DIR/"
    log_detail "  Output: ${name}.mp3"

    return 0
}

# ============================================
# VIDEO CONVERSION
# ============================================
convert_video() {
    local input="$1"
    local filename=$(basename "$input")
    local name="${filename%.*}"
    local output="$TEMP_DIR/${name}.mp4"
    local poster="$TEMP_DIR/${name}-poster.webp"

    log_detail "Processing video: $filename"

    # Get dimensions
    local dims=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "$input" 2>/dev/null)
    local width=$(echo "$dims" | cut -d'x' -f1)
    local height=$(echo "$dims" | cut -d'x' -f2)

    log_detail "  Original: ${width}x${height}"

    # Determine orientation and target size
    local scale_filter
    if [ "$width" -gt "$height" ]; then
        # Horizontal - target 1280x720
        scale_filter="scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2"
        log_detail "  Orientation: Horizontal -> 1280x720"
    else
        # Vertical - target 720x1280
        scale_filter="scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2"
        log_detail "  Orientation: Vertical -> 720x1280"
    fi

    # Convert video
    ffmpeg -y -i "$input" \
        -vf "$scale_filter" \
        -c:v libx264 -preset medium -crf 23 \
        -c:a aac -b:a 128k \
        -movflags +faststart \
        "$output" 2>/dev/null

    if [ ! -f "$output" ]; then
        log_detail "  [ERROR] Video conversion failed"
        return 1
    fi

    # Generate poster frame at 2 seconds
    ffmpeg -y -i "$input" -ss 2 -vframes 1 \
        -vf "scale=1440:-1" \
        "$TEMP_DIR/${name}-poster-temp.png" 2>/dev/null

    if [ -f "$TEMP_DIR/${name}-poster-temp.png" ]; then
        cwebp -q 82 "$TEMP_DIR/${name}-poster-temp.png" -o "$poster" 2>/dev/null
        rm -f "$TEMP_DIR/${name}-poster-temp.png"
        log_detail "  Generated poster: ${name}-poster.webp"
    fi

    local size_mb=$(get_filesize_mb "$output")
    log_detail "  Output size: ${size_mb}MB"

    # Check size limit
    if [ "$size_mb" -ge 25 ]; then
        flag_file "$name.mp4" "Video exceeds 25MB (${size_mb}MB) - consider trimming or using YouTube"
    fi

    # Move to ready folder
    mv "$output" "$READY_DIR/"
    [ -f "$poster" ] && mv "$poster" "$READY_DIR/"
    log_detail "  Output: ${name}.mp4"

    return 0
}

# ============================================
# PDF CONVERSION
# ============================================
convert_pdf() {
    local input="$1"
    local filename=$(basename "$input")
    local name="${filename%.*}"

    log_detail "Processing PDF: $filename"

    # Convert PDF pages to PNG first (pdftoppm)
    pdftoppm -png -r 150 "$input" "$TEMP_DIR/${name}-page" 2>/dev/null

    local page_count=0
    local all_success=true

    # Convert each page to WebP
    for page_file in "$TEMP_DIR/${name}-page"*.png; do
        [ -f "$page_file" ] || continue

        page_count=$((page_count + 1))
        local page_output="$TEMP_DIR/${name}-p${page_count}.webp"

        log_detail "  Converting page $page_count..."

        # Convert at 85% quality, 1440px wide
        magick "$page_file" -resize "1440x>" -quality 85 "$page_output" 2>/dev/null

        local size_kb=$(get_filesize_kb "$page_output")
        log_detail "    First pass (85%): ${size_kb}KB"

        # Recompress if over 350KB
        if [ "$size_kb" -gt 350 ]; then
            log_detail "    Over 350KB, recompressing at 80%..."
            magick "$page_file" -resize "1440x>" -quality 80 "$page_output" 2>/dev/null
            size_kb=$(get_filesize_kb "$page_output")
            log_detail "    Second pass (80%): ${size_kb}KB"

            if [ "$size_kb" -gt 350 ]; then
                log_detail "    Still over, recompressing at 75%..."
                magick "$page_file" -resize "1440x>" -quality 75 "$page_output" 2>/dev/null
                size_kb=$(get_filesize_kb "$page_output")
                log_detail "    Third pass (75%): ${size_kb}KB"
            fi
        fi

        # Move to ready folder
        if [ -f "$page_output" ]; then
            mv "$page_output" "$READY_DIR/"
            log_detail "    Output: ${name}-p${page_count}.webp (${size_kb}KB)"
        else
            all_success=false
        fi

        # Clean up temp PNG
        rm -f "$page_file"
    done

    if [ "$page_count" -eq 0 ]; then
        log_detail "  [ERROR] No pages extracted from PDF"
        return 1
    fi

    log_detail "  Total pages: $page_count"

    if [ "$all_success" = true ]; then
        return 0
    else
        return 1
    fi
}

# ============================================
# MAIN PROCESSING LOOP
# ============================================
log "Starting OTR Asset Conversion..."
log "Source: $CONVERT_DIR"
log "Destination: $READY_DIR"
log ""

# Track files to delete after successful conversion
declare -a FILES_TO_DELETE

# Process all files
shopt -s nullglob nocaseglob

# Images
for file in "$CONVERT_DIR"/*.{jpg,jpeg,png,gif,webp,tiff,bmp,heic}; do
    [ -f "$file" ] || continue
    [ "$(basename "$file")" = "convert.sh" ] && continue

    if convert_image "$file"; then
        IMAGES_PROCESSED=$((IMAGES_PROCESSED + 1))
        FILES_TO_DELETE+=("$file")
    else
        ERRORS=$((ERRORS + 1))
        ERROR_FILES+=("$(basename "$file")")
    fi
done

# Audio
for file in "$CONVERT_DIR"/*.{mp3,m4a,wav,aac,ogg,flac}; do
    [ -f "$file" ] || continue

    if convert_audio "$file"; then
        AUDIO_PROCESSED=$((AUDIO_PROCESSED + 1))
        FILES_TO_DELETE+=("$file")
    else
        ERRORS=$((ERRORS + 1))
        ERROR_FILES+=("$(basename "$file")")
    fi
done

# Video
for file in "$CONVERT_DIR"/*.{mp4,mov,avi,mkv,wmv,m4v}; do
    [ -f "$file" ] || continue

    if convert_video "$file"; then
        VIDEO_PROCESSED=$((VIDEO_PROCESSED + 1))
        FILES_TO_DELETE+=("$file")
    else
        ERRORS=$((ERRORS + 1))
        ERROR_FILES+=("$(basename "$file")")
    fi
done

# PDFs
for file in "$CONVERT_DIR"/*.pdf; do
    [ -f "$file" ] || continue

    if convert_pdf "$file"; then
        PDF_PROCESSED=$((PDF_PROCESSED + 1))
        FILES_TO_DELETE+=("$file")
    else
        ERRORS=$((ERRORS + 1))
        ERROR_FILES+=("$(basename "$file")")
    fi
done

shopt -u nullglob nocaseglob

# Delete originals
for file in "${FILES_TO_DELETE[@]}"; do
    rm -f "$file"
done

# Cleanup temp directory
rm -rf "$TEMP_DIR"

# ============================================
# SUMMARY
# ============================================
log ""
log "========================================"
log "CONVERSION COMPLETE"
log "========================================"
log ""
log "Files processed:"
log "  Images: $IMAGES_PROCESSED"
log "  Audio:  $AUDIO_PROCESSED"
log "  Video:  $VIDEO_PROCESSED"
log "  PDFs:   $PDF_PROCESSED"
log "  TOTAL:  $((IMAGES_PROCESSED + AUDIO_PROCESSED + VIDEO_PROCESSED + PDF_PROCESSED))"
log ""

if [ ${#FLAGGED_FILES[@]} -gt 0 ]; then
    log "FLAGGED FILES (over size limits):"
    for flag in "${FLAGGED_FILES[@]}"; do
        log "  - $flag"
    done
    log ""
fi

if [ $ERRORS -gt 0 ]; then
    log "ERRORS: $ERRORS file(s) failed conversion (not deleted):"
    for err_file in "${ERROR_FILES[@]}"; do
        log "  - $err_file"
    done
    log ""
fi

log "Output folder: $READY_DIR"
log "Full log: $LOG_FILE"
log ""
log "Done!"
