import React, {useEffect} from 'react';

//TODO: Find a way (Should ne simple)
const MicroPlainHtml = (props) => {
    const {history, name, host, document, window} = props;

    useEffect(() => {
        const scriptId = `micro-frontend-script-${name}`;

        if (document.getElementById(scriptId)) {
            renderMicroFrontend();
            return;
        }

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

MicroPlainHtml.defaultProps = {
    document,
    window,
};

export default MicroPlainHtml;
