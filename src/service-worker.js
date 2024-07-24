const CACHE = "site-screenshot-cache";
const INITIAL_CACHE = [];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => {
      return cache.addAll(INITIAL_CACHE);
    })
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (url.pathname === "screenshot" && url.searchParams.has("url")) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }

        return fetch(event.request).then((response) => {
          return caches.open(CACHE).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
  } else {
    event.responseWith(
      cache.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
