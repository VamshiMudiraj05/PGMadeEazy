/**
 * Curated high-resolution modern hostel & PG interior photos for fallbacks
 */
export const FALLBACK_ROOM_IMAGES = [
  'https://images.unsplash.com/photo-1522770179533-24471fcdba45?auto=format&fit=crop&w=1200&q=80', // Cozy modern bedroom with study desk
  'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80', // Elegant contemporary studio room
  'https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=1200&q=80', // Bright clean hostel room
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80', // Modern apartment interior & bed
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80', // Premium guest room interior
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80', // Warm ambient bedroom
  'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80', // High-end living / studio area
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80', // Clean washroom / modern bathroom
];

/**
  * Gets a safe high-resolution fallback image URL based on index or property ID
  */
export const getFallbackImage = (indexOrSeed = 0) => {
  const seedNum = typeof indexOrSeed === 'number' 
    ? Math.abs(indexOrSeed) 
    : typeof indexOrSeed === 'string' 
      ? indexOrSeed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
      : 0;
  return FALLBACK_ROOM_IMAGES[seedNum % FALLBACK_ROOM_IMAGES.length];
};

/**
 * Ensures image URLs use HTTPS to prevent Mixed Content warnings and provides high-res fallback.
 */
export const getSecureImageUrl = (url, fallbackIndex = 0) => {
  if (!url || typeof url !== 'string' || url.trim() === '' || url.includes('placeholder.com')) {
    return getFallbackImage(fallbackIndex);
  }
  if (url.startsWith('http://')) {
    return url.replace(/^http:\/\//i, 'https://');
  }
  return url;
};

/**
 * Handles image error events by seamlessly switching to a curated fallback image without looping.
 */
export const handleImageError = (e, fallbackIndex = 0) => {
  if (e.target && !e.target.dataset.hasFailed) {
    e.target.dataset.hasFailed = 'true';
    e.target.src = getFallbackImage(fallbackIndex);
  }
};

export const getSecureImageUrls = (urls = []) => {
  if (!Array.isArray(urls) || urls.length === 0) {
    return [FALLBACK_ROOM_IMAGES[0]];
  }
  return urls.map((url, i) => getSecureImageUrl(url, i));
};

