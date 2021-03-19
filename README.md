# microfrontends-demo

Follows the javascript-integration idea from https://martinfowler.com/articles/micro-frontends.html#TheExampleInDetail

In the project's root, type:

```
  $ docker-compose up
```

To launch each app in a standalone and dev modes, ``cd ${micro-app}`` and ``npm start`` it.

### Overview
The project contains:
 - Main App or App Shell (app-root)
 - n MicroApps
 
The App Shell (react-app) holds the skeleton of the global app (app-header, app-body...), as well as browser services such as global history handling, mounting and unmounting MicroApps...

Each MicroApp should be deployed and running independently, while the App Shell would be responsible about pointing to those MicroApps as well as their integration during **Run-time** via JavaScript.

For this, the App Sell would fetch the ``asset-manifest.json`` from the MicroApp **Host** in order to retrieve the **entrypoint-files** bundles location.

To make it simpler, I added ``react-app-rewired`` module to bundle the bundles.
It will also help later to override the **webpack config** without *ejecting* (through ``config-overrides.js``).

This way works fine for the **MicroReactApps**, and it should be also for the **MicroAngularApps** since both (React and Angular) uses the same module bundler (**webpack**). 

### TODOs
* Angular
  - find out how to handle webpack config
  - find an entrypoint (equiv. ``asset-manifest.json`` in react)
* PWA
  - add service workers to manage cashing ++

### Challenges
* Avoid redundant ``react`` ``react-dom`` modules for each MicroReactApp (try first with *service-workers*)
* Communication between MicroApps (hopefully not needed)
* Decide whether split MicroApps by **Apps** or **Components** or **...**
* Try nested PWA (PWAs inside PWA)
* Global styles sharing


### Javascript-Frontend Requirements (currently)

- Each frontend needs to run below a unique sub-directory path like /app1.
- accessible /app1/asset-manifest.json webpack bundler manifest 
- static resources needs to be placed below /app1/static (default for create-react-app)
- global (window)functions "render$NAME" and "unmount$NAME" as the contract between portal and micro-frontend.
