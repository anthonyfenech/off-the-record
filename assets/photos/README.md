# Photo Gallery

This directory contains photos for the OFF-THE-RECORD memoir photo galleries.

## Photo Galleries

### Active Galleries (Ready for Photos)

#### 2015 Season (31 photos)
- Files: `IMG_5011.JPG` through `IMG_5041.JPG`
- Location: `2015-season/`
- Thumbnails: `2015-season/thumbs/`

#### 2016 Season (28 photos)
- Files: `IMG_5073.JPG` through `IMG_5100.JPG`
- Location: `2016-season/`
- Thumbnails: `2016-season/thumbs/`

### Coming Soon Galleries

The following galleries are placeholders and will be activated when ready:
- 2017 Season
- 2018 Season
- 2019 Season
- 2020 Season
- All of the Lights (night games)
- Batting Practice
- From the Dugout

## Adding Photos

1. Place your .JPG files in the appropriate season directory
2. The system expects specific filenames (see above)
3. Optional: Create thumbnails in `thumbs/` subdirectory for faster loading
   - Thumbnails should be ~200px square
   - Use same filename as the original

## Updating Photo Data

After adding images, update `data/photos.js` to mark photos as active:

```javascript
// In the generatePhotoPlaceholders function call, or manually update:
{
    id: 'img-5011',
    filename: 'IMG_5011.JPG',
    src: '/assets/photos/2015-season/IMG_5011.JPG',
    thumbnail: '/assets/photos/2015-season/thumbs/IMG_5011.JPG',
    caption: 'Update this caption',
    date: '2015-04-15',
    location: 'Comerica Park, Detroit',
    hasImage: true  // Change to true when image is added
}
```

## Directory Structure

```
assets/photos/
├── README.md
├── 2015-season/
│   ├── IMG_5011.JPG
│   ├── IMG_5012.JPG
│   ├── ... (through IMG_5041.JPG)
│   └── thumbs/
│       ├── IMG_5011.JPG
│       └── ...
└── 2016-season/
    ├── IMG_5073.JPG
    ├── IMG_5074.JPG
    ├── ... (through IMG_5100.JPG)
    └── thumbs/
        ├── IMG_5073.JPG
        └── ...
```

## Creating New Galleries

To create a new photo gallery:

1. Create a new directory (e.g., `2016-season/`)
2. Add photos to the directory
3. Update `data/photos.js` with the new gallery data
4. The sidebar will automatically display the new gallery

## Features

- **Thumbnail Grid**: Photos display as a responsive grid in the sidebar
- **Full-Screen Viewer**: Tap any thumbnail to view full-size
- **Navigation**: Swipe or use arrow keys to browse photos
- **Mobile-Friendly**: Touch gestures work on phones and tablets
- **Placeholders**: Shows filename until actual image is uploaded
