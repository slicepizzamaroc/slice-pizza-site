/* Slice Pizza — service worker : l'app s'ouvre même sans réseau.
   Change VERSION à chaque mise à jour du site pour forcer le rafraîchissement. */
const VERSION = "slice-v53";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION && k !== "slice-img").map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return;
  // Photos (nom unique par version de la photo) : cache d'abord, jamais retéléchargées
  if (url.pathname.includes("/img/")) {
    e.respondWith(caches.open("slice-img").then(c => c.match(req).then(r => r || fetch(req).then(res => { if (res.ok) c.put(req, res.clone()); return res; }))));
    return;
  }
  // Pages : réseau d'abord (menu et prix toujours à jour), cache si hors ligne
  e.respondWith(fetch(req).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return res; })
    .catch(() => caches.match(req).then(r => r || caches.match("./index.html"))));
});
