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
        ReactDOM.unmountComponentAtNode(elementById);
    }
};
