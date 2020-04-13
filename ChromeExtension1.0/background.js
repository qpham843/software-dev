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
				"48": "images/pe48 - green.png",
				"128": "images/pe128 - green.png"
			}
		});
	} else {
		chrome.browserAction.setIcon({
			path: {
				"48": "images/pe48.png",
				"128": "images/pe128.png"
			}
		});
	}
}

/** On tab changes, reverify. */
chrome.tabs.onUpdated.addListener(() => {
	chrome.tabs.query({active: true, currentWindow: true}, tabs => {
		verifyAudit(tabs[0].url, changeIcon);
	});
});

chrome.tabs.onCreated.addListener(() => {         
	chrome.tabs.query({active: true, currentWindow: true}, tabs => {
		verifyAudit(tabs[0].url, changeIcon);
	});
});

chrome.tabs.onActivated.addListener(() => {         
	chrome.tabs.query({active: true, currentWindow: true}, tabs => {
		verifyAudit(tabs[0].url, changeIcon);
	});
});
