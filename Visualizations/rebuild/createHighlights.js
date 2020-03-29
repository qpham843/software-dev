function sortJSONentries(json) {
  var sortArray = []; // an array of arrays
  for (i = 0; i < json.length; i++) {
      if (parseInt(json[i].Start) == -1 || parseInt(json[i].End) == -1 || json[i].Start == "") {
        continue; // ignore entries where indices are -1 or null
      }

    // [uniqueID, color, index, boolean]
    let uniqueID = json[i]["Credibility Indicator ID"] + "-" + json[i].Start + "-" + json[i].End;

    let startEntry = [uniqueID, colorFinder(json[i]), parseInt(json[i].Start), true];
    let endEntry = [uniqueID, colorFinder(json[i]), parseInt(json[i].End), false];

    sortArray.push(startEntry);
    sortArray.push(endEntry);
  }
  sortArray = sortArray.sort(highlightSort); // sorting all entries by their indices
  console.log(sortArray);
  return sortArray;
}

function scoreArticle(fileName) {
      console.log(fileName);
      d3.text("17120SSSArticle.txt", function(text) {
          document.getElementById("textArticle").innerHTML = text.toString();
      });

      d3.csv(fileName, function(error, data) {
        if (error) throw error;
        console.log(data);
        createHighlights(data);
      });
}

function createHighlights(json) {
  var textString = document.getElementById('textArticle').innerHTML;
  textArray = textString.split("");  // Splitting the string into an array of strings, one item per character

  var sortedEntries = sortJSONentries(json); // an array highlight arrays, sorted by their indices
  var highlightStack = new FlexArray();

  sortedEntries.forEach((entry) => {  // for each entry, open a span if open or close then reopen all spans if a close
    const index = entry[2];
    if (entry[3]) {
      textArray = openHighlight(textArray, index, entry);
      highlightStack.push(entry);
    } else {
      textArray = closeHighlights(textArray, index, highlightStack);
      highlightStack.remove(entry);
      textArray = openHighlights(textArray, index, highlightStack);
    }
  })

  finalHTML = textArray.join('');
  document.getElementById('textArticle').innerHTML = finalHTML;
  $(".highlight").hover(highlight, normal);
}

function openHighlight(textArray, index, entry) {
  let text = textArray[index];
  let uniqueId = entry[0].toString();
  let color = entry[1];
  let name = " name='" + uniqueId + "'";
  let style = " style= 'border-bottom:1px solid " + color + "'";
  let highlight = "<span class='highlight'" + name + style + ">";
  textArray[index] = highlight + text;
  return textArray;
}

function openHighlights(textArray, index, highlightStack) {
  let text = textArray[index];
  highlightStack.getArray().forEach((entry) => {
    textArray = openHighlight(textArray, index, entry);
  })
  return textArray;
}

function closeHighlights(textArray, index, highlightStack) {
  let text = textArray[index];
  let closeSpans = '';
  for (var i = 0; i < highlightStack.getSize(); i++) {
    closeSpans += "</span>";
  }
  textArray[index] = text + closeSpans;
  return textArray;
}

function highlight(x) {
  //console.log(x.toElement);
  //console.log(x.toElement.style);
  var color = x.toElement.style.borderBottomColor;      // grab color of border underline in rgb form
  var color = color.match(/\d+/g);                      // split rgb into r, g, b, components
  //console.log(color);

  x.toElement.style.setProperty("background-color", "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + "0.25");
  x.toElement.style.setProperty("background-clip", "content-box");
}

// A function which returns all our background colors back to normal.
// Needs fix to optimize, currently loops through all spans.
function normal(x) {
  //console.log(x.toElement);
  var allSpans = document.getElementsByTagName('span');
  for (var i = 0; i < allSpans.length; i++) {
    allSpans[i].style.setProperty("background-color", "transparent");
  }
}
