// Cache para o app abrir sem internet (no canteiro). Arquivos do app: rede primeiro; bibliotecas e fontes: cache primeiro.
const CACHE = 'pcp-semanal-v1';
const APP = ['./', 'index.html', 'css/app.css', 'js/app.js', 'js/export.js', 'manifest.webmanifest',
  'assets/modelo-pcp.xlsx', 'assets/fonts/Outfit-Regular.ttf', 'assets/fonts/Outfit-SemiBold.ttf', 'icons/icon-192.png', 'icons/icon.svg'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(APP)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(CACHE).then(k => k.put(req, c)); return r; }).catch(() => caches.match(req)));
  } else if (/cdn\.jsdelivr\.net|cdnjs\.cloudflare\.com|fonts\.(googleapis|gstatic)\.com/.test(url.host)) {
    e.respondWith(caches.match(req).then(m => m || fetch(req).then(r => { const c = r.clone(); caches.open(CACHE).then(k => k.put(req, c)); return r; })));
  }
});
