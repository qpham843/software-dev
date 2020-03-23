var dataFileName = "VisualizationData_1712.csv";

var width = 960,
    height = 700,
    radius = (Math.min(width, height) / 2) - 10;

var formatNumber = d3.format(",d");

var x = d3.scaleLinear()
    .range([0, 2 * Math.PI]);

var y = d3.scaleSqrt()
    .range([0, radius]);

var color = d3.scaleOrdinal(d3.schemeCategory10);

var partition = d3.partition();


var psuedobox = d3.select("body").append("div")
    .attr("class", "psuedobox")
    .style("opacity", 0);


/* A map that relates a node in the data heirarchy to the
SVGPathElement in the visualization.
*/
var nodeToPath = new Map();

var arc = d3.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x0))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x1))); })
    .innerRadius(function(d) { return Math.max(0, y(d.y0)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y1)); });

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append('g')
    .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 1);


var articleScore;

d3.csv(dataFileName, function(error, data) {
  if (error) throw error;
  delete data["columns"];
  data = addDummyData(data);
  var root = convertToHierarchy(data);
  
  root.sum(function(d) {
    return Math.abs(parseInt(d.data.Points));
  });
    
svg.selectAll("path")
    .data(partition(root).descendants())
    .enter().append("path")
      .attr("d", arc)
      .style("fill", function(d) {
        nodeToPathFinder(d, this);
        return color(d.data.data["Credibility Indicator Category"]);
      })
    .append("title")
      .text(function(d) { 
        var score = scoreSum(d);
        return d.data.data["Credibility Indicator Name"] + "\n" + formatNumber(parseInt(score));
      });


//Setting the center circle to the score
svg.selectAll(".center-text")
        .style("display", "none")
    svg.append("text")
        .attr("class", "center-text")
        .attr("x", 0)
        .attr("y", 13)
        .style("font-family", 'Comic sans')
        .style("font-size", 100)
        .style("text-anchor", "middle")
        .html((articleScore))


//Setting the outer and inside rings to be transparent.
d3.selectAll("path").transition().each(function(d) {
    if (!d.children) {
        this.style.display = "none";
    } else if (d.height == 2) {
        this.style.opacity = 0;
    }
})
    
//Mouse animations.
svg.selectAll('path')
    .on('mouseover', function(d) {
        drawVis(d, root, this);
        var score = scoreSum(d);
    
        //The textbox
        div.transition()
            .duration(200)
            .style("opacity", .9);
        console.log(div);
        div.html(d.data.data['Credibility Indicator Name'])
            .style("left", d3.select(this).attr("cx") + "px")
            .style("top", d3.select(this).attr("cy") + "px")
            .style("width", function() {
                if (d.data.data['Credibility Indicator Name'].length < 18) {
                    return "90px";
                } else {
                    return "180px";
                }
            })
    })
    .on('mouseleave', function(d) {
        resetVis();
        div.transition()
            .duration(200)
            .style("opacity", 1);
    })
    .style("fill", colorFinder);

});
    

/* Function that decides the color */

function colorFinder(d) {
    if (d.data.children) {
        if (d.data.data['Credibility Indicator Name'] == "Reasoning") {
               return d3.rgb(239, 92, 84);
            } else if (d.data.data['Credibility Indicator Name'] == "Evidence") {
               return d3.rgb(0, 165, 150);
            } else if (d.data.data['Credibility Indicator Name'] == "Probability") {
                return d3.rgb(0, 191, 255);
            } else {
               return d3.rgb(43, 82, 230);
            }
        }   else {
            if (d.data.size > 0) {
                return d3.rgb(172,172,172);
            }
            if (d.parent.data.data['Credibility Indicator Name'] == "Reasoning") {
                return d3.rgb(237, 134, 88);
            } else if (d.parent.data.data['Credibility Indicator Name'] == "Evidence") {
                return d3.rgb(53, 201, 136);
            } else if (d.parent.data.data['Credibility Indicator Name'] == "Probability") {
                return d3.rgb(153,204,255);
            } else {
                return d3.rgb(65, 105, 225);
            }
        }
  }


/* Function that resets the visualization after the mouse has been moved
   away from the sunburst.
*/
function resetVis() {
    d3.selectAll("path")
        .transition()
        .delay(300)
        .duration(800)
        .attr('stroke-width',2)
        .style("opacity", function(d) {
            if (d.height == 1) {
            } else {
                return 0;
            }
        })
    d3.selectAll("path")
        .transition()
        .delay(1000)
        .attr('stroke-width',2)
        .style("display", function(d) {
            if (d.children) {
            } else {
                return "none";
            }
        })
}

/*Function that draws the visualization based on what is being hovered over.
    @param d : the node in the data heirarchy that I am hovering over
    @param root : the root of the data heirarchy
    @param me : the path that I am hovering over.
*/
function drawVis(d, root, me) {
    d3.selectAll("path")
        .transition()
        .style("opacity", function(d) { 
            return .5
            }
        );
    if (d.children) {
        var node;
        for (node of d.children) {
            var path = nodeToPath.get(node);
            d3.select(path)
                .transition()
                .style("display", "block")
                .style("opacity", 0.5)
                .duration(100)
        }
    } else {
        var child;
        for (child of d.parent.children) {
            var path = nodeToPath.get(child);
            path.style.opacity = .5;
        }
    }
    
    d3.select(me)
        .transition()
        .duration(300)
        .attr('stroke-width', 5)
        .style("opacity", 1)

    if (d.height == 0) {
        d3.select(nodeToPath.get(d.parent))
            .transition()
            .duration(300)
            .attr('stroke-width', 5)
            .style("opacity", 1)
    } else if (d.height == 2) {
        d3.select(me).style('display', 'none');
    } else if (d.height == 1) {
        d3.select(nodeToPath.get(d.parent)).style('display', 'none');
    }
}


/*Function that traverses the hierarchy and associates each node with a path.
    @param root : the root of the data heirarchy
    @param curPath : the current path
*/
function nodeToPathFinder(root, curPath) {
    nodeToPath.set(root, curPath);
}


/*
Recursive function that returns a number that represents the total score of the given arc.
For the center, we simply return the score of the article (100 plus the collected points).
    @param d = the node of the hierarchy.
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

d3.select(self.frameElement).style("height", height + "px");