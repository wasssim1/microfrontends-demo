import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

window.renderFirstApp = (containerId, history) => {
    ReactDOM.render(
        <App history={history}/>,
        document.getElementById(containerId)
    );
};

window.unmountFirstApp = (containerId) => {
    let elementById = document.getElementById(containerId);//never found...call from useEffect() result is too late
    if (elementById) {
        console.log("START UNMOUNT FROM", containerId)
        ReactDOM.unmountComponentAtNode(elementById);
        console.log("FINISHED UNMOUNT FROM", containerId)
    }
    else {
        alert('CANT UNMOUNT FROM ' + containerId);
    }
};
