//import verifyAudit from "./verify.js";

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
/**
 * Change icon according to current tab's URL.
 */
function changeIconBasedOnUrl() {
	chrome.tabs.query({active: true, currentWindow: true}, tabs => {
		//console.log(tabs);
		if (tabs.length > 0)
			verifyAudit(tabs[0].url, changeIcon);
	});
}

/** On url changes, reverify. */
chrome.tabs.onUpdated.addListener(changeIconBasedOnUrl);
chrome.tabs.onCreated.addListener(changeIconBasedOnUrl);
chrome.tabs.onActivated.addListener(changeIconBasedOnUrl);
chrome.windows.onFocusChanged.addListener(changeIconBasedOnUrl);


//export let vizLink = "";

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
		return;
	}
	for (let article of articles) {
    	//display = display + article[ 'Article Link' ].url + "\n";
		if (article[ 'Visualization Link' ] && article[ 'Article Link' ].localeCompare(url, {sensitivity: 'case'}) === 0) {
			vizLink = article[ 'Visualization Link' ];
        	callback(true);
			return;
		}
	}
	vizLink = "";
	callback(false);
}


var articles = [
       {"article_sha256": "7360da3cdcf83a48e365821654ef0750810f3483efb8e25ad792eed6f4bf0b6f"
               , "articleHash": "7360da3cdcf83a48e365821654ef0750810f3483efb8e25ad792eed6f4bf0b6f"
               , "Title": "US might be complementing Iran sanctions with bioweapon: Expert"
               , "Author": "PressTV"
               , "Date": "Tue March 17 18:56:55 UTC 2020"
               , "ID": 100054
               , "Article Link": "https://nthnews.net/en/wordnews/us-might-be-complementing-iran-sanctions-with-bioweapon-expert/"
               , "Visualization Link": "/visualizations/7360da3cdcf83a48e365821654ef0750/visualization.html"
               , "Plain Text": "/visualizations/7360da3cdcf83a48e365821654ef0750/article.txt"
               , "Highlight Data": "/visualizations/7360da3cdcf83a48e365821654ef0750/viz_data.csv"
       }
       , {"article_sha256": "4b537e0ed21179a29ed28da28057d338e67330ae12123ccceba6724f35bd68a4"
               , "articleHash": "4b537e0ed21179a29ed28da28057d338e67330ae12123ccceba6724f35bd68a4"
               , "Title": "Social distancing comes with psychological fallout"
               , "Author": "Sujata Gupta"
               , "Date": "Sun March 29 18:56:55 UTC 2020"
               , "ID": 100059
               , "Article Link": "https://www.sciencenews.org/article/coronavirus-covid-19-social-distancing-psychological-fallout"
               , "Visualization Link": "/visualizations/4b537e0ed21179a29ed28da28057d338/visualization.html"
               , "Plain Text": "/visualizations/4b537e0ed21179a29ed28da28057d338/article.txt"
               , "Highlight Data": "/visualizations/4b537e0ed21179a29ed28da28057d338/viz_data.csv"
       }
       , {"article_sha256": "47990959103662e94e796d979018922afddc880fb4b867c7ca2ac8aa2146e7c4"
               , "articleHash": "47990959103662e94e796d979018922afddc880fb4b867c7ca2ac8aa2146e7c4"
               , "Title": "2005 CIA Report on Coronavirus Pandemic Discovered"
               , "Author": "Lyubov Stepushova"
               , "Date": "Tue March 17 18:56:55 UTC 2020"
               , "ID": 2005
               , "Article Link": "https://www.pravda.ru/world/1481589-cia_coronavirus/"
               , "Visualization Link": "/visualizations/47990959103662e94e796d979018922a/visualization.html"
               , "Plain Text": "/visualizations/47990959103662e94e796d979018922a/article.txt"
               , "Highlight Data": "/visualizations/47990959103662e94e796d979018922a/viz_data.csv"
       }
       , {"article_sha256": "3be14d67e2d88964904dcbe7df176bb81dacfc76a6f2e4ec66b45681c86c9301"
               , "articleHash": "3be14d67e2d88964904dcbe7df176bb81dacfc76a6f2e4ec66b45681c86c9301"
               , "Title": "US military may have brought coronavirus to Wuhan, says China in war of words with US"
               , "Author": "Straits Times"
               , "Date": "Tue March 17 18:56:55 UTC 2020"
               , "ID": 100055
               , "Article Link": "https://www.straitstimes.com/asia/east-asia/us-military-may-have-brought-coronavirus-to-wuhan-says-china-in-war-of-words-with-us"
               , "Visualization Link": "/visualizations/3be14d67e2d88964904dcbe7df176bb8/visualization.html"
               , "Plain Text": "/visualizations/3be14d67e2d88964904dcbe7df176bb8/article.txt"
               , "Highlight Data": "/visualizations/3be14d67e2d88964904dcbe7df176bb8/viz_data.csv"
       }
       , {"article_sha256": "be0b18a87d4370fa579180ef26dcb7080598f27f9ec76181f2cfd851f320da06"
               , "articleHash": "be0b18a87d4370fa579180ef26dcb7080598f27f9ec76181f2cfd851f320da06"
               , "Title": "SARS-CoV-2 Can Live on Plastic and Steel for 2\u20133 Days"
               , "Author": "Kerry Grens"
               , "Date": "Thu March 12 18:56:55 UTC 2020"
               , "ID": 100058
               , "Article Link": "https://www.the-scientist.com/news-opinion/sars-cov-2-can-live-on-plastic-and-steel-for-2-3-days-67260"
               , "Visualization Link": "/visualizations/be0b18a87d4370fa579180ef26dcb708/visualization.html"
               , "Plain Text": "/visualizations/be0b18a87d4370fa579180ef26dcb708/article.txt"
               , "Highlight Data": "/visualizations/be0b18a87d4370fa579180ef26dcb708/viz_data.csv"
       }
];