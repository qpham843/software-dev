import verifyAudit from "./verify.js";

/**
 * Sets the chrome icon to green if vetted, default otherwise.
 * 
 * @param {boolean} audited Whether or the current tab has been vetted.
 */
function changeIcon(audited) {
	if (audited) {
		chrome.browserAction.setIcon({
			path: {
				"48": "pe48 - green.png",
				"128": "pe128 - green.png"
			}
		});
	} else {
		chrome.browserAction.setIcon({
			path: {
				"48": "pe48.png",
				"128": "pe128.png"
			}
		});
	}
}

/** Use content script to detect tab change. On tab changes, use verifyAudit on the new url.  */
chrome.runtime.onMessage.addListener((request) => {
	if (request.from === "content") {
		chrome.tabs.query({active: true, currentWindow: true}, tabs => {
			verifyAudit(tabs[0].url, changeIcon);
		});
	}
});
