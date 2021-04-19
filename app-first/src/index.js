import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

window.renderFirstApp = (containerId, history) => {
    let targetElement = document.getElementById(containerId);
    console.log("Render-App into ", targetElement)
    ReactDOM.render(
        <App history={history}/>,
        targetElement
    );
};

window.unmountFirstApp = (containerId) => {
    let elementById = document.getElementById(containerId);
    if (elementById) {
        console.log("START UNMOUNT FROM", containerId)
        ReactDOM.unmountComponentAtNode(elementById);
        console.log("FINISHED UNMOUNT FROM", containerId)
    }
    else {
        alert('CANT UNMOUNT FROM ' + containerId);
    }
};

//TODO: remove this TEST ONLY code, it shows the "unloading" problem from the webpack/javascript integration solution
(function (win, doc) {
    let timerID = setInterval(() => console.log("INTERVAL TIMER from app1"), 5000);
    setTimeout(() => clearInterval(timerID), 60000);
})(window, document);
