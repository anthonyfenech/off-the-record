// Photo galleries for OFF-THE-RECORD
// Currently hidden - no galleries active

export const PHOTO_GALLERIES = [];

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
