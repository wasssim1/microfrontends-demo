import React, {useEffect} from 'react';

//TODO: Figure out how to play around Angular js-bundles
const MicroAngular = (props) => {
    const {history, name, host, document, window} = props;

    useEffect(() => {
        const scriptId = `micro-frontend-script-${name}`;

        if (document.getElementById(scriptId)) {
            renderMicroFrontend();
            return;
        }

        const angularManifest = "something.json";
        fetch(`${host}/${angularManifest}`)
            .then(res => res.json())
            .then(manifest => {
                const script = document.createElement('script');
                script.id = scriptId;
                document.head.appendChild(script);
            })
            .catch(() => {
            });

    }, []);

    useEffect(() => {
        return () => {
        };
    }, []);

    function renderMicroFrontend() {
    }

    return (
        <div id={`${name}-container`}/>
    )
};

MicroAngular.defaultProps = {
    document,
    window,
};

export default MicroAngular;
