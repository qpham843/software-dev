
/**
 * Sets the chrome icon to green if vetted, default otherwise.
 * 
 * @param {boolean} audited Whether or the current tab has been vetted.
 */
function changeIcon(audited) {
	if (audited) {
		chrome.browserAction.setIcon({path: 'pe128 - green.png'});
	} else {
		chrome.browserAction.setIcon({path: 'pe128.png'});				
	}
}

chrome.runtime.onMessage.addListener((request) => {
	if (typeof request.audited === 'boolean') {
		changeIcon(request.audited);
	}
});