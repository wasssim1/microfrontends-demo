const version = "1.4";
self.portalConfig = [];

self.addEventListener('install', function (event) {
	event.waitUntil(caches.open('portal-config').then(cache => {
				cache.addAll(['/apps.json'])
			})
	)
	self.skipWaiting();//allow activate immediately, don't wait until all clients are closed
	console.log('Install ServiceWorker v' + version);
});

self.addEventListener('activate', event => {
	event.waitUntil(
			caches.open('portal-config')
					.then(cache => cache.match('/apps.json')
							.then(response => response.json())
							.then(config => {
								self.portalConfig = config;
								console.log("PortalConfig found", self.portalConfig)
							})));
	clients.claim();//takeover control over old sw
	console.log('ServiceWorker Now ready to handle fetches with v' + version);
});

self.addEventListener('fetch', function (event) {
	// If this is a navigation, skip.
	if (event.request.mode === 'navigate') {
		console.debug("ignore navigation request to ", event.request.url);
		return;
	}
	if (event.request.method === "GET") {
		console.debug("SW-GET:" + event.request.url, self.portalConfig);
		let url = new URL(event.request.url);
		if (url.origin === location.origin) {
			const targetApps = self.portalConfig.filter(app => url.pathname.startsWith(app.target_path));//TODO warning with prefix-paths like /app and /app1
			if (targetApps.length > 0) {
				let frontendUrl = new URL(targetApps[0].host);
				url.hostname = frontendUrl.hostname;
				url.pathname = url.pathname.replace(targetApps[0].target_path, "");//replace with frontendUrl.pathname if assets only served from subpath
				console.info(`found non-navigation frontend request! Rewrite fetch to ${url}`);
				event.respondWith(fetch(url, {mode: "no-cors"}));
				return;
			}
		}

		// portal-config load from cache and update from network (stale-while-revalidate)
		if (url.origin === location.origin && url.pathname === '/apps.json') {
			event.respondWith(
					caches.open('portal-config').then(cache => {
						return cache.match(event.request).then(response => {
							let fetchPromise = fetch(event.request).then(networkResponse => {
								cache.put(event.request, networkResponse.clone());//put to cache
								networkResponse.clone().json().then(cfg => self.portalConfig = cfg);//put to SW
								return networkResponse;
							});
							return response || fetchPromise;
						});
					}),
			);
		}
	}

});