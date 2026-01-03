# Photo Gallery

This directory contains photos for the OFF-THE-RECORD memoir photo galleries.

## Adding Photos

### 2015 Season Gallery

To add photos to the 2015 season gallery:

1. Place your IMG_50*.jpg files in `2015-season/` directory
2. The system expects 10 photos: IMG_5001.jpg through IMG_5010.jpg
3. Optional: Create thumbnails in `2015-season/thumbs/` for faster loading
   - Thumbnails should be ~200px square
   - Same filename as the original

### Updating Photo Data

After adding images, update `data/photos.js`:

```javascript
{
    id: 'img-5001',
    filename: 'IMG_5001.jpg',
    src: '/assets/photos/2015-season/IMG_5001.jpg',
    thumbnail: '/assets/photos/2015-season/thumbs/IMG_5001.jpg',
    caption: 'Update this caption',
    date: '2015-04-15',
    location: 'Comerica Park, Detroit',
    hasImage: true  // Change to true when image is added
}
```

### Directory Structure

```
assets/photos/
├── README.md
└── 2015-season/
    ├── IMG_5001.jpg
    ├── IMG_5002.jpg
    ├── ...
    └── thumbs/
        ├── IMG_5001.jpg
        ├── IMG_5002.jpg
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
