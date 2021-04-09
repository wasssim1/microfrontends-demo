export function receiveMessage(event) {
	if (typeof event.data !== "string") return;
	var message = event.data.split(':');
	var eventName = message[0];
	if (/*event.origin.endsWith("bvo.localhost") &&*/ eventName === 'resize') {
		Array.from(document.getElementsByTagName('iframe'))
				.filter(frame => frame.contentWindow === event.source)
				.map(frame => frame.parentElement.style.height = message[1] + "px");
	}
}