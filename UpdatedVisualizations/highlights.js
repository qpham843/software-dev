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
              toInsert += `<span class='highlight' id ='${curOpens.get(o)[0]}' style= 'border-bottom:1px solid ${curOpens.get(0)[1]}; '>`;
            }}
            // lastly opening our new highlight span
            toInsert += `<span class='highlight' id ='${sortedEntries[i][0]}' style= 'border-bottom:1px solid ${sortedEntries[i][1]};'>`;
            curOpens.push(sortedEntries[i]);

            let charAtInd = textArray[sortedEntries[i][2]];
            textArray[sortedEntries[i][2]] = toInsert + charAtInd; // insert our spans into index of text

          } else { // if this entry denotes an end index
              for (c = 0; c < curOpens.getSize(); c++) { // close all currently open spans
                toInsert += "</span>";
              }
              curOpens.remove(sortedEntries[i]); // removes entry with matching uniqueID
              for (o = 0; o < curOpens.getSize(); o++) { // reopen all currently open spans
                toInsert += `<span class='highlight' id ='${curOpens.get(o)[0]}' style= 'border-bottom:1px solid ${curOpens.get(o)[1]};'>`;
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















        // for (let i = 0; i < json.length; i++) {
        //   if (parseInt(json[i].Start) == -1 || parseInt(json[i].End) == -1 || json[i].Start == "") {
        //     continue;
        //   }
        //   let start = parseInt(json[i].Start);
        //   let end = parseInt(json[i].End);
        //   let curStringAtStartIndex = textArray[start];
        //   let curStringAtEndIndex = textArray[end];
        //
        //   // frontTag = "<id=" + start + "-" + end + " style= 'text-decoration: underline; text-decoration-color: " + colorFinder(json[i]) + "; text-decoration-thickness: 20px'>";
        //   //console.log(frontTag);
        //   frontTag = "<id=" + start + "-" + end + " style= 'border-bottom: 3px solid " + colorFinder(json[i]) + "'>";
        //   //console.log(frontTag);
        //   endTag = "</id=" + start + "-" + end + ">";
        //   //console.log(endTag);
        //
        //   textArray[start] = frontTag + curStringAtStartIndex; // Appends our newly made id tag to the front of first character to be highlighted.
        //   textArray[end] = curStringAtEndIndex + endTag;
        //
        //   console.log(start);
        //   console.log(end);
        //   //console.log(textArray[start]);
        //   console.log(textArray[end]);
