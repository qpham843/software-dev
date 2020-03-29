function scoreArticle(fileName) {
      console.log(fileName);

      d3.csv(fileName, function(error, data) {
        if (error) throw error;
        console.log(data);
        createHighlights(data);
      });
}

let finalHTML = "";
function createHighlights(json) {
      var textString = document.getElementById('textArticle').innerHTML;
      textArray = textString.split("");  // Splitting the string into an array of strings, one item per character
      console.log(textArray);

      var sortedEntries = sortJSONentries(json); // an array highlight arrays, sorted by their indices
      var curOpens = new FlexArray();


      for (let i = 0; i < sortedEntries.length; i++) {
          let toInsert = "";
          if (sortedEntries[i][3]) { // if this entry denotes a start index
            if (i > 0 && sortedEntries[i-1][2] != sortedEntries[i][2]) {
              for (c = 0; c < curOpens.getSize(); c++) { // close all currently open spans
              toInsert += "</span>";
              }
              for (o = 0; o < curOpens.getSize(); o++) { // reopen all currently open spans
                toInsert += `<span class='highlight' name ='${curOpens.get(o)[0]}' style= 'border-bottom:1px solid ${curOpens.get(o)[1]}; '>`;
              }
            }
            // lastly opening our new highlight span
            toInsert += `<span class='highlight' name ='${sortedEntries[i][0]}' style= 'border-bottom:1px solid ${sortedEntries[i][1]};'>`;
            curOpens.push(sortedEntries[i]);

            let charAtInd = textArray[sortedEntries[i][2]];

            if (i > 0 && sortedEntries[i-1][2] == sortedEntries[i][2] && sortedEntries[i+1][2] == sortedEntries[i][2]) { //edge case where there are three or more highlights starting together
              textArray[sortedEntries[i][2]] = textArray[sortedEntries[i][2]].replace("%", toInsert + "%");
            } else if (sortedEntries[i+1][2] == sortedEntries[i][2]) { // edge case where there are 2 highlights starting together and this is the first of the two
              textArray[sortedEntries[i][2]] = toInsert + "%" + charAtInd;
            } else if (sortedEntries[i-1][2] == sortedEntries[i][2]) { // edge case where there are 2 highlights starting together and this is the latter of the two
              textArray[sortedEntries[i][2]] = textArray[sortedEntries[i][2]].replace("%", toInsert);
            } else { // normal case where there is only one highlight starting at this index
              textArray[sortedEntries[i][2]] = toInsert + charAtInd; // insert our spans into index of text
            }

          } else { // if this entry denotes an end index
              for (c = 0; c < curOpens.getSize(); c++) { // close all currently open spans
                toInsert += "</span>";
              }
              curOpens.remove(sortedEntries[i]); // removes entry with matching uniqueID
              for (o = 0; o < curOpens.getSize(); o++) { // reopen all currently open spans
                toInsert += `<span class='highlight' name ='${curOpens.get(o)[0]}' style= 'border-bottom:1px solid ${curOpens.get(o)[1]};'>`;
              }
              let charAtInd = textArray[sortedEntries[i][2]];
              textArray[sortedEntries[i][2]] = charAtInd + toInsert; // insert our spans into index of text
          }

        }
      console.log(textArray.slice(2160, 2400));

      finalHTML = textArray.join('');
      document.getElementById('textArticle').innerHTML = finalHTML;
}

function colorFinder(jsonLine) {
        //The children node colors are based on the colors of their parents.
    if (jsonLine["Credibilty Indicator Category"] === "Reasoning") {
          return d3.rgb(237, 134, 88);
      } else if (jsonLine["Credibilty Indicator Category"] === "Evidence") {
          return d3.rgb(53, 201, 136);
      } else if (jsonLine["Credibilty Indicator Category"] === "Probability") {
          return d3.rgb(153,204,255);
      } else if (jsonLine["Credibilty Indicator Category"] == "Language") {
          return d3.rgb(65, 105, 225);
      } else {
          return d3.rgb(255, 180, 0);
            }
        }


function sortJSONentries(json) {
  var sortArray = []; // an array of arrays
  for (i = 0; i < json.length; i++) {
      if (parseInt(json[i].Start) == -1 || parseInt(json[i].End) == -1 || json[i].Start == "") {
        continue; // ignore entries where indices are -1 or null
      }

    // [uniqueID, color, index, boolean]
    let uniqueID = json[i]["Credibility Indicator Name"] + "-" + json[i].Start + "-" + json[i].End;

    let startEntry = [uniqueID, colorFinder(json[i]), parseInt(json[i].Start), true];
    let endEntry = [uniqueID, colorFinder(json[i]), parseInt(json[i].End), false];

    sortArray.push(startEntry);
    sortArray.push(endEntry);
  }
  sortArray = sortArray.sort(highlightSort); // sorting all entries by their indices
  console.log(sortArray);
  return sortArray;
}


function highlightSort(h1, h2) { // helper function to sortJSONentries. Sorts arrays by their "index" value (contained in array[2]).
	if (h1[2] > h2[2]) {
		return 1;
	} else if (h1[2] < h2[2]) {
		return -1;
	}
	 return 0;
}


class FlexArray { // an array that keeps order of objects and adjusts itself to removal of objects
  // functions only support the objects being arrays

  constructor() {
    this.array = []; }

  get(index) {
    return this.array[index];
  }
  push(addArr) {
    this.array.push(addArr);
  }
  remove(removeArr) {
    this.array = this.array.filter(function(ele){ return removeArr[0] != ele[0]; });
  }
  getSize() {
    return this.array.length;
  }

}
