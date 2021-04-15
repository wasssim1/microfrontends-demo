/*
	This file should be included in the applications/frontends which are embedded in a iframe by the src attribute.
	this allows the iframes to post their (re)size messages to parent frame(portal)
 */
(function (win, doc) {
	let awesomeIframe = {};
	awesomeIframe.windowHeight = 0;
	awesomeIframe.htmlElement = doc.getElementsByTagName('html')[0];
	// Domains to send post messages to - '*' for wildcard domains
	awesomeIframe.targetDomain = '*';
	awesomeIframe.resizeFrame = function () {
		let windowHeight = doc.body ? Math.max(doc.body.offsetHeight, awesomeIframe.htmlElement.offsetHeight)
				: awesomeIframe.htmlElement.offsetHeight;
		if (awesomeIframe.windowHeight === windowHeight) {
			win.requestAnimationFrame.call(win, awesomeIframe.resizeFrame);//return before next repaint
			return false;
		}
		console.log("WindowHeight:" + windowHeight)
		//windowHeight changed, save new Height and resize(same-origin) or postMessage(cross-origin) the new Height
		awesomeIframe.windowHeight = windowHeight;
		try {
			// Same Origin iFrame
			// manipulate style of the iframe-element the page is embedded in - see: https://developer.mozilla.org/en-US/docs/Web/API/Window/frameElement
			win.frameElement.style.height = windowHeight + 'px';
		}
		catch (e) {
			// Cross Origin iFrame
			// post message to parent iframe - see https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
			win.parent.postMessage('resize:' + windowHeight, awesomeIframe.targetDomain);
		}
		win.requestAnimationFrame.call(win, awesomeIframe.resizeFrame);
	};

	win.requestAnimationFrame.call(win, awesomeIframe.resizeFrame);
})(window, document);
