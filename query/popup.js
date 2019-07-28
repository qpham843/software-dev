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
    //So the CSV we retrieve is given as a string, so we can search through it for the URL like we would a string.
    //Initialize the assumed response.
    var link = "No article found.";
    //If the response to our GET request has the target URL in it, then return true.
    var pileofJsons = JSON.parse(this.responseText);
    var jsons = Array.from(pileofJsons);
    for (var i = 0; i < jsons.length; i++) {
      if (jsons[i]['Article Link'] == targetURL) {
        link = jsons[i]['Visualization Link'];
      }
    }
    //When ready, change the HTML element to indicate if the URL is in the database or not.
    var button = "<a href='" + link + "'> Link </a>"
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML = button;
    }
  };
  //Get from the following URL.
    //https://cors-anywhere.herokuapp.com allows you to make cross origin requests. Place it before the desired URL to make your request there.
    //https://s3-us-west-2.amazonaws.com/dev.publiceditor.io/test/visData.csv is the CSV containing all the URLs and data for the articles.
  xhttp.open("GET", "https://cors-anywhere.herokuapp.com/https://s3-us-west-2.amazonaws.com/dev.publiceditor.io/test/visData.json", true);
  xhttp.send();
}
