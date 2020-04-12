/**
 * Checks if an article has been audited (and submitted). 
 * For example, this function called on
 * https://www.vox.com/science-and-health/2017/2/16/14622198/doctors-prescribe-opioids-varies-patients-hooked
 * would callback on true since it has been audited by public editor.
 *
 * @param {string} url The url of the article to be verified.
 * @param {function} Calls one param with true if the article has been audited, else false.
 */

 console.log("running");
async function verifyAudit(url, callback) {
	if (!url) {
		callback(false);
	}
	let response = await fetch("http://157.230.221.241:8080/demo-0.0.1-SNAPSHOT/article/");
	let data = await response.json();
	for (let article of data) {
		if (article.visData && article.url.localeCompare(url, {sensitivity: 'case'}) === 0) {
			callback(true);
		}
	}
	callback(false);
}

/**
 * Sends the results of verifyAudit to popup.js
 * 
 * @param {boolean} verifyAuditResults Whether or the current tab has been audited.
 */
function sendAudited(verifyAuditResults) {
	console.log("send audited called");
	chrome.runtime.sendMessage({ 
		audited: verifyAuditResults
	});
}


function getAuditResults() {
	chrome.tabs.query({active: true}, tabs => {
		verifyAudit(tabs[0].url, sendAudited);
	});
}

/** When the popup opens, call verifyAudit on the current tab's URL then send that 
 * result to popup.js */
chrome.runtime.onMessage.addListener(getAuditResults);

/** Tells background.js to change icon based on current tab. */
chrome.tabs.query({active: true}, tabs => {
	verifyAudit(tabs[0].url, sendAudited);
});

