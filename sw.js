const coviddesk = "coviddesk"
const assets = [
	"/",
  "./index.html",
  "./css/statistics.css",
	"./js/statistics.js",
	"./assets/preloader-md.gif"
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(coviddesk).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})