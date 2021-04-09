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
		this.state = {mountRetryErrors: 0}
		this.renderMicroFrontend = this.renderMicroFrontend.bind(this);
	}

	componentDidMount() {
		if (this.props.jsConfigUrl) {
			const script = document.createElement('script');
			script.id = `${this.props.name}_config`;
			script.src = this.props.jsConfigUrl;
			console.log(`Loading App-Javascript-Config `, script)
			document.head.appendChild(script);
		}
		fetch(`${this.props.host}/asset-manifest.json`, )
				.then(res => res.json())
				.then(manifest => {
					console.log(manifest)
					manifest['entrypoints'].forEach((asset, i) => {
						if (asset.includes("/js/")) {
							const script = document.createElement('script');
							script.id = `${this.scriptId}_${i}`;
							let elementById = document.getElementById(script.id);
							if (!elementById) {
								script.src = `${this.props.host}/${asset}`;
								if (manifest['files']['main.js'].endsWith(asset)) {
									console.log(`Found Entrypoint for ${this.props.name}`)
									script.onload = this.renderMicroFrontend;
								}
								console.log(`Loading App-Javascript-Asset `, script)
								document.head.appendChild(script);
							}
							else {
								this.renderMicroFrontend();
							}
						}
						else if (asset.includes("/css/")) {
							const styleLink = document.createElement('link');
							styleLink.href = `${this.props.host}/${asset}`;
							styleLink.rel = 'stylesheet';
							console.log(`Loading App-CSS-Asset `, styleLink)
							document.head.appendChild(styleLink);
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