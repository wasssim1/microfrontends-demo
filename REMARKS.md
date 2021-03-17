# Remarks to the current demo-source
Not the generell idea but only to the current state of the github source code.

- production-builds/dockerized version dont work because of missing env-variables support (REACT_APP_FIRST_APP_HOST)
but it's okay to hard-code the host="http://localhost:3001" and host="http://localhost:3002" in App.js from the root.

- unmount micro-app in the useEffect() result can't work, because the "div" element created from "<MicroReact/>" dont exists anymore in DOM at the time of calling this function (all dom changes already applied from react).

- a little bit messy CORS configuration in nginx ;)

  `add_header 'Access-Control-Allow-Origin' "*";`
   was enough to allow loading of the buildpack manifest json.
  In test/production environment we use sub-domains as an easy non-wildcard restriction.

- why the webpack customizing?
we can load all assets found in the downloaded asset-manifest.json file like seen in my changes...the onload event was added for "files/main.js" file.

2. Remarks to the idea

- URL-handling: all relative urls in micro-apps are not working anymore.
  **Thats a huge problem and MUST be solved.**
  
  see logo.svg in app-second as an example.

- what about legacy apps?
perhaps we use a combination of javascript-intregration with  iframe-integration for legacy apps?
````javascript
fetch(`${host}/asset-manifest.json`, )
		.then(res => res.json())
		.then(manifest => {
			//...javascript-integration
		})
		.catch((err) => {
			//fallback to IFrame integration
           let appRootDiv = document.getElementById(`${name}-container`);
           let iframe = document.createElement('iframe');
           iframe.src = host;
           appRootDiv.appendChild(iframe);
		})
````  
