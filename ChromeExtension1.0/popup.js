//This function is responsible for adding the 'onclick' listener to the 'capturebutton'.
document.addEventListener('DOMContentLoaded', function() {
    var capture = document.getElementById('captureButton');
    //Below is the event listener that waits for you to click the 'captureButton'
    capture.onclick = function() {
        //Below is a function call to capture the current tab's URL.
        let cat = getURL(checkURL);
        console.log(cat);
        if (getURL(checkURL)) {
          //change style to show success
        }
    };
});

/**
 * This function is responsible for applying input function to the current tab's URL.
 * 
 * @param {function} func The input function calls on one param: this tab's URL.
 * @return Returns nothing
 */
function getURL(func) {
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
      //Gets the first tab and it's url.
      func(tabs[0].url);
  });
}

//The below function will check if the current tab's URL is in the database of article URLs.

function checkURL(targetURL) {
  //Generate a new request.
  var xhttp = new XMLHttpRequest();
  //Do the following function when ready.
  xhttp.onreadystatechange = function() {
    //Note: this.responseText is generated before this function is called. The responseText is what our server responds to the request with, but converted into a string.
    // console.log(this);
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("result").innerHTML = "Thank you for submitting this article!";
      return true;
    } else if (this.readyState == 4) {
      document.getElementById("result").innerHTML = "Error : " + this.responseText;
      return false;
    } else {
      document.getElementById("result").innerHTML = "Loading...";
      return false;
    }
  };

  //The first part of the queried URL allows us to make Cross Origin HTTPS requests,
  //The second part of the URL submits the URL to the database.
  xhttp.open("POST", "http://157.230.221.241:8080/demo-0.0.1-SNAPSHOT/article/submit?url=" + targetURL.toString(), true);
  xhttp.send();

}

/* Sets placeholder form text to be current tab's URL. */
function setPreviewURL(URLInput) {
  document.getElementById("websiteURL").defaultValue = URLInput;
}
getURL(setPreviewURL);

