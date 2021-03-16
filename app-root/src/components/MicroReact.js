import React, {useEffect} from 'react';

const MicroReact = (props) => {
    const {history, name, host, document, window} = props;

    useEffect(() => {
        const scriptId = `micro-frontend-script-${name}`;

        if (document.getElementById(scriptId)) {
            console.debug(document.getElementById(scriptId))
            renderMicroFrontend();
            return;
        }

        fetch(`${host}/asset-manifest.json`)
            .then(res => res.json())
            .then(manifest => {
                console.debug(manifest)
                const script = document.createElement('script');
                script.id = scriptId;
                script.src = `${host}/${manifest['entrypoints'][1]}`;
                script.onload = renderMicroFrontend;
                document.head.appendChild(script);

                const styleLink = document.createElement('link');
                styleLink.href = `${host}/${manifest['entrypoints'][0]}`;
                styleLink.rel = 'stylesheet';
                document.head.appendChild(styleLink);

            })
            .catch((err) => {
                try {
                    const script = document.createElement('script');
                    script.id = scriptId;
                    script.src = `${host}/static/js/bundle.js`;
                    script.onload = renderMicroFrontend;
                    document.head.appendChild(script);
                } catch (e) {
                    window.renderMicroFrontendError(name, err);
                }
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
