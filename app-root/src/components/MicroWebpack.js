import React from "react";
import PropTypes from "prop-types";

class MicroWebpack extends React.Component {

	static propTypes = {
		name: PropTypes.string.isRequired,
		host: PropTypes.string.isRequired,
		mountFunc: PropTypes.string.isRequired,
		unmountFunc: PropTypes.string.isRequired,
		jsConfigUrl: PropTypes.string,
	};

	static defaultProps = {
		document,
		window,
	};

	constructor(props) {
		super(props);
		this.scriptId = `micro-frontend-script-${this.props.name}`;
		this.state = {mountRetryErrors: 0, loadedStyles: [], loadedScripts: []};
		this.renderMicroFrontend = this.renderMicroFrontend.bind(this);
	}

	componentDidMount() {
		if (this.props.jsConfigUrl) {
			const script = document.createElement('script');
			script.id = `${this.props.name}_config`;
			script.src = this.props.jsConfigUrl;
			console.log(`Loading App-Javascript-Config `, script)
			document.head.appendChild(script);
			this.state.loadedScripts.push(`${this.props.name}_config`);
		}
		fetch(`${this.props.host}/asset-manifest.json`)
				.then(res => res.json())
				.then(manifest => {
					console.log(manifest)
					manifest['entrypoints'].forEach((asset, i) => {
						let assetUrl = `${this.props.host}/${asset}`;
						if (asset.includes("/js/")) {
							const script = document.createElement('script');
							script.id = assetUrl;
							script.src = assetUrl;
							if (manifest['files']['main.js'].endsWith(asset)) {
								script.onload = this.renderMicroFrontend;
							}
							if (!document.getElementById(assetUrl)) {
								console.log(`Loading App-Javascript-Asset `, script)
								document.head.appendChild(script);
								this.state.loadedScripts.push(assetUrl);
							}
							else if (script.onload) {
								console.log(`Start Render App`, script)
								this.renderMicroFrontend();
							}
						}
						else if (asset.includes("/css/")) {
							const styleLink = document.createElement('link');
							styleLink.id = assetUrl;
							styleLink.href = assetUrl;
							styleLink.rel = 'stylesheet';
							if (!document.getElementById(assetUrl)) {
								console.log(`Loading App-CSS-Asset `, styleLink)
								document.head.appendChild(styleLink);
								this.state.loadedStyles.push(assetUrl);
							}
						}
					});
				})
				.catch((err) => {
					console.log(err);
					//fallback to IFrame integration
					let appRootDiv = document.getElementById(`${this.props.name}-container`);
					let iframe = appRootDiv.getElementsByTagName('iframe');
					if (iframe.length === 0) {
						iframe = document.createElement('iframe');
					}
					else {
						iframe = iframe[0];
					}
					iframe.src = this.props.host;
					iframe.style = "width:100%; height:500px";
					appRootDiv.appendChild(iframe);
				})
	}

	componentWillUnmount() {
		if (window[`${this.props.unmountFunc}`]) {
			//TODO: decide wether we remove <script> or keep it for faster next load; if yes we find out how?
			// const toRemove = document.getElementById(`micro-frontend-script-${name}`);
			// toRemove && document.head.removeChild(toRemove);
			window[`${this.props.unmountFunc}`](`${this.props.name}-container`);
			this.state.loadedStyles.forEach(file => document.head.removeChild(document.getElementById(file)));
			this.state.loadedStyles = [];
			this.state.loadedScripts.forEach(file => document.head.removeChild(document.getElementById(file)));
			this.state.loadedScripts = [];
		} else {
			const errorDiv = document.getElementById('error-container');
			const rootDiv = document.getElementById('root');
			errorDiv && rootDiv && rootDiv.removeChild(errorDiv);
		}
	}

	renderMicroFrontend() {
		let entrypointName = `${this.props.mountFunc}`;
		if (window[entrypointName]) {
			console.log(`mount Frontend ${this.props.name}`, entrypointName);
			window[entrypointName](`${this.props.name}-container`, this.props.history);
		} else {
			if (this.state.mountRetryErrors < 5) {
				this.state.mountRetryErrors++;
				console.log("retry search for mount-Function", entrypointName);
				setTimeout(this.renderMicroFrontend, 100);
			}
			else {
				console.error(`mount-Function for Frontend ${this.props.name} not found`, entrypointName);
				window.renderMicroFrontendError(this.props.name, `global ${entrypointName} function dont exists in window`);
			}
		}
	}


	render() {
		return <div id={`${this.props.name}-container`}/>
	}
}


export default MicroWebpack;