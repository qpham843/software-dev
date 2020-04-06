
import { verifyAudit } from '/verify.js';

/**
 * Change the icon based on verifyAudit using the URL from the current tab.
 */
function changeIcon() {
    chrome.tabs.query({active: true}, function(tab){
			alert(tab[0].url);
			verifyAudit(tab[0].url, (audited) => {
				if (audited) {
					chrome.browserAction.setIcon({path: 'pe128 - green.png'});
				} else {
					chrome.browserAction.setIcon({path: 'pe128.png'});				
				}
			});
    });
}

//listen for new tab to be activated
chrome.tabs.onActivated.addListener(function(activeInfo) {
    changeIcon();
});

//listen for current tab to be changed
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    changeIcon();
});

