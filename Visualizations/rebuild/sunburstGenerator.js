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


/* A map that relates a node in the data heirarchy to the
SVGPathElement in the visualization.
*/
var nodeToPath = new Map();

/*A boolean that states whether or not the middle ring was
moused over before the mouse moves on */
var parentMouseOver = false;


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
    .style('opacity', function(d) { return setDefaultOpacity(d);})
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


//Mouse animations.
svg.selectAll('path')
    .on('mouseleave', function(d) {
        d3.select(this).style('opacity', function(d) { 
            return mouseOffOpacity(d);
        })
    })
    .on('mouseover', function(d) {
    d3.select(this).style('opacity', function(d) {
        return mouseOverOpacity(d);
        
        })
    })
    
    
});
    


/*Function that will change the opacity of the path that the mouse is hovering over.
    @arg d: the node */
function mouseOverOpacity(d) {
    if (d.height == 1) {
        parentMouseOver = true;
        var node;
        for (node of d.children) {
            var path = nodeToPath.get(node);
            d3.select(path).style('opacity', .7);
        }
        return 1;
    } else if (d.height == 0) {
        if (!parentMouseOver) {
          return 0;
        } else {
            var node;
            for (node of d.parent.children) {
                var path = nodeToPath.get(node);
                d3.select(path).style('opacity', .7);
            }
            return 1;
        }
    } else if (d.height == 2) {
        return 0;
    }
}

/* Function that will change the opacity of the path that the mouse has moved off of.
    @arg d: node
*/
function mouseOffOpacity(d) {
    if (d.height == 1 && parentMouseOver) {
        return .7
    } if (d.height == 0) {
        var node;
        for (node of d.parent.children) {
            var path = nodeToPath.get(node);
            d3.select(path).style('opacity', 0);
        }
        return 0
    } else if (d.height == 2) {
        return 0;
    }
}

/*Function that traverses the hierarchy and associates each node with a path.*/
function nodeToPathFinder(root, curPath) {
    nodeToPath.set(root, curPath);
}


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
function setDefaultOpacity(d) {
    parentMouseOver = false;
    if (d.height == 2 || d.height == 0) {
        return 0;
    } else {
        return .7;
    }
}

d3.select(self.frameElement).style("height", height + "px");