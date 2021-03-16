import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

window.renderMicroFrontendError = (microFeName, err) => {
    const errorDiv = document.createElement('div');
    errorDiv.id = `error-container`;
    errorDiv.innerText = `Error rendering ${microFeName} (${err})`
    errorDiv.style.color = 'darkred';
    const rootDiv = document.getElementById('root');
    rootDiv.appendChild(errorDiv);
}
