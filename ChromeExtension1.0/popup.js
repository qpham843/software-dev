//This function is responsible for adding the 'onclick' listener to the 'capturebutton'.
document.addEventListener('DOMContentLoaded', function() {
    var capture = document.getElementById('captureButton');
    //Below is the event listener that waits for you to click the 'captureButton'
    capture.addEventListener('click', function() {
        //Below is a function call to capture the current tab's URL.
        getURL();
    });
});

//This function is responsible for getting the current tab's URL.
function getURL () {
  //Queries the existing chrome tabs, note the usage of the '.tabs' which we put in the permissions in the manifest.
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
      //Gets the first tab and it's url.
      var url = tabs[0].url;
      //Makes a function call to check if the URL is present.
      checkURL(url);
  });
}

//The below function will check if the current tab's URL is in the database of article URLs.
function checkURL(targetURL) {
  //Generate a new request.
  var xhttp = new XMLHttpRequest();
  //Do the following function when ready.
  xhttp.onreadystatechange = function() {
    //Note: this.responseText is generated before this function is called. The responseText is what our server responds to the request with, but converted into a string.
    console.log(this);
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML = "Thank you for submitting this article!";
      document.getElementById("captureButton").classList.add("successful");
    } else if (this.readyState == 4) {
      document.getElementById("demo").innerHTML = "Error : " + this.responseText;
    } else {
	    document.getElementById("demo").innerHTML = "Loading...";
    }
  };

  //The first part of the queried URL allows us to make Cross Origin HTTPS requests,
  //The second part of the URL submits the URL to the database.
  xhttp.open("POST", "http://157.230.221.241:8080/demo-0.0.1-SNAPSHOT/article/submit?url=" + targetURL.toString(), true);
  xhttp.send();

}
