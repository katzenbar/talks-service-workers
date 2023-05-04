// 🪄✨ Change the version number to make the service worker update
const version = 1;

self.addEventListener("install", (event) => {
  console.log(`SW version ${version} - install event received

  Service worker is now installed, but not controlling the page`);

  // 🪄✨ Uncomment this line to skip the waiting step, and immediately
  // activate the service worker.
  // self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log(`SW version ${version} - activate event received

  Service worker is now activated and is managing the page`);

  // 🪄✨ Uncomment this line to ensure that we claim all clients
  // when using `skipWaiting`
  // event.waitUntil(clients.claim());
});
