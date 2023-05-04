const cacheVersion = 1;
const precacheKey = `03-precache-v${cacheVersion}`;
const imageCacheKey = `03-images-v${cacheVersion}`;

// ----------------------------------------------------------------------------
// INSTALL (no changes) - Prefetch html, css, and scripts to run this section
// of the app.
// ----------------------------------------------------------------------------
self.addEventListener("install", (event) => {
  event.waitUntil(prefetchAssets());
});

const prefetchAssets = async () => {
  console.log(`Downloading precache assets into ${precacheKey}`);

  const cache = await caches.open(precacheKey);

  await cache.addAll([
    "/03-caching-strategies/",
    "/03-caching-strategies/index.html",
    "/03-caching-strategies/page2.html",
    "/03-caching-strategies/page3.html",

    "/03-caching-strategies/main.js",
    "/assets/tailwind-3.3.1.js",

    "/assets/placeholder.png",
  ]);
};

// ----------------------------------------------------------------------------
// ACTIVATE (no changes) - Clean up previous versions of the cache.
// ----------------------------------------------------------------------------
self.addEventListener("activate", (event) => {
  event.waitUntil(deleteOldCaches());
});

const deleteOldCaches = async () => {
  const cacheKeys = await caches.keys();
  await Promise.all(
    cacheKeys.map(async (key) => {
      // 🚨 The caches are available across the whole origin. In these examples,
      // be careful of stepping on the other examples' caches!
      if (key !== precacheKey && key !== imageCacheKey && key.startsWith("03")) {
        console.log(`Deleting old cache ${key}`);
        await caches.delete(key);
      }
    })
  );
};

// ----------------------------------------------------------------------------
// FETCH - Return precached assets immediately. If the request is not in the
// cache, try to fetch it from the network.
// If the request is an image and the request was successful, store the
// response in the cache. Otherwise, show a placeholder image that was
// prefetched.
// ----------------------------------------------------------------------------
self.addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

const handleRequest = async (request) => {
  // Use the convenience method to check all caches at the same time.
  const cacheResponse = await caches.match(request);
  if (cacheResponse) {
    return cacheResponse;
  }

  // Response was not in the cache, try to fetch it from the network.
  try {
    const fetchResponse = await fetch(request);

    if (/\.(jpg|png|gif)/.test(request.url)) {
      const imageCache = await caches.open(imageCacheKey);
      imageCache.put(request, fetchResponse);
    }

    return fetchResponse;
  } catch (error) {
    // If the fetch failed, show a placeholder image instead.
    if (/\.(jpg|png|gif)/.test(request.url)) {
      return caches.match("/assets/placeholder.png");
    }

    throw error;
  }
};
