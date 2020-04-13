
/**
 * Checks if an article has been audited (and submitted). 
 * For example, this function called on
 * https://www.vox.com/science-and-health/2017/2/16/14622198/doctors-prescribe-opioids-varies-patients-hooked
 * would callback on true since it has been audited by public editor.
 *
 * @param {string} url The url of the article to be verified.
 * @param {function} Calls one param with true if the article has been audited, else false.
 */
async function verifyAudit(url, callback) {
	if (!url) {
		callback(false);
	}
	let response = await fetch("http://157.230.221.241:8080/demo-0.0.1-SNAPSHOT/article/");
	let data = await response.json();
	for (let article of data) {
		if (article.visData && article.url.localeCompare(url, {sensitivity: 'case'}) === 0) {
			callback(true);
			return;
		}
	}
	callback(false);
}

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

/** On tab changes, use verifyAudit on the new url. 
 * This checks only once per change.
*/
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	chrome.tabs.query({active: true, currentWindow: true}, tabs => {
		verifyAudit(tabs[0].url, changeIcon);
	});
});

chrome.tabs.onCreated.addListener(function(tabId, changeInfo, tab) {         
	chrome.tabs.query({active: true, currentWindow: true}, tabs => {
		verifyAudit(tabs[0].url, changeIcon);
	});
});
