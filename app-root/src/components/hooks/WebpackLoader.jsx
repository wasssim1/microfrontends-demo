//load js/css into target document and return Promise for all loaded css/js style/script ids
export function loadWebpackFrontend(baseUrl, configUrl, document, onLoadRunner) {
	//TODO: spooky, why we need to load it from, below from "let files ..." is sometimes too late for usage of the variables
	if (configUrl) {
		const script = document.createElement('script');
		script.id = configUrl;
		script.src = configUrl;
		console.log(`Loading App-Javascript-Config `, script)
		document.head.appendChild(script);
	}
	return fetch(baseUrl + "/asset-manifest.json")
			.then(res => res.json())
			.then(manifest => {
				let files = [ ...(configUrl ? [configUrl]:[]), ...manifest['entrypoints'] ];
				console.log("Loading all assets for app " + baseUrl, files);
				return files.map(asset => {
					let assetUrl = asset.startsWith("http") ? asset : `${baseUrl}/${asset}`;
					if (asset.endsWith(".js")) {
						const script = document.createElement('script');
						script.id = assetUrl;
						script.src = assetUrl;
						if (manifest['files']['main.js'].endsWith(asset)) {
							script.onload = onLoadRunner;
						}
						if (!document.getElementById(assetUrl)) {
							console.log(`Loading App-Javascript-Asset `, script)
							document.head.appendChild(script);
							return assetUrl;
						}
						else if (script.onload) {
							console.log(`Start Render App`, script)
							onLoadRunner();
						}
					}
					else if (asset.endsWith(".css")) {
						const styleLink = document.createElement('link');
						styleLink.id = assetUrl;
						styleLink.href = assetUrl;
						styleLink.rel = 'stylesheet';
						if (!document.getElementById(assetUrl)) {
							console.log(`Loading App-CSS-Asset `, styleLink)
							document.head.appendChild(styleLink);
							return assetUrl;
						}
					}
					return undefined;
				})
				.filter(x => x !== undefined);
			})
}