var id = ["main", "content", "page", "primary",
  "app", "definition-wrapper", "pageStory", "scientific-american"];

var classNames = ["l-root l-reskin", "page-content", "super"];

const url = chrome.runtime.getURL('VisualizationData_17120 - Sheet1_test.json')

fetch(url).then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      // Examine the text in the response
      response.json().then(function(data) {
        // console.log(data);
        var before = data["Before"];
        var after = data["After"];
        var highlights = [] // this is stored as a dictionary w/ keys as integers from 0 to n
        const object = data["Phrase"]
        for (const [key, value] of Object.entries(object)) {
          highlights.push(value);
        }
        console.log("highlights", highlights)
        return highlight(highlights);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

// function to highlight phrases within an element 
function highlight(highlights) {
  console.log("highlight");

  // iterating through various div and body ID's
  for (i = 0; i < id.length; i++) {
    if (document.getElementById(id[i]) == null) {
      continue

    } else {
      // innerHTML of id's commonly found in newsletter websites (cnn, politico, etc)
      // contains the main body of article text
      console.log("innerHTML: " + id[i]);
      var main = document.getElementById(id[i]);

      // highlighting each word and phrase
      for (j = 0; j < highlights.length; j++) {
        main.innerHTML = main.innerHTML
          // finds the first occurance of the phrase
          .replace(highlights[j], "<span style='background-color: #FFFF00'>" + highlights[j] + "</span>");
      }
    }
  }

  // checking classnames
  for (c = 0; c < classNames.length; c++) {
    if (document.getElementsByClassName(classNames[c]).length != 0) {
      highlightClass(highlights);
      break;
    }
    continue;
  }
}

// function to highlight within a class element
function highlightClass(highlights) {
  for (c = 0; c < classNames.length; c++) {
    if (document.getElementsByClassName(classNames[c]).length != 0) {
      console.log("highlight " + classNames[c]);

      main = document.getElementsByClassName(classNames[c])[0];
      // highlighting each word and phrase
      for (j = 0; j < highlights.length; j++) {
        main.innerHTML = main.innerHTML
          // finds the first occurance of the phrase
          .replace(highlights[j], "<span style='background-color: #FFFF00'>" + highlights[j] + "</span>");
      }
    }
  }
}
