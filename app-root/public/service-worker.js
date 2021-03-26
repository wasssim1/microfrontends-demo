const version = "1.1";

self.addEventListener('install', function (event) {
	self.skipWaiting();//allow activate immediately, don't wait until all clients are closed
	console.log('Install ServiceWorker v' + version);
});

self.addEventListener('activate', event => {
	clients.claim();//takeover control over old sw
	console.log('ServiceWorker Now ready to handle fetches with v' + version);
});

self.addEventListener('fetch', function (event) {
	// If this is a navigation, skip.
	if (event.request.mode === 'navigate') {
		console.log("skip request to ", event.request.url);
		return;
	}
	if (event.request.method === "GET") {
		let url = new URL(event.request.url);
		if (url.origin === location.origin && url.pathname.startsWith("/app1")) {
			url.hostname = "app1.localhost";
			url.pathname = url.pathname.replace("/app1", "");
			console.log("rewrite app1 request to", url);
			event.respondWith(fetch(url, {mode: "no-cors"}));
		}
		if (url.origin === location.origin && url.pathname.startsWith("/app2")) {
			url.hostname = "app2.localhost";
			url.pathname = url.pathname.replace("/app2", "");
			console.log("rewrite app2 request to", url);
			event.respondWith(fetch(url, {mode: "no-cors"}));
		}
	}

});