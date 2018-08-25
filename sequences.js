//This section switches out the existing article for one from a .txt file.
/*
document.getElementById("articleHead").innerHTML = "Public Editor Lorem Ipsum"
d3.text("loremipsum.txt", function(text) {
    document.getElementById("textArticle").innerHTML = text.toString();
});*/

//This section parses the CSV file into a JSON.
d3.csv("catsheet.csv", function(error, data) {
  if (error) throw error;
  // var json = buildHierarchy(csv);
  // var csv = d3.csv.parseRows(data);
  var articles = buildHierarchy(data);
  var article1 = articles["Article_1"];
  createVisualization(article1);
});

function buildHierarchy(data) {
  var articleID = "Article ID";
  var credCat = "Credibilty Indicator Category";
  var credName = "Credibility Indicator Name";
  var pts = "Points";

  var jsons = {}; //create object of json files
  var currArticle = "Article_" + data[0][articleID];
  var root = {"name": "CATEGORIES", "children": []};
  for (var i = 0; i < data.length; i++) { //article ID column
    if ("Article_" + data[i][articleID] !== currArticle) {
      //adds the current article to jsons, resets root to an empty object
      jsons[currArticle] = root;
      currArticle = "Article_" + data[i][articleID];
      var root = {"name": "CATEGORIES", "children": []};
    }
    if (!checkIn(root["children"], data[i][credCat], "name")) { //credibility column
      //adds a new category to the list of CATEGORIES if it doesn't exist
      root["children"].push({"name": data[i][credCat], "children": []});
    }
    var categoryIndex = findIndex(root["children"], data[i], credCat);

    // .map(function(e) {return e.name}).indexOf(data[i]["Credibilty Indicator Category"]);
    var cin = root["children"][categoryIndex]["children"];
    if (!checkIn(cin, data[i][credName], "name")) { //initializes credibility indicator name and score
      //only adds category if it exists
      cin.push({"name": data[i][credName], "size": 0, "startIndices": [], "endIndices": [], "points": []});
    }
    var cinIndex = findIndex(cin,data[i],  credName);

    // cin.map(function(e) {return e.name}).indexOf(data[i]["Credibility Indicator Name"]);
    cin[cinIndex]["size"] += parseInt(data[i][pts]); //adds together the net impact of points, has not handled cancellation case, should be calculated based upon absolute value?
    cin[cinIndex]["startIndices"].push(parseInt(data[i]["Start"]));
    cin[cinIndex]["endIndices"].push(parseInt(data[i]["End"]));
    cin[cinIndex]["points"].push(parseInt(data[i][pts]));

  }
  console.log(jsons);
  return jsons; //object of json files for each article
};

function checkIn(data, cat, catName) {
  //checks to see if a category exists already
  for (var i = 0; i < data.length; i++) {
    if (data[i][catName] === cat) {
      return true;
    }
  }
  return false;
}

function findIndex(data, currRow, val) {
  /* data takes in the specified information up until the indexing action
  so for example:  if you wanted the Reasoning index, you would put
  root["children"] for data
  currRow is the current row you are on in the CSV.  so for the loop above,
  input data[i], or for row 10, input data[10]
  val is the criteria you want, so "Reasoning", or "Credibilty Indicator Category"
  */
  return data.map(function(e) {return e.name}).indexOf(currRow[val]);
}

function userFindIndex(data, val) {
  /* data:  specified information up until the indexing action
  ex: root["children"]
  val:  criteria desired, ex "Reasoning"
  example:
  userFindIndex(articles["Article_1"]["children"], "Reasoning");
  */
  return data.map(function(e) {return e.name}).indexOf(val);
}



//BEGIN VISUALIZATION
//This is the visualization code.
function createVisualization(article) {
  // Variables
    var chartDiv = document.getElementById("chart"); //resizes with css

    var width = 300;
    var height = 300;
    var radius = Math.min(width, height) / 2;
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    // Create the "graph" element.
    var g = d3.select('svg')
    .attr("preserveAspectRatio", "xMinYMin meet")
        // .attr("viewBox", "0 0 250 250")
        // .classed("svg-content", true)
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    // Partitition
    var partition = d3.partition()
        .size([2 * Math.PI, radius]);

    // Find data root
    var root = d3.hierarchy(article)
        .sum(function (d) { return Math.abs(d.size)});

    // Size arcs
    partition(root);
    var arc = d3.arc()
        .startAngle(function (d) { return d.x0 })
        .endAngle(function (d) { return d.x1 })
        .innerRadius(function (d) { return d.y0 })
        .outerRadius(function (d) { return d.y1 });

    // Put it all together


//CATEGORIES SECTION
//This function creates the entirety of the collapsible list.
function createCategories(d) {
    for (var i = 0; i < d.data.children.length; i += 1) {
        var curHTML = document.getElementById("categories").innerHTML;
        var catData = d.data.children[i];
        var catId = catData.name.replace(/ /g,'');
        curHTML = curHTML + "<div class='collapsible'>" + catData.name + "</div>" + "<div id='" + catId + "' class='content'></div>";
        document.getElementById("categories").innerHTML = curHTML;
        document.getElementById(catId).style.backgroundColor = colorFinder(nameToData.get(catData.name));
        for (var j = 0; j < catData.children.length; j += 1) {
            var catHTML = document.getElementById(catId).innerHTML;
            var subcatData = catData.children[j];
            var subcatId = catData.children[j].name.replace(/ /g, '');
            //<input type='checkbox' id='c" + j + "' class='check'/>
            catHTML = catHTML + "<div id='" + subcatData.name + "' class='collapsible'>" + subcatData.name + " </div>" + "<div id='" + subcatId + "' class='content'></div>";
            document.getElementById(catId).innerHTML = catHTML;
            document.getElementById(subcatId).style.backgroundColor = colorFinder(nameToData.get(subcatData.name));
            for (var k = 0; k < subcatData.startIndices.length; k += 1) {
                var subcatHTML = document.getElementById(subcatId).innerHTML;
                var paragraph = document.getElementById("textArticle").innerHTML;

                //Determine the 'clean' start and end of the text.
                var sind = subcatData.startIndices[k];
                var start = (sind + 0);
                while (paragraph[start] != " " && paragraph[start] != ".") {
                    if (start == 0) {break;}
                        start -= 1;
                    }
                if (start != 0) {start += 1;}
                if (start in dindexToString.values()) {start += 1};
                dindexToString.set(start, ["o", d.data.name]);

                var eind = subcatData.endIndices[k];
                var end = (eind + 0);
                while (paragraph[end] != " " && paragraph[end] != "." && paragraph[end] != ",") {
                    if (end == paragraph.length) {break;}
                    end += 1;
                }
                if (end in dindexToString.values()) {end -= 1};
                dindexToString.set(end, ["c", d.data.name]);

                if (end > start + 50) {end = start + 50}
                var errorString = "'" + paragraph.substring(start, end) + "'";
                //Need to add in an href for the sake of jumping.
                subcatHTML = subcatHTML + "<div><a href='#" + subcatId.replace(/ /g,'') + start + "' class='jumpable'>" + "[" + subcatData.points[k] + "]  " + errorString + "</a></div>";
                document.getElementById(subcatId).innerHTML = subcatHTML;
            }
        }
    }
}


//COLORING SECTION
//This function determines the color of a category based on its parent, or name.
  function colorFinder(d) {
    if (d.data.children) {
        if (d.data.name === "Reasoning") {
               return d3.rgb(239, 92, 84);
            } else if (d.data.name === "Evidence") {
               return d3.rgb(0, 165, 150);
            } else if (d.data.name === "Confidence") {
                return d3.rgb(172, 207, 236);
            } else {
               return d3.rgb(43, 82, 230);
            }
        }   else {
        //The children node colors are based on the colors of their parents.
            if (d.data.size > 0) {
                return d3.rgb(172,172,172);
            }
            if (d.parent.data.name === "Reasoning") {
                return d3.rgb(237, 134, 88);
            } else if (d.parent.data.name === "Evidence") {
                return d3.rgb(53, 201, 136);
            } else if (d.parent.data.name === "Confidence") {
                return d3.rgb(135,230,235);
            } else {
                return d3.rgb(100,144,255);
            }
        }
  }

//This function determines the color of text highlights.
  function textHighlight(d) {
      if (d.parent.data.name === "Reasoning") {
          return "red";
      } else if (d.parent.data.name === "Evidence") {
          return "green";
      } else if (d.parent.data.name === "Confidence") {
          return "aqua";
      } else {
        return "blue";
      }
  }


//CREDIBILITY VALUES
//These variables ensure that the total value is accurate.
  var sum = 0;
  var total = checkTotal(article);

//This function returns the total number of points in the Credibility Report.
  function checkTotal(d) {
    var top = 0;
    for (i = 0; i < d.children.length; i += 1) {
        for (j = 0; j < d.children[i].children.length; j += 1) {
            top += d.children[i].children[j].size;
        }
    }
    return top;
  };

//This function calculates the sum of the child nodes of a category. Used for "Reasoning", "Evidence", "Language".
  function checkSum(d) {
    if (d.data.children) {
        for (i = 0; i < d.data.children.length; i += 1) {
            sum += d.data.children[i].size;
        }
    } else {
        sum = d.data.size;
    }};


//DICTIONARIES
//This dictionary maps data nodes to paths.
var dataToPath = new Map();
var dataToParentPath = new Map();
var PathToData = new Map();
var nameToData = new Map();

//This dictionary maps indices to strings.
var indexToString = new Map();
var dindexToString = new Map();

//These arrays map categories to the names of their children.
var reasoning = [];
var evidence = [];
var language = [];


//CREATE PATHS AND HIGHLIGHTS
//This is the visualization creation in its entirety.
  g.selectAll('g')
            .data(root.descendants())
            .enter()
            .append('g')
            .attr("class", "node")
            .append('path')
            .attr("display", function (d) { return d.depth ? null : "none"; })
            .attr("d", arc)
            //For each path, map it to the corresponding data.
            .each(function(d){
                var curPath = this;
                dataToParentPath.set(d, curPath)
                dataToPath.set(d.data, curPath);
                PathToData.set(curPath, d);
                nameToData.set(d.data.name, d)
                if (d.data.children) {
                    for (var i = 0; i < d.data.children.length; i += 1) {
                        if (d.data.name == "Reasoning") {
                            reasoning[i] = d.data.children[i].name;
                        } else if (d.data.name == "Evidence") {
                            evidence[i] = d.data.children[i].name;
                        } else {
                            language[i] = d.data.children[i].name;
                        }
                    }
                    return;
                } else {
                    var paragraph = document.getElementById("textArticle").innerHTML;
                    for (i = 0; i < d.data.startIndices.length; i += 1) {
                        var ind = d.data.startIndices[i];
                        var start = (ind + 0);
                        while (paragraph[start] != " " && paragraph[start] != ".") {
                            if (start == 0) {break;}
                                start -= 1;
                        }
                        if (start != 0) {start += 1;}
                        if (start in indexToString.values()) {start += 1};
                        indexToString.set(start, ["o", textHighlight(d), d.data.name]);
                    }
                    for (i = 0; i < d.data.endIndices.length; i += 1) {
                        var ind = d.data.endIndices[i];
                        var end = (ind + 0);
                        while (paragraph[end] != " " && paragraph[end] != "." && paragraph[end] != ",") {
                            if (end == paragraph.length) {break;}
                                end += 1;
                        }
                        if (end in indexToString.values()) {end -= 1};
                        indexToString.set(end, ["c", textHighlight(d), d.data.name]);
                    }
                    //This completes the creation of the dictionary, with each entry having a unique key.
                }
            })
createCategories(nameToData.get("CATEGORIES"))


//This code adds in the highlights as needed.
var unsorted = Array.from(indexToString.keys());
var sorted = unsorted.sort(function(a, b){return a - b});
var indexOffset = 0;
var numactive = 0;
var inputString = "";
var categoryName = "";
var ancient = "transparent";
var ancName = "";
var hancName = "";
var oldest = "transparent";
var oldName = "";
var holdName = "";
var middle = "transparent";
var midName = "";
var hmidName = "";
var newest = "transparent";
var newName = "";
var hnewName = "";
for (i = 0; i < sorted.length; i += 1) {
    categoryName = indexToString.get(sorted[i])[1];
    if (indexToString.get(sorted[i])[0] == "o") {
        ancient = oldest;
        hancName = holdName;
        ancName = oldName;
        oldest = middle;
        holdName = hmidName;
        oldName = midName;
        middle = newest;
        hmidName = hnewName;
        midName = newName;
        newest = categoryName;
        hnewName = indexToString.get(sorted[i])[2];
        newName = indexToString.get(sorted[i])[2].replace(/ /g,'');
        var endString = "";

        //Need to add in an id for the sake of jumping.
        if (numactive == 0) {
            inputString = "<" + newName + " id='" + newName + sorted[i] + "' name='" + hnewName + "' class='highlighter' style='background: linear-gradient(to bottom, " +
                        newest + " 0%, transparent 20%)" +
                        "; background-position: 0 1.1em; background-repeat: repeat-x; background-size: 2px 13px; padding-bottom: 15px'>";
            numactive = 1;
        } else if (numactive == 1) {
            inputString = "<" + midName + newName + " id='" + newName + sorted[i] + "' name='" + hmidName + ", " + hnewName + "' class='highlighter' style='background: linear-gradient(to bottom, " +
                        middle + " 0%, transparent 20%, transparent 35%, " +
                        newest + " 40%, transparent 55%, transparent 70%)" +
                        "; background-position: 0 1.1em; background-repeat: repeat-x; background-size: 2px 13px; padding-bottom: 15px'>";
            endString = "<hiText class='highlightertext'>" + hmidName + "</hiText></" + midName +">";
            numactive = 2;
        } else if (numactive == 2) {
            inputString = "<" + oldName + midName + newName + " id='" + newName + sorted[i] + "' name='" + holdName + ", " + hmidName + "," + hnewName + "' class='highlighter' style='background: linear-gradient(to bottom, " +
                        oldest + " 0%, transparent 20%, transparent 35%, " +
                        middle + " 40%, transparent 55%, transparent 70%, " +
                        newest + " 75%, transparent 90%)" +
                        "; background-position: 0 1.1em; background-repeat: repeat-x; background-size: 2px 13px; padding-bottom: 15px'>";
            endString = "<hiText class='highlightertext'>" + hmidName + ", " + hnewName + "</hiText></" + oldName + midName + ">";
            numactive = 3;
        } else {
            inputString = "<" + ancName + oldName + midName + newName + " id='" + newName + sorted[i] + "' name='" + hancName + ", " + holdName + ", " + hmidName + "," + hnewName + "' class='highlighter' style='background: linear-gradient(to bottom, " +
                        ancient + " 0%, transparent 15%, transparent 25%, " +
                        oldest + " 30%, transparent 45%, transparent 55%, " +
                        middle + " 60%, transparent 75%, transparent 85%, " +
                        newest + " 90%, transparent 99%)" +
                        "; background-position: 0 1.1em; background-repeat: repeat-x; background-size: 2px 13px; padding-bottom: 15px'>";
            endString = "<hiText class='highlightertext'>" + holdName + ", " + hmidName + ", " + hnewName + "</hiText></" + ancName + oldName + midName + ">";
            numactive = 4;
        }
        inputString = endString + inputString;
    } else {
        var continueString = "";
        if (numactive == 1) {
        } else if (numactive == 2) {
            if (newest == categoryName) {
                continueString = "<" + midName + " id='" + newName + sorted[i] + "' name='" + hmidName + "' class='highlighter' style='background: linear-gradient(to bottom, " +
                                    middle + " 0%, transparent 20%)" +
                                    "; background-position: 0 1.1em; background-repeat: repeat-x; background-size: 2px 13px; padding-bottom: 15px'>";
            } else if (middle == categoryName) {
                continueString = "<" + newName + " id='" + newName + sorted[i] + "' name='" + hnewName + "' class='highlighter' style='background: linear-gradient(to bottom, " +
                                    newest + " 0%, transparent 20%)" +
                                    "; background-position: 0 1.1em; background-repeat: repeat-x; background-size: 2px 13px; padding-bottom: 15px'>";
            }
        } else if (numactive == 3) {
            if (newest == categoryName) {
                continueString = "<" + oldName + midName + " id='" + newName + sorted[i] + "' name='" + holdName + ", " + hmidName + "' class='highlighter' style='background: linear-gradient(to bottom, " +
                                    oldest + " 0%, transparent 20%, transparent 35%, " +
                                    middle + " 40%, transparent 55%, transparent 70%)" +
                                    "; background-position: 0 1.1em; background-repeat: repeat-x; background-size: 2px 13px; padding-bottom: 15px'>";
            } else if (middle == categoryName) {
                continueString = "<" + oldName + newName + " id='" + newName + sorted[i] + "' name='" + holdName + ", " + hmidName + "' class='highlighter' style='background: linear-gradient(to bottom, " +
                                    oldest + " 0%, transparent 20%, transparent 35%, " +
                                    newest + " 40%, transparent 55%, transparent 70%)" +
                                    "; background-position: 0 1.1em; background-repeat: repeat-x; background-size: 2px 13px; padding-bottom: 15px'>";
            } else {
                continueString = "<" + midName + newName + " id='" + newName + sorted[i] + "' name='" + hmidName + ", " + hnewName + "' class='highlighter' style='background: linear-gradient(to bottom, " +
                                    middle + " 0%, transparent 20%, transparent 35%, " +
                                    newest + " 40%, transparent 55%, transparent 70%)" +
                                    "; background-position: 0 1.1em; background-repeat: repeat-x; background-size: 2px 13px; padding-bottom: 15px'>";
            }
        } else {
            if (newest == categoryName) {
                continueString = "<" + ancName + oldName + midName + " id='" + newName + sorted[i] + "' name='" + hancName + ", " + holdName + ", " + hmidName + "' class='highlighter' style='background: linear-gradient(to bottom, " +
                                    ancient + " 0%, transparent 20%, transparent 35%, " +
                                    oldest + " 40%, transparent 55%, transparent 70%, " +
                                    middle + " 75%, transparent 90%)" +
                                    "; background-position: 0 1.1em; background-repeat: repeat-x; background-size: 2px 13px; padding-bottom: 15px'>";
            } else if (middle == categoryName) {
                continueString = "<" + ancName + oldName + newName + " id='" + newName + sorted[i] + "' name='" + hancName + ", " + holdName + ", " + hmidName + "' class='highlighter' style='background: linear-gradient(to bottom, " +
                                    ancient + " 0%, transparent 20%, transparent 35%, " +
                                    oldest + " 40%, transparent 55%, transparent 70%, " +
                                    newest + " 75%, transparent 90%)" +
                                    "; background-position: 0 1.1em; background-repeat: repeat-x; background-size: 2px 13px; padding-bottom: 15px'>";
                console.log(continueString)
            } else if (oldest == categoryName) {
                continueString = "<" + ancName + midName + newName + " id='" + newName + sorted[i] + "' name='" + hancName + ", " + hmidName + ", " + hnewName + "' class='highlighter' style='background: linear-gradient(to bottom, " +
                                    ancient + " 0%, transparent 20%, transparent 35%, " +
                                    middle + " 40%, transparent 55%, transparent 70%, " +
                                    newest + " 75%, transparent 90%)" +
                                    "; background-position: 0 1.1em; background-repeat: repeat-x; background-size: 2px 13px; padding-bottom: 15px'>";
            } else {
                continueString = "<" + oldName + midName + newName + " id='" + newName + sorted[i] + "' name='" + holdName + ", " + hmidName + ", " + hnewName + "' class='highlighter' style='background: linear-gradient(to bottom, " +
                                    oldest + " 0%, transparent 20%, transparent 35%, " +
                                    middle + " 40%, transparent 55%, transparent 70%, " +
                                    newest + " 75%, transparent 90%)" +
                                    "; background-position: 0 1.1em; background-repeat: repeat-x; background-size: 2px 13px; padding-bottom: 15px'>";
            }
        }
        if (numactive == 1) {
            inputString = "<hiText class='highlightertext'>" + hnewName + "</hiText></" + newName +">" + continueString;
        } else if (numactive == 2) {
            inputString = "<hiText class='highlightertext'>" + hmidName + ", " + hnewName + "</hiText></" + midName + newName +">" + continueString;
        } else if (numactive == 3) {
            inputString = "<hiText class='highlightertext'>" + holdName + ", " + hmidName + ", " + hnewName + "</hiText></" + oldName + midName + newName +">" + continueString;
        } else {
            inputString = "<hiText class='highlightertext'>" + hancName + ", " + holdName + ", " + hmidName + ", " + hnewName + "</hiText></" + ancName + oldName + midName + newName +">" + continueString;
        }
        if (newest == categoryName) {
            newest = middle;
            hnewName = hmidName;
            newName = midName;
            middle = oldest;
            hmidName = holdName;
            midName = oldName;
            oldest = ancient;
            holdName = hancName;
            oldName = ancName;
            ancient = "transparent";
            hancName = "";
            ancName = "";
        } else if (middle == categoryName) {
            middle = oldest;
            hmidName = holdName;
            midName = oldName;
            oldest = ancient;
            holdName = hancName;
            oldName = ancName;
            ancient = "transparent";
            hancName = "";
            ancName = "";
        } else if (oldest == categoryName) {
            oldest = ancient;
            holdName = hancName;
            oldName = ancName;
            ancient = "transparent";
            hancName = "";
            ancName = "";
        } else {
            ancient = "transparent";
            hancName = "";
            ancName = "";
        }
        numactive -= 1;
    }
    var paragraph = document.getElementById("textArticle").innerHTML;
    paragraph = paragraph.substring(0, sorted[i] + indexOffset) + inputString + paragraph.substring(sorted[i] + indexOffset);
    document.getElementById("textArticle").innerHTML = paragraph;
    indexOffset += inputString.length;
}


//VISUALIZATION TEXTBOX
//This section enables the textbox on hover in the article itself.
var hText = document.querySelectorAll('.highlightertext');

var visibleArc = false;
var $cols = $('.highlighter').hover(function(e) {
    var currCategory = $(this).attr("name");
    var d = nameToData.get(currCategory);
    var numCategories = 0;
    var dArray = [];

    d3.selectAll("path")
        .transition()
        .style("opacity", 0.5)
        .duration(100)

    for (var j = 0; j < Array.from(nameToData.keys()).length; j += 1) {
        if (currCategory.includes(Array.from(nameToData.keys())[j])) {
            dArray.push(nameToData.get(Array.from(nameToData.keys())[j]));
            numCategories += 1;
        }
    }
        //allows for arcs to disappear
    if (visibleArc == false) {
        visibleArc = true;
        for (var k = 0; k < numCategories; k += 1) {
                d = dArray[k];
                var highlightParent = d.parent.data;
                var highlightPath = dataToPath.get(d);

            //activates half opaque arcs
                for (var i = 0; i < highlightParent.children.length; i += 1) {
                    d3.select(dataToPath.get(highlightParent.children[i]))
                        .transition()
                        .style("display", "block")
                        .style("opacity", 0.5)
                        .duration(100)
                }
                d3.select(dataToParentPath.get(d.parent))
                    .transition()
                    .duration(300)
                    .attr('stroke-width',5)
                    .style("opacity", 1)

                d3.select(dataToParentPath.get(d))
                    .transition()
                    .attr('stroke-width',5)
                    .style("opacity", 1)

                g.selectAll(".center-text")
                    .style("display", "none")
                d3.select(dataToParentPath.get(d))
                    .transition()
                    .attr('stroke-width',5)
                    .style("opacity", 1)
                checkSum(d)
                g.append("text")
                    .attr("class", "center-text")
                    .attr("x", -5)
                    .attr("y", 5)
                    .style("font-size", 40)
                    .style("text-anchor", "middle")
                    .html(sum)
                                                        //PROTOTYPE CODE
                psuedobox.transition()
                    .duration(200)
                    .style("opacity", .9);
                psuedobox.html(currCategory)
                    .style("left", 1310 + "px")
                    .style("top", 100 + "px")
                    .style("width", function() {
                        if (currCategory.length < 18) {
                            return "90px";
                        } else if (currCategory.length < 35) {
                            return "180px";
                        } else {
                            return "250px";
                        }
                    })
                    .style("height", function() {
                        if (currCategory.length > 50) {
                            return "60px";
                        }
                    })
            this.style.backgroundColor = colorFinder(d);
        }
    } else {
    //takes out all present visuals
        visibleArc = false;
        resetVis();
        psuedobox.transition()
           .duration(200)
           .style("opacity", 0);
        this.style.backgroundColor = "white";
    }
});

window.onmousemove = function (e) {
    var x = (e.clientX + 25) + 'px',
        y = (e.clientY + - 18) + 'px';
    for (var i = 0; i < hText.length; i++) {
        hText[i].style.top = y;
        hText[i].style.left = x;
    }
};
//This section enables the Floating Textbox for the visualization.
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var psuedobox = d3.select("body").append("div")
    .attr("class", "psuedobox")
    .style("opacity", 0);


//VISUALIZATION ANIMATIONS
//This removes the current effects and resets the visualization to default.
var visOn = false;
function resetVis() {
    d3.selectAll("path")
        .transition()
        .delay(300)
        .duration(800)
        .attr('stroke-width',2)
        .style("opacity", function(d) {
            if (d.data.children) {
            } else {
                return 0;
            }
        })
    d3.selectAll("path")
        .transition()
        .delay(1000)
        .attr('stroke-width',2)
        .style("display", function(d) {
            if (d.data.children) {
            } else {
                return "none";
            }
        })
    g.selectAll(".center-text")
        .style("display", "none")
    sum = 0;
    g.append("text")
        .attr("class", "center-text")
        .attr("x", 0)
        .attr("y", 13)
        .style("font-size", 50)
        .style("text-anchor", "middle")
        .html((100 + total))
    div.transition()
            .duration(200)
            .style("opacity", 0);
    visOn = false;
    }

resetVis();

d3.selectAll("path").transition().each(function(d) {
    if (!d.data.children) {
        this.style.display = "none";
    } else if (d.data.name == "CATEGORIES") {
        this.style.display = "none";
    }
})

//MOUSE ANIMATION
  //This is all the mouse animation code.
  g.selectAll('path')
            //On mouse entering, highlight path, clear old text, create new text.
            .on('mouseover',function(d) {
                var curPath = this;
                g.selectAll(".center-text")
                    .style("display", "none")

                d3.selectAll("path").transition().style("opacity", 0.5);
                if (d.data.children) {
                    for (var i = 0; i < d.data.children.length; i += 1) {
                        d3.select(dataToPath.get(d.data.children[i]))
                            .transition()
                            .style("display", "block")
                            .style("opacity", 0.5)
                            .duration(100)
                    }
                } else {
                    var dataArray = Array.from(dataToParentPath.keys());
                    for (var i = 0; i < Array.from(dataToParentPath.keys()).length; i += 1) {
                        if (PathToData.get(curPath).parent == dataArray[i].parent) {
                            dataToPath.get(dataArray[i].data).style.opacity = 0.5;
                        }
                    }
                }

                d3.select(this)
      	            .transition()
      	            .duration(300)
      	            .attr('stroke-width',5)
      	            .style("opacity", 1)
      	        d3.select(dataToParentPath.get(d.parent))
      	            .transition()
      	            .duration(300)
      	            .attr('stroke-width',5)
      	            .style("opacity", 1)
      	        if (d.height == 0) {
      	            var allelems = document.querySelectorAll("[name]");
                    for (var i = 0; i < allelems.length; i += 1) {
                        if (allelems[i].attributes.name.nodeValue.includes(d.data.name)) {
                            allelems[i].style.backgroundColor = colorFinder(d);
                        }
                    }
      	        }

      	        //This code creates the text in the center of the model.
      	        checkSum(d)
                g.append("text")
                    .attr("class", "center-text")
                    .attr("x", -5)
                    .attr("y", 5)
                    .style("font-size", 40)
                    .style("text-anchor", "middle")
                    .html(sum)
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html(d.data.name)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px")
                    .style("width", function() {
                        if (d.data.name.length < 18) {
                            return "90px";
                        } else {
                            return "180px";
                        }
                    })
                visOn = true;

            //autoscroll to section functionality
//             jQuery.fn.autoscroll = function(selector) {
//   $('html, body').animate(
//     { scrollTop: $(selector).offset().top },
//     500
//   );
// }

//Then to scroll to the class/area you wish to get to like this:
//$('beggingthequestion').autoscroll();
            })
            .on("mousemove", function(){
                if (visOn == true) {
                    div
                        .style("left", (d3.event.pageX)+ "px")
                        .style("top", (d3.event.pageY - 28) + "px")
                } else {
                    div.transition()
                        .duration(10)
                        .style("opacity", 0);
                }})
            //On mouse exiting, remove all highlights and clear all text and display the total value.
            .on('mouseout',function (d) {
                var allelems = document.querySelectorAll("[name]");
                for (var i = 0; i < allelems.length; i += 1) {
                    if (allelems[i].nodeName.includes(d.data.name.replace(/ /g,'').toUpperCase())) {
                        allelems[i].style.backgroundColor = "white";
                    }
                }
                resetVis();
            })
            .style('stroke', 'white')
            .attr('stroke-width', 2)
            .style("fill", colorFinder);

var coll = document.getElementsByClassName('collapsible');
var i;
for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        /*var checkElem = document.getElementById(this.innerHTML.substring(27, 29));
        if (checkElem) {
            if (checkElem.checked) {
                var allelems = document.querySelectorAll("[name]");
                for (var i = 0; i < allelems.length; i += 1) {
                    if (allelems[i].attributes.name.nodeValue.includes(this.id)) {
                        allelems[i].style.backgroundColor = d3.rgb(237, 134, 88);
                    }
                }
            } else {
                var allelems = document.querySelectorAll("[name]");
                for (var i = 0; i < allelems.length; i += 1) {
                    if (allelems[i].attributes.name.nodeValue.includes(this.id)) {
                        allelems[i].style.backgroundColor = d3.rgb(255,255,255);
                    }
                }
            }
        }*/
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
   }
}
