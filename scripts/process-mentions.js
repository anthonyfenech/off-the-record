#!/usr/bin/env node
/**
 * Tweet Screenshot Processor
 *
 * Processes hate tweet screenshots for the-mentions.html
 * - Resizes to max 600px width
 * - Compresses to under 100KB
 * - Converts to WebP
 * - Generates manifest.json
 *
 * Usage:
 *   node scripts/process-mentions.js [input-folder]
 *
 * Default input: ~/Downloads/mentions (or specify your folder)
 * Output: assets/mentions/
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
    maxWidth: 400,
    quality: 80,           // WebP quality (0-100)
    targetMaxBytes: 100000, // 100KB target
    inputDir: process.argv[2] || path.join(process.env.HOME, 'Downloads', 'mentions'),
    outputDir: path.join(__dirname, '..', 'assets', 'mentions')
};

// Supported input formats
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.heic'];

async function processImage(inputPath, outputPath, filename) {
    try {
        let image = sharp(inputPath);

        // Auto-crop: trim borders/whitespace (threshold controls sensitivity)
        // Lower threshold = more aggressive trim
        try {
            image = image.trim({ threshold: 10 });
        } catch (e) {
            // If trim fails (solid color image), continue without trimming
        }

        // Get metadata after trim
        const metadata = await image.metadata();

        // Calculate new dimensions (max 600px width, maintain aspect ratio)
        let width = metadata.width || 600;
        let height = metadata.height || 400;

        if (width > CONFIG.maxWidth) {
            height = Math.round((CONFIG.maxWidth / width) * height);
            width = CONFIG.maxWidth;
        }

        // Process and convert to WebP
        let quality = CONFIG.quality;
        let buffer;
        let attempts = 0;

        // Try to get under 100KB, reducing quality if needed
        do {
            buffer = await sharp(inputPath)
                .trim({ threshold: 10 })  // Auto-crop borders
                .resize(width, height, { fit: 'inside' })
                .webp({ quality })
                .toBuffer();

            if (buffer.length > CONFIG.targetMaxBytes && quality > 40) {
                quality -= 10;
                attempts++;
            } else {
                break;
            }
        } while (attempts < 5);

        // Write the file
        const webpFilename = filename.replace(/\.[^.]+$/, '.webp');
        const finalPath = path.join(outputPath, webpFilename);
        await fs.promises.writeFile(finalPath, buffer);

        const sizeKB = (buffer.length / 1024).toFixed(1);
        const status = buffer.length > CONFIG.targetMaxBytes ? '(over target)' : '';

        return {
            original: filename,
            processed: webpFilename,
            width,
            height,
            sizeKB: parseFloat(sizeKB),
            quality,
            success: true
        };

    } catch (error) {
        console.error(`  ERROR: ${filename} - ${error.message}`);
        return {
            original: filename,
            success: false,
            error: error.message
        };
    }
}

async function main() {
    console.log('\n=== TWEET SCREENSHOT PROCESSOR ===\n');
    console.log(`Input:  ${CONFIG.inputDir}`);
    console.log(`Output: ${CONFIG.outputDir}\n`);

    // Check input directory exists
    if (!fs.existsSync(CONFIG.inputDir)) {
        console.error(`ERROR: Input directory not found: ${CONFIG.inputDir}`);
        console.log('\nUsage: node scripts/process-mentions.js [input-folder]');
        console.log('Example: node scripts/process-mentions.js ~/Desktop/hate-tweets');
        process.exit(1);
    }

    // Create output directory
    if (!fs.existsSync(CONFIG.outputDir)) {
        fs.mkdirSync(CONFIG.outputDir, { recursive: true });
    }

    // Get all image files
    const files = fs.readdirSync(CONFIG.inputDir)
        .filter(f => SUPPORTED_FORMATS.includes(path.extname(f).toLowerCase()))
        .sort();

    if (files.length === 0) {
        console.error('ERROR: No image files found in input directory');
        process.exit(1);
    }

    console.log(`Found ${files.length} images to process\n`);

    // Process each image
    const manifest = {
        generated: new Date().toISOString(),
        totalImages: 0,
        images: []
    };

    let processed = 0;
    let failed = 0;
    let totalSizeKB = 0;

    for (const file of files) {
        const inputPath = path.join(CONFIG.inputDir, file);
        process.stdout.write(`Processing ${++processed}/${files.length}: ${file}... `);

        const result = await processImage(inputPath, CONFIG.outputDir, file);

        if (result.success) {
            manifest.images.push({
                filename: result.processed,
                width: result.width,
                height: result.height
            });
            totalSizeKB += result.sizeKB;
            console.log(`${result.sizeKB}KB`);
        } else {
            failed++;
            console.log('FAILED');
        }
    }

    // Write manifest
    manifest.totalImages = manifest.images.length;
    const manifestPath = path.join(CONFIG.outputDir, 'manifest.json');
    await fs.promises.writeFile(manifestPath, JSON.stringify(manifest, null, 2));

    // Summary
    console.log('\n=== COMPLETE ===\n');
    console.log(`Processed: ${manifest.totalImages} images`);
    console.log(`Failed:    ${failed} images`);
    console.log(`Total size: ${(totalSizeKB / 1024).toFixed(2)} MB`);
    console.log(`Average:    ${(totalSizeKB / manifest.totalImages).toFixed(1)} KB per image`);
    console.log(`\nManifest: ${manifestPath}`);
    console.log(`\nNext step: Build the-mentions.html page`);
}

main().catch(console.error);
