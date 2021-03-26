import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
		<App>
			<ServiceWorkerDebug/>
		</App>,
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

function logState(state) {
	var liElement = document.createElement('li');
	liElement.textContent = state;
	document.querySelector('#states').appendChild(liElement);
}

if ('serviceWorker' in navigator) {
	// The current browser supports service workers.
	document.querySelector('#availability').textContent = 'are';
	// navigator.serviceWorker.controlled iff there is currently a service worker handling
	// requests on this page for the current navigation.
	document.querySelector('#controlled').textContent = navigator.serviceWorker.controller ? 'is' : 'is not';

	// Override the default scope of '/' with './', so that the registration applies
	// to the current directory and everything underneath it.
	navigator.serviceWorker.register('service-worker.js', {scope: './'})
			.then(function (registration) {
				// At this point, registration has taken place.
				// The service worker will not handle requests until this page and any
				// other instances of this page (in other tabs, etc.) have been
				// closed/reloaded.
				document.querySelector('#register').textContent = 'succeeded';

				var serviceWorker;
				if (registration.installing) {
					serviceWorker = registration.installing;
					document.querySelector('#kind').textContent = 'installing';
				}
				else if (registration.waiting) {
					serviceWorker = registration.waiting;
					document.querySelector('#kind').textContent = 'waiting';
				}
				else if (registration.active) {
					serviceWorker = registration.active;
					document.querySelector('#kind').textContent = 'active';
				}

				if (serviceWorker) {
					//logState(serviceWorker.state);
					serviceWorker.addEventListener('statechange', function (e) {
						logState(e.target.state);
						if (e.target.state === 'activated') {
							console.log("Reload page cause new ServiceWorker was installed and activated!")
							window.location.reload();
						}
					});
				}
			}).catch(function (error) {
		// Something went wrong during registration. The service-worker.js file
		// might be unavailable or contain a syntax error.
		document.querySelector('#register').textContent = 'failed: ' + error;
	});
}
else {
	// The current browser doesn't support service workers.
	document.querySelector('#availability').textContent = 'are not';
}

function ServiceWorkerDebug(props) {
	return <div className="output">
		<h2>Service Worker Availability</h2>
		<p>
			Service Workers <strong id="availability"></strong> available in your browser.
			<em>(Whether <code>'serviceWorker' in navigator</code>.)</em>
		</p>

		<h2>Is This Page Controlled by a Service Worker?</h2>
		<p>
			This page <strong id="controlled"></strong> currently controlled.
			<em>(Whether <code>navigator.serviceWorker.controller</code> is set.)</em>
		</p>

		<h2>Info about the Current Registration</h2>
		<p>
			The <code>navigator.serviceWorker.register()</code> call <strong id="register"></strong>.
		</p>
		<p>
			The current registration represents the <strong id="kind"></strong> service worker.
		</p>
		<p>
			<em>Tip:</em> With a newly registered service worker in the <code>activated</code> state,
			refresh the page to have the service worker take control.
			You can also refresh with the Shift key held down to load
			the page without the service worker controlling it.
		</p>
		<p>State transitions of the service worker associated with the current registration:</p>
		<ol id="states"></ol>
	</div>;
}
