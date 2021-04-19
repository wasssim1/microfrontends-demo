import {createElement, useEffect, useRef} from "react";
import {loadWebpackFrontend} from "./WebpackLoader";
import {useLocation} from "react-router";

export const useWebpackIFrame = ({url , name, mount_path, mountFunc, jsConfigUrl, history}) => {
	let location = useLocation();
	const loadWebpackSources = (event) => {
		console.log("IFRAME ON_LOAD", event);
		try {
			console.log("IFrame location " + event.target.contentWindow.location.origin + " / " + location.hash);
			loadWebpackFrontend(url, jsConfigUrl, event.target.contentWindow.document,
					/*() => event.target.contentWindow.window[mountFunc]('root', history)*/
					//TODO: unclear why timing issues
					event.target.contentWindow.setTimeout(() => {
						event.target.contentWindow.window[mountFunc]('root', history);
					}, 500)
			)
			.then(assets => console.log("Loaded assets", assets));
		}
		catch (e) {
			//ignore cross-origin frame content
		}
	}
	const ref = useRef(null);
	const iFrame = createElement('iframe', {
		ref,
		title: name,
		origin: window.origin,
		src: mount_path + location.hash,
		sandbox: "allow-forms allow-same-origin allow-scripts allow-top-navigation",
		srcDoc: `<html><head><title>${name}</title></head><body><div id="root"></div></body></html>`,
		onLoad: loadWebpackSources
	});
	useEffect(() => {
		//try to transfer url parameters
		if (ref.current && location.hash) {
			//console.log("Transfer HASH to IFrame", location.hash, ref.current.contentWindow);
			//ref.current.contentWindow.location.hash = location.hash;
		}
	}, [ref, location.hash]);

	return { iFrame };
}