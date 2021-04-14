import React from "react";
import PropTypes from "prop-types";
import {loadWebpackFrontend} from "./hooks/WebpackLoader";

class WebpackNativeApp extends React.Component {

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
		this.state = {mountRetryErrors: 0, loadedAssets: []};
		this.renderMicroFrontend = this.renderMicroFrontend.bind(this);
	}

	componentDidMount() {
		loadWebpackFrontend(this.props.host, this.props.jsConfigUrl, document, this.renderMicroFrontend)
				.then(assets => this.state.loadedAssets = assets)
				.catch((err) => {
					console.log(err);
				})
	}

	componentWillUnmount() {
		if (window[`${this.props.unmountFunc}`]) {
			window[`${this.props.unmountFunc}`](`${this.props.name}-container`);
			this.state.loadedAssets.forEach(file => document.head.removeChild(document.getElementById(file)));
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


export default WebpackNativeApp;