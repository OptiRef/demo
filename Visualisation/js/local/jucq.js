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

var fileStr = "treeDataJUCQ.php?dataset="+(findGetParameter("dataset"))+"&q="+(findGetParameter("q"))+"&pruned="+(findGetParameter("pruned"))+"&pruneDB="+(findGetParameter("pruneDB"))
+"&size="+(findGetParameter("size"))+"&d="+(findGetParameter("d"));



var treeData1 =
  {
    "name": "Top Level",
    "children": [
      { 
        "name": "Level 2: A",
        "children": [
          { "name": "Son of A" },
          { "name": "Daughter of A" }
        ]
      },
      { "name": "Level 2: B" }
    ]
  };


var treeData2 = { 
"name" : "root", "text" : "U","style" : "circleRoot", "type" : "root", "children" : [ { 
"name" : "disj_0_0", "text" : "⋈","style" : "circleRoot", "type" : "root", "children" : [ { 
"name" : "union", "text" : "U","style" : "circleRoot", "type" : "root", "children" : [ { 
"name" : "SELECT Faculty.c0  FROM table124 AS Faculty", "text" : "CQ0","style" : "circle1", "type" : "1" },{ 
"name" : "SELECT hasFaculty.c1  FROM table122 AS hasFaculty", "text" : "CQ1","style" : "circle1", "type" : "1" },{ 
"name" : "SELECT teacherOf.c0  FROM table27 AS teacherOf", "text" : "CQ2","style" : "circle3", "type" : "3" },{ 
"name" : "SELECT isPartOfUniversity.c0  FROM table125 AS isPartOfUniversity", "text" : "CQ3","style" : "circle1", "type" : "1" },{ 
"name" : "SELECT Lecturer.c0  FROM table18 AS Lecturer", "text" : "CQ4","style" : "circle3", "type" : "3" },{ 
"name" : "SELECT PostDoc.c0  FROM table156 AS PostDoc", "text" : "CQ5","style" : "circle1", "type" : "1" },{ 
"name" : "SELECT Professor.c0  FROM table129 AS Professor", "text" : "CQ6","style" : "circle1", "type" : "1" },{ 
"name" : "SELECT advisor.c1  FROM table26 AS advisor", "text" : "CQ7","style" : "circle3", "type" : "3" },{ 
"name" : "SELECT tenured.c0  FROM table130 AS tenured", "text" : "CQ8","style" : "circle1", "type" : "1" },{ 
"name" : "SELECT Subj13Professor.c0  FROM table92 AS Subj13Professor", "text" : "CQ9","style" : "circle3", "type" : "3" },{ 
"name" : "SELECT Subj6Professor.c0  FROM table36 AS Subj6Professor", "text" : "CQ10","style" : "circle3", "type" : "3" },{ 
"name" : "SELECT FullProfessor.c0  FROM table12 AS FullProfessor", "text" : "CQ11","style" : "circle3", "type" : "3" },{ 
"name" : "SELECT VisitingProfessor.c0  FROM table135 AS VisitingProfessor", "text" : "CQ12","style" : "circle1", "type" : "1" },{ 
"name" : "SELECT Subj8Professor.c0  FROM table60 AS Subj8Professor", "text" : "CQ13","style" : "circle3", "type" : "3" },{ 
"name" : "SELECT Subj19Professor.c0  FROM table64 AS Subj19Professor", "text" : "CQ14","style" : "circle3", "type" : "3" },{ 
"name" : "SELECT Subj2Professor.c0  FROM table104 AS Subj2Professor", "text" : "CQ15","style" : "circle3", "type" : "3" },{ 
"name" : "SELECT Subj16Professor.c0  FROM table96 AS Subj16Professor", "text" : "CQ16","style" : "circle3", "type" : "3" },{ 
"name" : "SELECT Subj12Professor.c0  FROM table52 AS Subj12Professor", "text" : "CQ17","style" : "circle3", "type" : "3" },{ 
"name" : "SELECT Subj17Professor.c0  FROM table68 AS Subj17Professor", "text" : "CQ18","style" : "circle3", "type" : "3" },{ 
"name" : "SELECT Subj7Professor.c0  FROM table56 AS Subj7Professor", "text" : "CQ19","style" : "circle3", "type" : "3" },{ 
"name" : "SELECT Subj1Professor.c0  FROM table107 AS Subj1Professor", "text" : "CQ20","style" : "circle3", "type" : "3" },{ 
"name" : "SELECT Subj4Professor.c0  FROM table80 AS Subj4Professor", "text" : "CQ21","style" : "circle3", "type" : "3" },{ 
"name" : "SELECT AssistantProfessor.c0  FROM table14 AS AssistantProfessor", "text" : "CQ22","style" : "circle3", "type" : "3" },{ 
"name" : "SELECT Chair.c0  FROM table148 AS Chair", "text" : "CQ23","style" : "circle1", "type" : "1" },{ 
"name" : "SELECT Subj18Professor.c0  FROM table88 AS Subj18Professor", "text" : "CQ24","style" : "circle3", "type" : "3" },{ 
"name" : "SELECT Subj15Professor.c0  FROM table48 AS Subj15Professor", "text" : "CQ25","style" : "circle3", "type" : "3" },{ 
"name" : "SELECT ExDean.c0  FROM table150 AS ExDean", "text" : "CQ26","style" : "circle1", "type" : "1" },{ 
"name" : "SELECT Subj3Professor.c0  FROM table71 AS Subj3Professor", "text" : "CQ27","style" : "circle3", "type" : "3" },{ 
"name" : "SELECT Subj20Professor.c0  FROM table76 AS Subj20Professor", "text" : "CQ28","style" : "circle3", "type" : "3" },{ 
"name" : "SELECT Subj14Professor.c0  FROM table84 AS Subj14Professor", "text" : "CQ29","style" : "circle3", "type" : "3" },{ 
"name" : "SELECT AssociateProfessor.c0  FROM table19 AS AssociateProfessor", "text" : "CQ30","style" : "circle3", "type" : "3" },{ 
"name" : "SELECT Subj11Professor.c0  FROM table16 AS Subj11Professor", "text" : "CQ31","style" : "circle3", "type" : "3" },{ 
"name" : "SELECT Subj9Professor.c0  FROM table44 AS Subj9Professor", "text" : "CQ32","style" : "circle3", "type" : "3" },{ 
"name" : "SELECT Subj5Professor.c0  FROM table39 AS Subj5Professor", "text" : "CQ33","style" : "circle3", "type" : "3" },{ 
"name" : "SELECT Dean.c0  FROM table143 AS Dean", "text" : "CQ34","style" : "circle1", "type" : "1" },{ 
"name" : "SELECT Subj10Professor.c0  FROM table100 AS Subj10Professor", "text" : "CQ35","style" : "circle3", "type" : "3" }]}]}]};



// Set the dimensions and margins of the diagram

let createTree = function(treeData){

d3.select("#qname").html("JUCQ: Query "+findGetParameter("q"));
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
	.attr("id","tooltipDiv")
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
var mouseover = function(d) {
    Tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }
  var mousemove = function(d) {
	
	htmlStr="<h4>"+(d.data.tooltip)+"</h4>";
	htmlStr+="<br><br>";
	if(d.data.type != "root"){
		htmlStr+="<h5><pre>"+ window.sqlFormatter.format(d.data.name, {language: 'postgresql'})+" </pre><h5> <br>";
	}
    Tooltip
      .html(htmlStr)
  }
  var mouseleave = function(d) {
    //Tooltip.style("opacity", 0)
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
		.on("mousemove", mousemove)
		.on("mouseleave", mouseleave);

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
	computeRatioTotal = data.total;
	
	
	d3.select("#ratio").html(computeRatio.toFixed(2)+" %");
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