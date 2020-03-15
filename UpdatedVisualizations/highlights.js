function scoreArticle(fileName) {
      console.log(fileName);

      d3.csv(fileName, function(error, data) {
        if (error) throw error;
        console.log(data);
        createHighlights(data);
      });
}

function createHighlights(json) {
      var textString = document.getElementById('textArticle').innerHTML;
      textArray = textString.split("");
      console.log(textArray);

      for (let i = 0; i < json.length; i++) {
        let start = json[i].Start;
        let end = json[i].End;

      }
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
