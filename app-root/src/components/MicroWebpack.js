import React from "react";
import PropTypes from "prop-types";

class MicroWebpack extends React.Component {

	static propTypes = {
		name: PropTypes.string.isRequired,
		host: PropTypes.string.isRequired
	};

	static defaultProps = {
		document,
		window,
	};

	constructor(props) {
		super(props);
		this.scriptId = `micro-frontend-script-${this.props.name}`;
		this.renderMicroFrontend = this.renderMicroFrontend.bind(this);
	}

	componentDidMount() {
		fetch(`${this.props.host}/asset-manifest.json`, )
				.then(res => res.json())
				.then(manifest => {
					console.log(manifest)
					manifest['entrypoints'].forEach((asset, i) => {
						if (asset.includes("/js/")) {
							const script = document.createElement('script');
							script.id = `${this.scriptId}_${i}`;
							script.src = `${this.props.host}/${asset}`;
							if (('/' + asset) === manifest['files']['main.js']) {
								script.onload = this.renderMicroFrontend;
							}
							document.head.appendChild(script);
						}
						else if (asset.includes("/css/")) {
							const styleLink = document.createElement('link');
							styleLink.href = `${this.props.host}/${asset}`;
							styleLink.rel = 'stylesheet';
							document.head.appendChild(styleLink);
						}
					});
				})
				.catch((err) => {
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
		if (window[`unmount${this.props.name}`]) {
			//TODO: decide wether we remove <script> or keep it for faster next load; if yes we find out how?
			// const toRemove = document.getElementById(`micro-frontend-script-${name}`);
			// toRemove && document.head.removeChild(toRemove);
			window[`unmount${this.props.name}`](`${this.props.name}-container`);
		} else {
			const errorDiv = document.getElementById('error-container');
			const rootDiv = document.getElementById('root');
			errorDiv && rootDiv && rootDiv.removeChild(errorDiv);
		}
	}

	renderMicroFrontend() {
		console.log(`renderMicroFrontend ${this.props.name}`);
		if (window[`render${this.props.name}`]) {
			window[`render${this.props.name}`](`${this.props.name}-container`, this.props.history);
		} else {
			window.renderMicroFrontendError(this.props.name);
		}
	}


	render() {
		return <div id={`${this.props.name}-container`}/>
	}
}


export default MicroWebpack;