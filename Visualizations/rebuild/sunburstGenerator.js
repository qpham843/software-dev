var dataFileName = "VisualizationData_1712.csv";

var width = 960,
    height = 700,
    radius = (Math.min(width, height) / 2) - 10;

var formatNumber = d3.format(",d");

var x = d3.scaleLinear()
    .range([0, 2 * Math.PI]);

var y = d3.scaleSqrt()
    .range([0, radius]);

var color = d3.scaleOrdinal(d3.schemeCategory20b);

var partition = d3.partition();

var arc = d3.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x0))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x1))); })
    .innerRadius(function(d) { return Math.max(0, y(d.y0)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y1)); });

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

d3.csv(dataFileName, function(error, data) {
  if (error) throw error;
  delete data["columns"];
  data = addDummyData(data);
  root = convertToHierarchy(data);

  root.sum(function(d) {
    return Math.abs(parseInt(d.data.Points));
  });
    
  svg.selectAll("path")
      .data(partition(root).descendants())
    .enter().append("path")
      .attr("d", arc)
      .style("fill", function(d) {
        return color(d.data.data["Credibility Indicator Category"]);
      })
    .append("title")
      .text(function(d) { 
        console.log(d.height);
        //console.log(d.data.data.Points);
        var score = scoreSum(d);
        console.log(score);
        //return d.data.data["Credibility Indicator Name"] + "\n" + formatNumber(parseFloat(d.data.data.Points));
        return d.data.data["Credibility Indicator Name"] + "\n" + formatNumber(parseInt(score));
      });
    
});


function scoreSum(d) {
    if (d.data.data.Points ) {
        return d.data.data.Points;
    } else {
        var sum = 0;
        for (var i = 0; i < d.children.length; i++) {
            sum += parseFloat(scoreSum(d.children[i]));
        }
        if (d.height == 2) {
            return 100 + parseInt(sum);
        }
        return sum;
    }   
}


d3.select(self.frameElement).style("height", height + "px");
