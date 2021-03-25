self.addEventListener('fetch', function (event) {
	//TODO: find a way to clone the original request (with all headers/body/options/...) but different hostname:port
	if (event.request.method === "GET" && /^http:\/\/localhost:3000.*app1\/static\//.test(event.request.url)) {
		event.respondWith(fetch(event.request.url.replace("localhost:3000", "localhost:3001"), {mode: "no-cors"}));
	}
	if (event.request.method === "GET" && /^http:\/\/localhost:3000.*app2\/static\//.test(event.request.url)) {
		event.respondWith(fetch(event.request.url.replace("localhost:3000", "localhost:3002"), {mode: "no-cors"}));
	}
});