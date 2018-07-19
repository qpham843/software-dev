//Dimensions of sunburst
var width = 500;
var height = 500;
var radius = Math.min(width, height) / 2;
var color = d3.scaleOrdinal(d3.schemeCategory10);

//parse csv to json
d3.text("sequences.csv", function(text) {
    var csv = d3.csv.parseRows(text);
    console.log(csv);
//    var json = buildHierarchy(csv);
//    createVisualization(json);
});
//
//function buildHierarchy(csv) {
//    var root = {"name": "root", "children": []};
//    for (var i = 0; i < csv.length; i++) {
//
//    }
//}