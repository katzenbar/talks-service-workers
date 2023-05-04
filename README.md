# A Deep Dive into Caching with Service Workers

Presented at Stir Trek 2023 - https://stirtrek.com/

Service workers solve a huge problem with web applications – allowing users to continue using your application even when they are offline. Many packages bill themselves as a drop-in solution for offline functionality. It just works! Until it doesn’t. 🥲 What to do when things go sideways? We have to dive deep! By understanding the Service Worker lifecycle, caching strategies, and pitfalls, we can equip ourselves with the necessary knowledge to get out of thorny situations. We’ll also look at ways to debug and test your service workers so you can deploy with confidence.

# Slides

https://docs.google.com/presentation/d/1LvaZXPDdwOm6FJJCj8og9cDJxiqABf7Om9GuHc1oeiA/edit?usp=sharing

# How to run the examples

This is a fully static site, so run your favorite web server from the root directory of this repo. If you have nodejs installed, you can use:

```bash
npx http-server -c-1 -p4200 .
```

# Emoji notes

There are comments throughout the example service workers. A few have emoji to draw extra attention to interesting areas:

- 🪄✨ - Try changing values to see how they impact the behavior of the site.
- 🚨 - Watch out for potential pitfalls!

# Assets used

- Photos by NASA from Unsplash
  - https://unsplash.com/photos/b-P6xrDMFSU
  - https://unsplash.com/photos/wAkLQnT2TC0
  - https://unsplash.com/photos/NuE8Nu3otjo
  - https://unsplash.com/photos/Yj1M5riCKk4
  - https://unsplash.com/photos/YOId6dA4c0I
  - https://unsplash.com/photos/JHyiw_dpALk
- TailwindCSS - https://tailwindcss.com/
- Icons from Font Awesome - https://fontawesome.com/

# Additional resources

- General
  - https://www.youtube.com/watch?v=NJRu3pmmN-4&list=PLyuRouwmQCjl4iJgjH3i61tkqauM-NTGj - An in-depth series of videos on all things service workers by Steve Griffith with hours of content going through more examples and code in detail.
  - https://web.dev/offline-cookbook/ - A detailed article by Jake Archibald that goes into detail about when to cache things, and how to serve responses from the cache.
  - MDN resources
    - Service worker guide - https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
    - Cache API - https://developer.mozilla.org/en-US/docs/Web/API/Cache
    - CacheStorage (`caches`) API - https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage
    - Service worker fetch event - https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/fetch_event
- Lifecycle
  - https://web.dev/service-worker-lifecycle/ - Another great article by Jake Archibald, this time covering the service worker lifecycle in detail.
  - https://felixgerschau.com/service-worker-lifecycle-update/ - An article by Felix Gerschau also covering the service worker lifecycle.
- Using service workers in your project
  - Workbox - https://developer.chrome.com/docs/workbox/
  - Webpack - https://www.npmjs.com/package/workbox-webpack-plugin
  - Vite - https://github.com/vite-pwa/vite-plugin-pwa
  - Next.js - https://github.com/shadowwalker/next-pwa
  - Nuxt.js - https://github.com/nuxt-community/pwa-module
- Tips and tricks
  - Removing a service worker - https://developer.chrome.com/docs/workbox/remove-buggy-service-workers/
  - Self-destroying service worker - https://github.com/NekR/self-destroying-sw
  - Chrome service worker debug views
    - chrome://serviceworker-internals/?devtools – See all of the service workers that are installed on your machine with extra debug info
    - chrome://inspect/#service-workers – See all of the currently running service workers, and open their devtools in a new window
- Example sites using service workers
  - Offline-enabled
    - https://regex101.com/
    - https://excalidraw.com/
    - https://www.youtube.com/ - allows you to download videos (with Premium subscription) for offline viewing later. See Google's demo application that shows a way you can implement this yourself https://kinoweb.dev/
    - https://gmail.com - You can see some of your emails even if you are offline
    - https://replit.com/ - shows a special page when you are offline
  - No offline support,
    - https://www.kroger.com/
