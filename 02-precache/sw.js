// 🪄✨ Change the version number to make the service worker update and build a
// fresh cache.
const cacheVersion = 1;
const cacheKey = `02-precache-v${cacheVersion}`;

// ----------------------------------------------------------------------------
// INSTALL - This will fetch all of the assets needed to serve this example,
// including scripts, html, and images.
// ----------------------------------------------------------------------------
self.addEventListener("install", (event) => {
  // Using `event.waitUntil` will keep the service worker in the `installing`
  // state until the passed promise resolves.
  event.waitUntil(prefetchAssets());
});

const prefetchAssets = async () => {
  console.log(`Downloading precache assets into ${cacheKey}`);

  const cache = await caches.open(cacheKey);

  await cache.addAll([
    "/02-precache/",
    "/02-precache/index.html",
    "/02-precache/page1.html",
    "/02-precache/main.js",
    "/assets/tailwind-3.3.1.js",
    "/assets/nasa-wAkLQnT2TC0-unsplash.jpg",
    // 🪄✨ This image is used on the other page. Try commenting this out, and
    // see what happens when you are offline.
    "/assets/nasa-NuE8Nu3otjo-unsplash.jpg",
  ]);
};

// ----------------------------------------------------------------------------
// ACTIVATE - Clean up previous versions of the cache.
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
      if (key !== cacheKey && key.startsWith("02")) {
        console.log(`Deleting old cache ${key}`);
        await caches.delete(key);
      }
    })
  );
};

// ----------------------------------------------------------------------------
// FETCH - This event is called when the controlled page makes a network
// request, even to cross-domain URLs. For this example we will respond with
// a cached asset if available. Otherwise, we will make the network request as
// usual.
// ----------------------------------------------------------------------------
self.addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

const handleRequest = async (request) => {
  const cache = await caches.open(cacheKey);
  let response = await cache.match(request);

  // The response will be `undefined` if it was not found in the cache.
  if (response) {
    console.log(`== Found response for ${request.url} in cache`, response);
    return response;
  }

  return fetch(request);
};
