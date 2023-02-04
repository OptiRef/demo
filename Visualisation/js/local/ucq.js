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

var fileStr = "treeDataUCQ.php?dataset="+(findGetParameter("dataset"))+"&q="+(findGetParameter("q"))+"&pruned="+(findGetParameter("pruned"))+"&pruneDB="+(findGetParameter("pruneDB"))+"&size="+(findGetParameter("size"))+"&d="+(findGetParameter("d"));


//CHARTS CODE
let root2 = {"name":"flare","children":[{"name":"analytics","children":[{"name":"cluster","children":[{"name":"AgglomerativeCluster","value":3938},{"name":"CommunityStructure","value":3812},{"name":"HierarchicalCluster","value":6714},{"name":"MergeEdge","value":743}]},{"name":"graph","children":[{"name":"BetweennessCentrality","value":3534},{"name":"LinkDistance","value":5731},{"name":"MaxFlowMinCut","value":7840},{"name":"ShortestPaths","value":5914},{"name":"SpanningTree","value":3416}]},{"name":"optimization","children":[{"name":"AspectRatioBanker","value":7074}]}]},{"name":"animate","children":[{"name":"Easing","value":17010},{"name":"FunctionSequence","value":5842},{"name":"interpolate","children":[{"name":"ArrayInterpolator","value":1983},{"name":"ColorInterpolator","value":2047},{"name":"DateInterpolator","value":1375},{"name":"Interpolator","value":8746},{"name":"MatrixInterpolator","value":2202},{"name":"NumberInterpolator","value":1382},{"name":"ObjectInterpolator","value":1629},{"name":"PointInterpolator","value":1675},{"name":"RectangleInterpolator","value":2042}]},{"name":"ISchedulable","value":1041},{"name":"Parallel","value":5176},{"name":"Pause","value":449},{"name":"Scheduler","value":5593},{"name":"Sequence","value":5534},{"name":"Transition","value":9201},{"name":"Transitioner","value":19975},{"name":"TransitionEvent","value":1116},{"name":"Tween","value":6006}]},{"name":"data","children":[{"name":"converters","children":[{"name":"Converters","value":721},{"name":"DelimitedTextConverter","value":4294},{"name":"GraphMLConverter","value":9800},{"name":"IDataConverter","value":1314},{"name":"JSONConverter","value":2220}]},{"name":"DataField","value":1759},{"name":"DataSchema","value":2165},{"name":"DataSet","value":586},{"name":"DataSource","value":3331},{"name":"DataTable","value":772},{"name":"DataUtil","value":3322}]},{"name":"display","children":[{"name":"DirtySprite","value":8833},{"name":"LineSprite","value":1732},{"name":"RectSprite","value":3623},{"name":"TextSprite","value":10066}]},{"name":"flex","children":[{"name":"FlareVis","value":4116}]},{"name":"physics","children":[{"name":"DragForce","value":1082},{"name":"GravityForce","value":1336},{"name":"IForce","value":319},{"name":"NBodyForce","value":10498},{"name":"Particle","value":2822},{"name":"Simulation","value":9983},{"name":"Spring","value":2213},{"name":"SpringForce","value":1681}]},{"name":"query","children":[{"name":"AggregateExpression","value":1616},{"name":"And","value":1027},{"name":"Arithmetic","value":3891},{"name":"Average","value":891},{"name":"BinaryExpression","value":2893},{"name":"Comparison","value":5103},{"name":"CompositeExpression","value":3677},{"name":"Count","value":781},{"name":"DateUtil","value":4141},{"name":"Distinct","value":933},{"name":"Expression","value":5130},{"name":"ExpressionIterator","value":3617},{"name":"Fn","value":3240},{"name":"If","value":2732},{"name":"IsA","value":2039},{"name":"Literal","value":1214},{"name":"Match","value":3748},{"name":"Maximum","value":843},{"name":"methods","children":[{"name":"add","value":593},{"name":"and","value":330},{"name":"average","value":287},{"name":"count","value":277},{"name":"distinct","value":292},{"name":"div","value":595},{"name":"eq","value":594},{"name":"fn","value":460},{"name":"gt","value":603},{"name":"gte","value":625},{"name":"iff","value":748},{"name":"isa","value":461},{"name":"lt","value":597},{"name":"lte","value":619},{"name":"max","value":283},{"name":"min","value":283},{"name":"mod","value":591},{"name":"mul","value":603},{"name":"neq","value":599},{"name":"not","value":386},{"name":"or","value":323},{"name":"orderby","value":307},{"name":"range","value":772},{"name":"select","value":296},{"name":"stddev","value":363},{"name":"sub","value":600},{"name":"sum","value":280},{"name":"update","value":307},{"name":"variance","value":335},{"name":"where","value":299},{"name":"xor","value":354},{"name":"_","value":264}]},{"name":"Minimum","value":843},{"name":"Not","value":1554},{"name":"Or","value":970},{"name":"Query","value":13896},{"name":"Range","value":1594},{"name":"StringUtil","value":4130},{"name":"Sum","value":791},{"name":"Variable","value":1124},{"name":"Variance","value":1876},{"name":"Xor","value":1101}]},{"name":"scale","children":[{"name":"IScaleMap","value":2105},{"name":"LinearScale","value":1316},{"name":"LogScale","value":3151},{"name":"OrdinalScale","value":3770},{"name":"QuantileScale","value":2435},{"name":"QuantitativeScale","value":4839},{"name":"RootScale","value":1756},{"name":"Scale","value":4268},{"name":"ScaleType","value":1821},{"name":"TimeScale","value":5833}]},{"name":"util","children":[{"name":"Arrays","value":8258},{"name":"Colors","value":10001},{"name":"Dates","value":8217},{"name":"Displays","value":12555},{"name":"Filter","value":2324},{"name":"Geometry","value":10993},{"name":"heap","children":[{"name":"FibonacciHeap","value":9354},{"name":"HeapNode","value":1233}]},{"name":"IEvaluable","value":335},{"name":"IPredicate","value":383},{"name":"IValueProxy","value":874},{"name":"math","children":[{"name":"DenseMatrix","value":3165},{"name":"IMatrix","value":2815},{"name":"SparseMatrix","value":3366}]},{"name":"Maths","value":17705},{"name":"Orientation","value":1486},{"name":"palette","children":[{"name":"ColorPalette","value":6367},{"name":"Palette","value":1229},{"name":"ShapePalette","value":2059},{"name":"SizePalette","value":2291}]},{"name":"Property","value":5559},{"name":"Shapes","value":19118},{"name":"Sort","value":6887},{"name":"Stats","value":6557},{"name":"Strings","value":22026}]},{"name":"vis","children":[{"name":"axis","children":[{"name":"Axes","value":1302},{"name":"Axis","value":24593},{"name":"AxisGridLine","value":652},{"name":"AxisLabel","value":636},{"name":"CartesianAxes","value":6703}]},{"name":"controls","children":[{"name":"AnchorControl","value":2138},{"name":"ClickControl","value":3824},{"name":"Control","value":1353},{"name":"ControlList","value":4665},{"name":"DragControl","value":2649},{"name":"ExpandControl","value":2832},{"name":"HoverControl","value":4896},{"name":"IControl","value":763},{"name":"PanZoomControl","value":5222},{"name":"SelectionControl","value":7862},{"name":"TooltipControl","value":8435}]},{"name":"data","children":[{"name":"Data","value":20544},{"name":"DataList","value":19788},{"name":"DataSprite","value":10349},{"name":"EdgeSprite","value":3301},{"name":"NodeSprite","value":19382},{"name":"render","children":[{"name":"ArrowType","value":698},{"name":"EdgeRenderer","value":5569},{"name":"IRenderer","value":353},{"name":"ShapeRenderer","value":2247}]},{"name":"ScaleBinding","value":11275},{"name":"Tree","value":7147},{"name":"TreeBuilder","value":9930}]},{"name":"events","children":[{"name":"DataEvent","value":2313},{"name":"SelectionEvent","value":1880},{"name":"TooltipEvent","value":1701},{"name":"VisualizationEvent","value":1117}]},{"name":"legend","children":[{"name":"Legend","value":20859},{"name":"LegendItem","value":4614},{"name":"LegendRange","value":10530}]},{"name":"operator","children":[{"name":"distortion","children":[{"name":"BifocalDistortion","value":4461},{"name":"Distortion","value":6314},{"name":"FisheyeDistortion","value":3444}]},{"name":"encoder","children":[{"name":"ColorEncoder","value":3179},{"name":"Encoder","value":4060},{"name":"PropertyEncoder","value":4138},{"name":"ShapeEncoder","value":1690},{"name":"SizeEncoder","value":1830}]},{"name":"filter","children":[{"name":"FisheyeTreeFilter","value":5219},{"name":"GraphDistanceFilter","value":3165},{"name":"VisibilityFilter","value":3509}]},{"name":"IOperator","value":1286},{"name":"label","children":[{"name":"Labeler","value":9956},{"name":"RadialLabeler","value":3899},{"name":"StackedAreaLabeler","value":3202}]},{"name":"layout","children":[{"name":"AxisLayout","value":6725},{"name":"BundledEdgeRouter","value":3727},{"name":"CircleLayout","value":9317},{"name":"CirclePackingLayout","value":12003},{"name":"DendrogramLayout","value":4853},{"name":"ForceDirectedLayout","value":8411},{"name":"IcicleTreeLayout","value":4864},{"name":"IndentedTreeLayout","value":3174},{"name":"Layout","value":7881},{"name":"NodeLinkTreeLayout","value":12870},{"name":"PieLayout","value":2728},{"name":"RadialTreeLayout","value":12348},{"name":"RandomLayout","value":870},{"name":"StackedAreaLayout","value":9121},{"name":"TreeMapLayout","value":9191}]},{"name":"Operator","value":2490},{"name":"OperatorList","value":5248},{"name":"OperatorSequence","value":4190},{"name":"OperatorSwitch","value":2581},{"name":"SortOperator","value":2023}]},{"name":"Visualization","value":16540}]}]};

let root = { 
"name" : "root", "text" : "U","style" : "root", "type" : "root", "children" : [ { 
"name" : "disj_0_0", "text" : "⋈","style" : "root", "type" : "root", "children" : [ { 
"name" : "union", "text" : "U","style" : "root", "type" : "root", "children" : [ { 
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

let createRadialTree = function (input) {
	
	
	var circleCount = input.children.length;
	var cicumference = circleCount * 15;
	let diameter = cicumference/Math.PI;

var width;
var height;

width = window.innerWidth;
if(diameter>window.innerHeight){
	 height = diameter+100;
}else{
	 height = window.innerHeight;
}


//const height = window.innerHeight;
    let svg = d3.select('#canvasDiv')
        .append('svg')
        .attr('width', width)
        .attr('height', height);



 // create a tooltip
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
	.style("height",(window.innerHeight*0.75)+"px")
    .style("padding", "5px");

// Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    Tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }
  var mousemove = function(d) {
	htmlStr=(d.target.__data__.data.tooltip);
	htmlStr+="<br><br>";

	if(d.target.__data__.data.type != "root"){
		htmlStr+="<pre>"+ window.sqlFormatter.format(d.target.__data__.data.name, {language: 'postgresql'})+" </pre> <br>";
		}    
	Tooltip.html(htmlStr);
  }
  var mouseleave = function(d) {
   // Tooltip
     // .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
  }

    //let diameter = height * 0.9;

	    
    let radius = diameter / 2;

    let tree = d3.tree()
        .size([2*Math.PI, radius])
        .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

    let data = d3.hierarchy(input)

d3.select("#queryStr").html(input.name);
d3.select("#qname").html("UCQ: Query "+findGetParameter("q"));
    let treeData = tree(data);
   
    let nodes = treeData.descendants();
    let links = treeData.links();
    
    let graphGroup = svg.append('g')
        .attr('transform', "translate("+(width/2)+","+(height/2)+")");

    graphGroup.selectAll(".link")
        .data(links)
        .join("path")
        .attr("class", "link")
        .attr("d", d3.linkRadial()
            .angle(d => d.x)
            .radius(d => d.y));
 
    let node = graphGroup
        .selectAll(".node")
        .data(nodes)
        .join("g")
        .attr("class", "node")
        .attr("transform", function(d){
			
			if(d.data.type!="root"){
				return "translate(" + radialPoint(d.x, d.y) + ")";
			}
            
        })
		.on("mouseover", mouseover)
		.on("mousemove", mousemove)
		.on("click", mousemove)
		.on("mouseleave", mouseleave);


    node.append("circle")
			.attr("r", 5)
			.attr("class", function(d){ return d.data.type == "root" ? "circleRoot" : "circle"+d.data.type ;});

    node.append("text")
        .attr("font-family", "sans-serif")
        .attr("font-size", 20)
        .attr("dx", function(d) { return d.x < Math.PI ? 8 : -8; })
        .attr("dy", ".31em")
		.attr("text-anchor", function(d) { return d.x < Math.PI === !d.children ? "start" : "end"; })
     	.attr("transform", function(d) { return "rotate(" + (d.x < Math.PI ? d.x - Math.PI / 2 : d.x + Math.PI / 2) * 180 / Math.PI + ")"; })
        .text(function(d) { return d.data.nodeid; });


};
function radialPoint(x, y) {
  return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
}
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
    createRadialTree(data.d);
})();