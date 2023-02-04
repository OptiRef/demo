function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}


var fileStr = "treeDataUSCQ.php?dataset="+(findGetParameter("dataset"))+"&q="+(findGetParameter("q"))+"&pruned="+(findGetParameter("pruned"))+"&pruneDB="+(findGetParameter("pruneDB"))+"&size="+(findGetParameter("size"))+"&d="+(findGetParameter("d"));


let createTree = function(treeData){

d3.select("#qname").html("USCQ: Query "+findGetParameter("q"));

var margin = {top: 20, right: 90, bottom: 30, left: 90};
var width = (document.getElementById("canvas").offsetWidth) - margin.left - margin.right;
//var width = (window.innerWidth/2) - margin.left - margin.right;
var height = treeData.count * 15;
//var height = window.innerHeight - margin.top - margin.bottom;

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#canvas").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate("
          + margin.left + "," + margin.top + ")");


let Tooltip = d3.select("#tooltip")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
	.style("position", "sticky")
	.style("z-index", "1000")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
	.style("top", "100px")
    .style("left", "10px")
	.style("overflow", "scroll")
	.style("height",(window.innerHeight*0.7)+"px")
    .style("padding", "5px");


// Three function that change the tooltip when user hover / move / leave a cell
var mouseover = function(d) {
	
    Tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1);

  }
  var mousemove = function(d) {

	htmlStr=(d.data.tooltip);
	htmlStr+="<br><br>";
	if(d.data.type != "root"){
		htmlStr+="<pre>"+ window.sqlFormatter.format(d.data.name, {language: 'postgresql'})+" </pre> <br>";
	}
	Tooltip
      .html(htmlStr);
	
  }
  var mouseleave = function(d) {
    //Tooltip
     // .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
  }

var i = 0,
    duration = 750,
    root;

// declares a tree layout and assigns the size
var treemap = d3.tree().size([height, width]);

// Assigns parent, children, height, depth
root = d3.hierarchy(treeData, function(d) { return d.children; });
root.x0 = height / 2;
root.y0 = 0;

// Collapse after the second level

//root.children.forEach(collapse);

update(root);

// Collapse the node and all it's children
function collapse(d) {
  if(d.children) {
    d._children = d.children
    d._children.forEach(collapse)
    d.children = null
  }
}

function update(source) {

  // Assigns the x and y position for the nodes
  var treeData = treemap(root);

  // Compute the new tree layout.
  var nodes = treeData.descendants(),
      links = treeData.descendants().slice(1);

  // Normalize for fixed-depth.
  nodes.forEach(function(d){ d.y = d.depth * 180});

  // ****************** Nodes section ***************************

  // Update the nodes...
  var node = svg.selectAll('g.node')
      .data(nodes, function(d) {return d.id || (d.id = ++i); });

  // Enter any new modes at the parent's previous position.
  var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr("transform", function(d) {
        return "translate(" + source.y0 + "," + source.x0 + ")";
    })
    .on('click', click)
    .on("mouseover", mouseover)
		.on("mousemove", mousemove);
//		.on("mouseleave", mouseleave);

  // Add Circle for the nodes
  nodeEnter.append('circle')
      .attr('class', function(d) {
        //return d._children ? "lightsteelblue" : "#DC143C";
        
        if(d._children){
         return "circleExpand node";
        }else{
         return d.data.style+" node";
        }
        
    })
      .attr('r', 5)
      ;

  // Add labels for the nodes
  nodeEnter.append('text')
      .attr("dy", ".35em")
      .attr("x", function(d) {
          return d.children || d._children ? -13 : 13;
      })
      .attr("text-anchor", function(d) {
          return d.children || d._children ? "end" : "start";
      })
      .text(function(d) { return d.data.text; });

  // UPDATE
  var nodeUpdate = nodeEnter.merge(node);

  // Transition to the proper position for the node
  nodeUpdate.transition()
    .duration(duration)
    .attr("transform", function(d) { 
        return "translate(" + d.y + "," + d.x + ")";
     });

  // Update the node attributes and style
  nodeUpdate.select('circle.node')
    .attr('r', 5)
    .style("fill", function(d) {
        //return d._children ? "lightsteelblue" : "#fff";
        
        if(d._children){
         return "lightsteelblue";
        }else if(d.parent && d.children){
         return  "#fff";
        }
        /*
        else{
         return d.data.style;
        }*/
        
    })
    .attr('cursor', 'pointer');


  // Remove any exiting nodes
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) {
          return "translate(" + source.y + "," + source.x + ")";
      })
      .remove();

  // On exit reduce the node circles size to 0
  nodeExit.select('circle')
    .attr('r', 5);

  // On exit reduce the opacity of text labels
  nodeExit.select('text')
    .style('fill-opacity', 1e-6);

  // ****************** links section ***************************

  // Update the links...
  var link = svg.selectAll('path.link')
      .data(links, function(d) { return d.id; });

  // Enter any new links at the parent's previous position.
  var linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
      .attr('d', function(d){
        var o = {x: source.x0, y: source.y0}
        return diagonal(o, o)
      });

  // UPDATE
  var linkUpdate = linkEnter.merge(link);

  // Transition back to the parent element position
  linkUpdate.transition()
      .duration(duration)
      .attr('d', function(d){ return diagonal(d, d.parent) });

  // Remove any exiting links
  var linkExit = link.exit().transition()
      .duration(duration)
      .attr('d', function(d) {
        var o = {x: source.x, y: source.y}
        return diagonal(o, o)
      })
      .remove();

  // Store the old positions for transition.
  nodes.forEach(function(d){
    d.x0 = d.x;
    d.y0 = d.y;
  });

  // Creates a curved (diagonal) path from parent to the child nodes
  function diagonal(s, d) {

    path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

    return path
  }

  // Toggle children on click.
  function click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
    update(d);
  }
}
};

function addMetrics(data){
	computeRatio = (data.green /(data.green + data.red))*100;
	
	d3.select("#ratio").html(computeRatio.toFixed(2)+" %");
	computeRatioTotal = data.total;
	d3.select("#ratioTotal").html(computeRatioTotal +" CQs");
	d3.select("#countCorrect").html(data.green +" CQs");
	d3.select("#countNotCorrect").html(data.red +" CQs");
	
}
function addQuery(data){
	d3.select("#originalQuery").html(data);
}

(async () => {
    data = await d3.json(fileStr).then(data => data);

	addMetrics(data.count);
	addQuery(data.query);
    createTree(data.d);
})();