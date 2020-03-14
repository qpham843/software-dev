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


var articleScore;

var g = d3.select('svg')
    .attr("preserveAspectRatio", "xMinYMin meet")
    // .attr("viewBox", "0 0 250 250")
    // .classed("svg-content", true)
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');


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
    .style('opacity', function(d) {
      return setOpacity(d);
  })
    .append("title")
      .text(function(d) { 
        var score = scoreSum(d);
        return d.data.data["Credibility Indicator Name"] + "\n" + formatNumber(parseInt(score));
      });

    
//Setting the center circle to the score
g.selectAll(".center-text")
        .style("display", "none")
    g.append("text")
        .attr("class", "center-text")
        .attr("x", 0)
        .attr("y", 13)
        .style("font-family", 'Comic sans')
        .style("font-size", 100)
        .style("text-anchor", "middle")
        .html((articleScore)) 
    
//Changing opacity based on mousover.
g.selectAll()
    .on('mouseover', function(d) { 
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
        });
});



//Setting the center circle to the score
g.selectAll(".center-text")
        .style("display", "none")
    g.append("text")
        .attr("class", "center-text")
        .attr("x", 0)
        .attr("y", 13)
        .style("font-family", 'Comic sans')
        .style("font-size", 100)
        .style("text-anchor", "middle")
        .html((articleScore)) 
    
//Changing opacity based on mousover.
g.selectAll()
    .on('mouseover', function(d) {
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
});




/*
Recursive function that returns a number that represents the total score of the given arc.
For the center, we simply return the score of the article (100 plus the collected points).
@arg d = the node of the hierarchy.
*/
function scoreSum(d) {
    if (d.data.data.Points) {
        return d.data.data.Points;
    } else {
        var sum = 0;
        for (var i = 0; i < d.children.length; i++) {
            sum += parseFloat(scoreSum(d.children[i]));
        }
        if (d.height == 2) {
            articleScore = 100 + parseInt(sum);
            return articleScore;
        }
        return sum;
    }   
}

/*
Function that returns the desired default opacity. 0 for the center, 1 for the outer rings.
*/
function setOpacity(d) {
    if (d.height == 2) {
        return 0;
    } else {
        return 1;
    }
}

d3.select(self.frameElement).style("height", height + "px");