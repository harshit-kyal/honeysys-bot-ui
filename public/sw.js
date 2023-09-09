/*eslint no-restricted-globals: ["error", "event", "fdescribe"]*/

const staticCacheName = 'site-static';
const assets = [
  '/',
  '/public/index.html',
  '/src/index.tsx',
  '/src/App.tsx',
  '/public/manifest.json',
  // '/src/pages/Home.jsx',
  // '/src/pages/Product.jsx',
  // '/src/pages/Carts.jsx',
  // '/src/pages/header.css',
  // '/src/pages/PortalNavbar.js',
  // '/src/api/FetchApi.js',
  '/src/index.css',
  '/src/App.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css',
];

// install event
self.addEventListener('install', evt => {
  // console.log('service worker installed');
  // evt.waitUntil(
  //   caches.open(staticCacheName).then((cache) => {
  //     console.log('caching shell assets');
  //     cache.addAll(assets);
  //   })
  // );
});

// activate event
self.addEventListener('activate', evt => {
  // console.log('service worker activated');
});

// fetch event
self.addEventListener('fetch', evt => {
  // console.log('fetch event', evt);
  // evt.respondWith(
  //   caches.match(evt.request).then(cacheRes => {
  //     return cacheRes || fetch(evt.request);
  //   })
  // );
});