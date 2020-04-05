//This function is responsible for adding the 'onclick' listener to the 'captureButton'.
document.addEventListener('DOMContentLoaded', function() {
    var capture = document.getElementById('captureButton');
    //Below is the event listener that waits for you to click the 'captureButton'
    capture.onclick = function() {
        submitURL(getURL());
    };
});

/**
 * Gets the URL previewed.
 * 
 * @return String of the URL
 */
function getURL() {
  return document.getElementById("websiteURL").value;
}

/** 
 * Check if the current URL is in the database of article URLs.
 * Used by XMLHttpRequest.onreadystatechange.
 */ 
function checkURL() {
  //Note: this.responseText is generated before this function is called. The responseText is what our server responds to the request with, but converted into a string.

  if (this.readyState == 4 && this.status == 200) {
    document.getElementById("result").innerText = "This article has already been submitted.";
  } else if (this.readyState == 4 && this.status == 500) {
    let response = JSON.parse(this.responseText);
    console.log("First time" + response.message);
    if (response.error.localeCompare("Internal Server Error") === 0 
        && response.message.localeCompare("No message available") === 0
        && response.path.localeCompare("/demo-0.0.1-SNAPSHOT/article/submit") === 0) {
          //When submits for the first time, error 500 with specific message

      document.getElementById("result").innerText = "Thank you for submitting this article!";  
    }
  } else if (this.readyState == 4) {
    document.getElementById("result").innerText = "Error : " + this.responseText;
  } else {
    document.getElementById("result").innerText = "Loading...";
  }
}

/**
 * Submits the target URL to the article funnel server. 
 * 
 * @param {String} targetURL URL to be submitted.
 */
function submitURL(targetURL) {
  //Generate a new request.
  var xhttp = new XMLHttpRequest();
  //Do the following function when ready.
  xhttp.onreadystatechange = checkURL;
  //The first part of the queried URL allows us to make Cross Origin HTTPS requests,
  //The second part of the URL submits the URL to the database.
  xhttp.open("POST", "http://157.230.221.241:8080/demo-0.0.1-SNAPSHOT/article/submit?url=" 
    + targetURL.toString(), true);
  xhttp.send();
}


/**
 * Checks if an article has been both submitted and audited. 
 * For example, this function called on
 * https://www.vox.com/science-and-health/2017/2/16/14622198/doctors-prescribe-opioids-varies-patients-hooked
 * would return true since it has been audited by public editor.
 *
 * @param {string} url The url of the article to be verified.
 * @returns {boolean} true if the article has been audited, else false.
 */
async function verifyAudit(url) {
  let response = await fetch('http://157.230.221.241:8080/demo-0.0.1-SNAPSHOT/article');
  let data = await response.json()
  for (let article of data) {
    if (article.visData &&article.url.localeCompare(url, {sensitivity: 'case'}) === 0) {
      console.log(article);
      return true;
    }
  }
  return false;
}

/**
 * Sets placeholder form text to be current tab's URL.
 * 
 * @param {String} URLInput The URL to be previewed.
 */
function setPreviewURL(URLInput) {
  document.getElementById("websiteURL").defaultValue = URLInput;
}

/** Sets default value to current tab's URL. */
chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
  //Gets the first tab and it's url.
  setPreviewURL(tabs[0].url);
});
