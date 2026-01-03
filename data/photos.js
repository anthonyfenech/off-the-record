// Photo galleries for OFF-THE-RECORD memoir
// Organized by season/year

export const PHOTO_GALLERIES = [
    {
        id: '2015-season',
        title: '2015 Season',
        year: 2015,
        description: 'Behind the scenes coverage of the Detroit Tigers 2015 season',
        coverPhoto: '/assets/photos/2015-season/IMG_5001.jpg',
        photos: [
            {
                id: 'img-5001',
                filename: 'IMG_5001.jpg',
                src: '/assets/photos/2015-season/IMG_5001.jpg',
                thumbnail: '/assets/photos/2015-season/thumbs/IMG_5001.jpg',
                caption: 'Pre-game warmups at Comerica Park',
                date: '2015-04-15',
                location: 'Comerica Park, Detroit',
                hasImage: false // Set to true when actual image is added
            },
            {
                id: 'img-5002',
                filename: 'IMG_5002.jpg',
                src: '/assets/photos/2015-season/IMG_5002.jpg',
                thumbnail: '/assets/photos/2015-season/thumbs/IMG_5002.jpg',
                caption: 'Press box view before first pitch',
                date: '2015-04-15',
                location: 'Comerica Park, Detroit',
                hasImage: false
            },
            {
                id: 'img-5003',
                filename: 'IMG_5003.jpg',
                src: '/assets/photos/2015-season/IMG_5003.jpg',
                thumbnail: '/assets/photos/2015-season/thumbs/IMG_5003.jpg',
                caption: 'Batting practice from the dugout',
                date: '2015-05-10',
                location: 'Comerica Park, Detroit',
                hasImage: false
            },
            {
                id: 'img-5004',
                filename: 'IMG_5004.jpg',
                src: '/assets/photos/2015-season/IMG_5004.jpg',
                thumbnail: '/assets/photos/2015-season/thumbs/IMG_5004.jpg',
                caption: 'Clubhouse access during media availability',
                date: '2015-05-12',
                location: 'Comerica Park, Detroit',
                hasImage: false
            },
            {
                id: 'img-5005',
                filename: 'IMG_5005.jpg',
                src: '/assets/photos/2015-season/IMG_5005.jpg',
                thumbnail: '/assets/photos/2015-season/thumbs/IMG_5005.jpg',
                caption: 'Game day atmosphere in the stands',
                date: '2015-06-20',
                location: 'Comerica Park, Detroit',
                hasImage: false
            },
            {
                id: 'img-5006',
                filename: 'IMG_5006.jpg',
                src: '/assets/photos/2015-season/IMG_5006.jpg',
                thumbnail: '/assets/photos/2015-season/thumbs/IMG_5006.jpg',
                caption: 'Night game under the lights',
                date: '2015-07-04',
                location: 'Comerica Park, Detroit',
                hasImage: false
            },
            {
                id: 'img-5007',
                filename: 'IMG_5007.jpg',
                src: '/assets/photos/2015-season/IMG_5007.jpg',
                thumbnail: '/assets/photos/2015-season/thumbs/IMG_5007.jpg',
                caption: 'Post-game interview session',
                date: '2015-07-15',
                location: 'Comerica Park, Detroit',
                hasImage: false
            },
            {
                id: 'img-5008',
                filename: 'IMG_5008.jpg',
                src: '/assets/photos/2015-season/IMG_5008.jpg',
                thumbnail: '/assets/photos/2015-season/thumbs/IMG_5008.jpg',
                caption: 'Press credentials and access badge',
                date: '2015-08-01',
                location: 'Comerica Park, Detroit',
                hasImage: false
            },
            {
                id: 'img-5009',
                filename: 'IMG_5009.jpg',
                src: '/assets/photos/2015-season/IMG_5009.jpg',
                thumbnail: '/assets/photos/2015-season/thumbs/IMG_5009.jpg',
                caption: 'Stadium exterior on game day',
                date: '2015-08-20',
                location: 'Comerica Park, Detroit',
                hasImage: false
            },
            {
                id: 'img-5010',
                filename: 'IMG_5010.jpg',
                src: '/assets/photos/2015-season/IMG_5010.jpg',
                thumbnail: '/assets/photos/2015-season/thumbs/IMG_5010.jpg',
                caption: 'Final home game of the season',
                date: '2015-09-27',
                location: 'Comerica Park, Detroit',
                hasImage: false
            }
        ]
    }
];

// Helper functions
export const getGalleryById = (id) => {
    return PHOTO_GALLERIES.find(gallery => gallery.id === id);
};

export const getAllGalleries = () => {
    return PHOTO_GALLERIES;
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
