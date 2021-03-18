import React, {useEffect} from 'react';

//TODO: Find a way (Should ne simple)
const MicroPlainHtml = (props) => {
    const {history, name, host, document, window} = props;
    let url = host;//TODO: append sub-url extracted from history

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
        <div id={`${name}-container`}>
            <iframe src={url} style={{width:"100%",height:"500px"}}/>
        </div>
    )
};

MicroPlainHtml.defaultProps = {
    document,
    window,
};

export default MicroPlainHtml;
