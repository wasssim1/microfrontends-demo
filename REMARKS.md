# Remarks to the current demo-source / idea

## IFrame-URL integration
Loads the isolated application by their url into an iframe thru the src attribute.

supports: 
- all type of application. Partly no changes needed to run the applications in an portal context. 

pros:
- the best possible isolation for js/css
- deep-links possible but only uni-directional from portal to application. 

cons:
- needs to be on "SameSite" to support Cookies the site needs (JSESSIONID, ..) 
- no bi-directional (top-level) navigation possible (or does it?)
- iframe-window height changes are difficult to avoid scrollbars/minHeight. Needs a fixed ratio (from css: paddingBottom: "75%" or similar) or help from the iframe source thru postMessage(current-height)/receiveMessage(change iframe-parent height). 
  see portal-integration.js/MessageHandler.jsx for details.
- Problems with viewport-height styles ("100vh" content inside an iframe is not based the real viewport but on the height of the iframe element itself)


## Webpack-Native integration

Loads the webpack js/css into the top-level window and execute mount/unmount functions accordingly.

supports: 
- only SPA, packaged by webpack, but support for other bundlers should be possible without problems.
- they need global functions for mount/unmount and build with a prefixed root-path

pros: 
- fast and responsive integration. no size/responsive problems expected. All applications are running on the same site.
- reliable keycloak integration because top-level-navigation redirects are working without problems. 
- good navigation/linking support, deep-links between apps are no problem because of browser history-api.

cons:
- no support for non-SPA apps
- static assets needs to be fetched by a service-worker/nginx reverse-proxy which redirects request to the real application url.
- no css/js(jss) isolation
- js unloading can leave things over! 
- needs to be build with a unique prefix path (at build-time PUBLIC_URL=/unique-app-path!) to allow navigation across apps.
- all routes/links must use these prefix-path.

## Webpack-IFrame integration

Creates an iframe with "srcdoc" = "empty-document" and afterwards (onload event) it loads the webpack js/css application code into the iframe.

pros:
- the best possible isolation for js/css
- enforce same "Origin" of application code
- top-level navigation supported / history-support

cons:
- static assets needs to be fetched by a service-worker/nginx reverse-proxy which redirects request to the real app-url.
- third-party redirects, for instance to keycloak don't work currently. (redirect_uri=about:srcdoc)
TODO: find a solution!
- service-worker from is not inherited from top-level "portal"
see https://github.com/w3c/ServiceWorker/issues/765 and linked. Works currently in Gecko/Firefox only.
  

## Bugs
- serviceWorker not "work" for IFrames with srcDoc (only in firefox this works)
  https://github.com/w3c/ServiceWorker/issues/765
  https://github.com/w3c/ServiceWorker/issues/1390
