/**
 * Ensures image URLs use HTTPS to prevent Mixed Content warnings in browsers.
 */
export const getSecureImageUrl = (url, fallback = 'https://via.placeholder.com/400x300') => {
  if (!url || typeof url !== 'string') return fallback;
  if (url.startsWith('http://')) {
    return url.replace(/^http:\/\//i, 'https://');
  }
  return url;
};

export const getSecureImageUrls = (urls = []) => {
  if (!Array.isArray(urls)) return [];
  return urls.map((url) => getSecureImageUrl(url));
};
