import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

window.renderSecondApp = (containerId, history) => {
    ReactDOM.render(
        <App history={history}/>,
        document.getElementById(containerId)
    );
};

window.unmountSecondApp = (containerId) => {
    ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};
