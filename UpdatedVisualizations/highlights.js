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
  // Inserting the unique id start and end tags into the HTML text.
      var textString = document.getElementById('textArticle').innerHTML;
      textArray = textString.split("");  // Splitting the string into an array of strings, one item per character
      console.log(textArray);

      for (let i = 0; i < json.length; i++) {
        if (parseInt(json[i].Start) == -1 || parseInt(json[i].End) == -1 || json[i].Start == "") {
          continue;
        }
        let start = parseInt(json[i].Start);
        let end = parseInt(json[i].End);
        let curStringAtStartIndex = textArray[start];
        let curStringAtEndIndex = textArray[end];

        // frontTag = "<id=" + start + "-" + end + " style= 'text-decoration: underline; text-decoration-color: " + colorFinder(json[i]) + "; text-decoration-thickness: 20px'>";
        //console.log(frontTag);
        frontTag = "<id=" + start + "-" + end + " style= 'border-bottom: 3px solid " + colorFinder(json[i]) + "'>";
        //console.log(frontTag);
        endTag = "</id=" + start + "-" + end + ">";
        //console.log(endTag);

        textArray[start] = frontTag + curStringAtStartIndex; // Appends our newly made id tag to the front of first character to be highlighted.
        textArray[end] = curStringAtEndIndex + endTag;

        console.log(start);
        console.log(end);
        //console.log(textArray[start]);
        console.log(textArray[end]);

      }
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
