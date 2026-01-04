// Photo galleries for OFF-THE-RECORD memoir
// Organized by season/year and theme

// Helper to generate photo placeholders
const generatePhotoPlaceholders = (startNum, endNum, year, season) => {
    const photos = [];
    for (let i = startNum; i <= endNum; i++) {
        const filename = `IMG_${i}.JPG`;
        const photoNum = i - startNum + 1;
        photos.push({
            id: `img-${i}`,
            filename: filename,
            src: `./assets/photos/${season}/IMG_${i}.JPG`,
            thumbnail: `./assets/photos/${season}/thumbs/IMG_${i}.JPG`,
            caption: `${year} season - Photo ${photoNum}`,
            date: `${year}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
            location: 'Comerica Park, Detroit',
            hasImage: false
        });
    }
    return photos;
};

export const PHOTO_GALLERIES = [
    {
        id: '2015-season',
        title: '2015 Season',
        year: 2015,
        description: 'Behind the scenes coverage of the Detroit Tigers 2015 season',
        coverPhoto: './assets/photos/2015-season/IMG_5011.JPG',
        photos: generatePhotoPlaceholders(5011, 5041, 2015, '2015-season'),
        comingSoon: false
    },
    {
        id: '2016-season',
        title: '2016 Season',
        year: 2016,
        description: 'Behind the scenes coverage of the Detroit Tigers 2016 season',
        coverPhoto: './assets/photos/2016-season/IMG_5073.JPG',
        photos: generatePhotoPlaceholders(5073, 5100, 2016, '2016-season'),
        comingSoon: false
    },
    {
        id: '2017-season',
        title: '2017 Season',
        year: 2017,
        description: 'Behind the scenes coverage of the Detroit Tigers 2017 season',
        coverPhoto: null,
        photos: [],
        comingSoon: true
    },
    {
        id: '2018-season',
        title: '2018 Season',
        year: 2018,
        description: 'Behind the scenes coverage of the Detroit Tigers 2018 season',
        coverPhoto: null,
        photos: [],
        comingSoon: true
    },
    {
        id: '2019-season',
        title: '2019 Season',
        year: 2019,
        description: 'Behind the scenes coverage of the Detroit Tigers 2019 season',
        coverPhoto: null,
        photos: [],
        comingSoon: true
    },
    {
        id: '2020-season',
        title: '2020 Season',
        year: 2020,
        description: 'Behind the scenes coverage of the Detroit Tigers 2020 season',
        coverPhoto: null,
        photos: [],
        comingSoon: true
    },
    {
        id: 'all-of-the-lights',
        title: 'All of the Lights',
        year: null,
        description: 'Night games under the stadium lights',
        coverPhoto: null,
        photos: [],
        comingSoon: true
    },
    {
        id: 'batting-practice',
        title: 'Batting Practice',
        year: null,
        description: 'Pre-game warmups and batting practice sessions',
        coverPhoto: null,
        photos: [],
        comingSoon: true
    },
    {
        id: 'from-the-dugout',
        title: 'From the Dugout',
        year: null,
        description: 'Exclusive dugout access and player perspectives',
        coverPhoto: null,
        photos: [],
        comingSoon: true
    }
];

// Helper functions
export const getGalleryById = (id) => {
    return PHOTO_GALLERIES.find(gallery => gallery.id === id);
};

export const getAllGalleries = () => {
    return PHOTO_GALLERIES;
};

export const getActiveGalleries = () => {
    return PHOTO_GALLERIES.filter(gallery => !gallery.comingSoon);
};

export const getComingSoonGalleries = () => {
    return PHOTO_GALLERIES.filter(gallery => gallery.comingSoon);
};

export const getPhotoById = (galleryId, photoId) => {
    const gallery = getGalleryById(galleryId);
    if (!gallery) return null;
    return gallery.photos.find(photo => photo.id === photoId);
};

export const getPhotoIndex = (galleryId, photoId) => {
    const gallery = getGalleryById(galleryId);
    if (!gallery) return -1;
    return gallery.photos.findIndex(photo => photo.id === photoId);
};

export const getNextPhoto = (galleryId, currentPhotoId) => {
    const gallery = getGalleryById(galleryId);
    if (!gallery) return null;

    const currentIndex = gallery.photos.findIndex(photo => photo.id === currentPhotoId);
    if (currentIndex === -1 || currentIndex === gallery.photos.length - 1) return null;

    return gallery.photos[currentIndex + 1];
};

export const getPreviousPhoto = (galleryId, currentPhotoId) => {
    const gallery = getGalleryById(galleryId);
    if (!gallery) return null;

    const currentIndex = gallery.photos.findIndex(photo => photo.id === currentPhotoId);
    if (currentIndex <= 0) return null;

    return gallery.photos[currentIndex - 1];
};
