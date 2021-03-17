import React, {useEffect} from 'react';

const MicroReact = (props) => {
    const {history, name, host, document, window} = props;

    useEffect(() => {
        const toRemove = document.getElementById(`error-container`);
        toRemove && document.head.removeChild(toRemove);

        const scriptId = `micro-frontend-script-${name}`;

        if (document.getElementById(scriptId)) {
            console.debug(document.getElementById(scriptId))
            renderMicroFrontend();
            return;
        }

        fetch(`${host}/asset-manifest.json`, )
            .then(res => res.json())
            .then(manifest => {
                console.log(manifest)
                manifest['entrypoints'].forEach((asset, i) => {
                   if (asset.includes("/js/")) {
                       const script = document.createElement('script');
                       script.id = `${scriptId}_${i}`;
                       script.src = `${host}/${asset}`;
                       if (('/' + asset) === manifest['files']['main.js']) {
                           script.onload = renderMicroFrontend;
                       }
                       document.head.appendChild(script);
                   }
                   else if (asset.includes("/css/")) {
                       const styleLink = document.createElement('link');
                       styleLink.href = `${host}/${asset}`;
                       styleLink.rel = 'stylesheet';
                       document.head.appendChild(styleLink);
                   }
                });
            })
            .catch((err) => {
                //fallback to IFrame integration
                let appRootDiv = document.getElementById(`${name}-container`);
                let iframe = appRootDiv.getElementsByTagName('iframe');
                if (iframe.length === 0) {
                    iframe = document.createElement('iframe');
                }
                else {
                    iframe = iframe[0];
                }
                iframe.src = host;
                iframe.style = "width:100%; height:500px";
                appRootDiv.appendChild(iframe);
                //window.renderMicroFrontendError(name, err);
            });

    }, [document]);

    useEffect(() => {
        return () => {
            if (window[`unmount${name}`]) {
                //TODO: decide wether we remove <script> or keep it for faster next load; if yes we find out how?
                // const toRemove = document.getElementById(`micro-frontend-script-${name}`);
                // toRemove && document.head.removeChild(toRemove);

                window[`unmount${name}`](`${name}-container`);
            } else {
                const errorDiv = document.getElementById('error-container');
                const rootDiv = document.getElementById('root');
                errorDiv && rootDiv && rootDiv.removeChild(errorDiv);
            }

        };
    }, []);

    function renderMicroFrontend() {
        if (window[`render${name}`]) {
            window[`render${name}`](`${name}-container`, history);
        } else {
            window.renderMicroFrontendError(name);
        }
    }

    return (
        <div id={`${name}-container`}/>
    )
};

MicroReact.defaultProps = {
    document,
    window,
};

export default MicroReact;
