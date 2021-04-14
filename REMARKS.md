# Remarks to the current demo-source

## Webpack-Native integration

pros: 
- fast/responsive integration. no size/responsive problems.
- reliable keycloak integration with working redirect 

cons:
- no css/js(jss) isolation. Unloading can leave things over! Especially css is problematically. 

## Webpack-IFrame integration

pros:
- good isolation
- enforce same "Origin" of application code

cons:
- not working with keycloak redirects (keycloak redirect_uri=about:srcdoc)

## IFrame-URL integration
pros:
- good isolation

cons:
- needs SameSite



## Bugs
- serviceWorker not "work" for IFrames with srcDoc (only in firefox this works)
https://github.com/w3c/ServiceWorker/issues/1390
