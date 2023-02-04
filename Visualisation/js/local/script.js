var path = window.location.pathname;
var page = path.split("/").pop();
var dynamic = (page.includes("dynamic.html")); 


var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
myModal.toggle();

var ParamsData;
var queryMap;
const COLORS = [
    '#4dc9f6',
    '#f67019',
    '#f53794',
    '#537bc4',
    '#acc236',
    '#166a8f',
    '#00a950',
    '#58595b',
    '#8549ba'
];

function color(index) {
    return COLORS[index % COLORS.length];
}

function transparentize(value, opacity) {
    var alpha = opacity === undefined ? 0.5 : 1 - opacity;
    return colorLib(value).alpha(alpha).rgbString();
}

const CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

const NAMED_COLORS = [
    CHART_COLORS.red,
    CHART_COLORS.orange,
    CHART_COLORS.yellow,
    CHART_COLORS.green,
    CHART_COLORS.blue,
    CHART_COLORS.purple,
    CHART_COLORS.grey,
];
var MyRequestsCompleted = (function() {
    var numRequestToComplete, requestsCompleted, callBacks, singleCallBack;

    return function(options) {
        if (!options) options = {};

        numRequestToComplete = options.numRequest || 0;
        requestsCompleted = options.requestsCompleted || 0;
        callBacks = [];
        var fireCallbacks = function() {
            alert("we're all complete");
            for (var i = 0; i < callBacks.length; i++) callBacks[i]();
        };
        if (options.singleCallback) callBacks.push(options.singleCallback);

        this.addCallbackToQueue = function(isComplete, callback) {
            if (isComplete) requestsCompleted++;
            if (callback) callBacks.push(callback);
            if (requestsCompleted == numRequestToComplete) fireCallbacks();
        };
        this.requestComplete = function(isComplete) {
            if (isComplete) requestsCompleted++;
            if (requestsCompleted == numRequestToComplete) fireCallbacks();
        };
        this.setCallback = function(callback) {
            callBacks.push(callBack);
        };
    };
})();
var requestCallback = new MyRequestsCompleted({
    numRequest: 3,
    singleCallback: function() {
        alert("I'm the callback");
    }
});

function namedColor(index) {
    return NAMED_COLORS[index % NAMED_COLORS.length];
}

function addSingletonInputs(data, param) {
    var divInputGroup = d3.select("#" + param).selectAll(".choix" + param).data(data).enter()
        .append("div")
        .classed(".choix" + param, true);
    divInputGroup.attr("class", "form-check form-check-inline col ");

    divInputGroup.append("input")
        .attr("class", "form-check-input")
        .attr("type", "radio")
        .attr("name", param)
        .attr("id", d => d)
        .attr("value", d => d)
        .on("change", updateParams)
        .attr("checked", "true");


	if(param == "aboxes"){
		divInputGroup.append("label")
        .attr("class", "form-check-label")
        .attr("for", d => d)
        .text(d => d.replace("MT","M"));	
	}else{
		divInputGroup.append("label")
        .attr("class", "form-check-label")
        .attr("for", d => d)
        .text(d => d);	
	}
    

}

function addCheckboxInputs(data, param) {

    var divInputGroup = d3.select("#" + param).selectAll(".choix" + param).data(data).enter()
        .append("div")
        .classed(".choix" + param, true);
    divInputGroup.attr("class", "form-check form-check-inline col ");

    divInputGroup.append("input")
        .attr("class", "form-check-input")
        .attr("type", "checkbox")
        .attr("name", param)
        .attr("id", d => d)
        .attr("value", d => d)
        .attr("checked", "true");

    divInputGroup.append("label")
        .attr("class", "form-check-label")
        .attr("for", d => d)
        .text(d => d);

}

function addSelectQueriesOptions(data, param) {

    var selectElement = d3.select("#" + param);

    var optionsElement = selectElement.selectAll("option")
        .data(data)
        .enter()
        .append("option");

    optionsElement.text(function(d) {
        return d;
    })
    optionsElement.attr("value", function(d) {
        return d;
    });

}




function selectedElement(param) {
    var optionsList = "";
    $('input[name=' + param + ']:checked').each(function() {
        if (optionsList != "") {
            optionsList += ",";
        }
        optionsList += this.value;
    });
    return optionsList;
}

function updateParams() {
    var currentBenchmark = ($('input[name=benchmarkInputs]:checked').val());
    var currentABOX = ($('input[name=aboxes]:checked').val());
	var currentQuery = $('#querySelect').val();
	
    $("#querySelect").html("");
    $("#aboxes").html("");
	

    addSingletonInputs(ParamsData["benchmarks-data"][currentBenchmark]["sizes"].sort(function(a,b){
	tempA = a.substring(0,a.indexOf("MT"));
	tempB = b.substring(0,b.indexOf("MT"));
	
	return tempA - tempB;
	
}), "aboxes");

    $("#" + currentABOX).prop("checked", true);
	addSelectQueriesOptions(ParamsData["benchmarks-data"][currentBenchmark]["queries"].sort(), "querySelect");
	$('#current-prefix').val(ParamsData["benchmarks-data"][currentBenchmark]["prefix"]);
	
	$('#requete').html("");
	if(currentQuery!=null && currentQuery.startsWith("q")){
		$('#querySelect').val(currentQuery);
	}
	getQueryText();
	if(dynamic == true){
			$("#DB2").prop("checked", false);
			$("#DB2").prop("disabled", true);
		}
	

}

function reinitialiserParams(currentQuery) {
	
	
    d3.json("getParamsDynamic.php?d="+dynamic).then(function(data) {
		
		var currentBenchmark = ($('input[name=benchmarkInputs]:checked').val());
		
		$("#querySelect").html("");
    	$("#requete").html("");
	
        ParamsData = data.dataParams;
        addSelectQueriesOptions(ParamsData["benchmarks-data"][currentBenchmark]["queries"].sort(), "querySelect");

        $('#querySelect').val(currentQuery);
		
		getQueryText();

    });
}

function initialiserParams() {
    d3.json("getParamsDynamic.php?d="+dynamic).then(function(data) {
        ParamsData = data.dataParams;

        addSingletonInputs(ParamsData.benchmarks, "benchmarkInputs");
        addCheckboxInputs(ParamsData.dbms, "dbmsInputs");
		if(dynamic == true){
	
		}
		


		addCheckboxInputs(ParamsData.methods, "methods");
        $("#LUBM").prop("checked", true);
        var currentBenchmark = ($('input[name=benchmarkInputs]:checked').val());


        addSingletonInputs(ParamsData["benchmarks-data"][currentBenchmark]["sizes"].sort(function(a,b){
	tempA = a.substring(0,a.indexOf("MT"));
	tempB = b.substring(0,b.indexOf("MT"));
	
	return tempA - tempB;
	
}), "aboxes");
        
if(dynamic == true){
			$("#1MT").prop("checked", true);
			
		}else{
			$("#150MT").prop("checked", true);
		}
		
        addSelectQueriesOptions(ParamsData["benchmarks-data"][currentBenchmark]["queries"].sort(), "querySelect");
       

        $('#querySelect').val("qa1");
		$('#querySelect').on('change'	,getQueryText);
		getQueryText();
		$('#current-prefix').val(ParamsData["benchmarks-data"][currentBenchmark]["prefix"]);

    });
}

function getQueryText() {
            //$('#nomRequete').val($("#querySelect").val());

			var currentBenchmark = ($('input[name=benchmarkInputs]:checked').val());
			var currentQuery = $("#querySelect").val();
			//alert("getQueryText.php?benchmark="+currentBenchmark+"&q="+currentQuery);
			d3.json("getQueryText.php?benchmark="+currentBenchmark+"&q="+currentQuery+"&d="+dynamic).then(function(data) {
				$('#requete').html(data.query);
				
			});

			
            
 }

initialiserParams();




var myChart;
var chartSetup = false;
var labelCount = 0;
var datasetCount = 0;
var selectedQueries = "";


var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});

d3.select("#saveChanges").on("click", loadCharts);

function loadCharts() {
    $("#chartArea").empty();
    var dbName = selectedElement("dbmsInputs");

    selectedQueries = "";
    $("#querySelect option:selected").each(function() {
        //alert($(this).text());
        if (selectedQueries != "") {
            selectedQueries += ",";
        }
        selectedQueries += $(this).text();
    });

    dataURL = ("getData.php?dbms=" + dbName + "&benchmark=" + selectedElement("benchmarkInputs") + "&aboxes=" +
        selectedElement("aboxes") + "&queries=" + selectedQueries + "&methods=" + selectedElement("methods") + "&prune=" + selectedElement("prune") 
	+ "&pruneDB=" + selectedElement("pruneDB") + "&d="+dynamic);


    $.getJSON(dataURL, function(data) {
        
        $("#statDataset").html(selectedElement("benchmarkInputs"));
        $("#statDBMS").html(selectedElement("dbmsInputs"));
        $("#statAboxes").html(selectedElement("aboxes"));
        $("#statQueries").html(selectedQueries);
        if (selectedElement("prune") == "") {
            $("#statSummary").html("OFF");
        } else {
            $("#statSummary").html("ON");
        }
        if (selectedElement("pruneDB") == "") {
            $("#statDB").html("OFF");
        } else {
            $("#statDB").html("ON");
        }
        
        var chartTitle = "";


        var dataKeys = (Object.keys(data));



        for (let i = 0; i < dataKeys.length; i++) {
            chartTitle = "Query=" + selectedQueries + ", Database=" + selectedElement("aboxes") + ", DBMS=" + dataKeys[i];
            setupBarChart(data[dataKeys[i]], chartTitle, dataKeys[i]);
            setupStatistics(dataKeys[i])
        }

    });




}

var xhr = null;


function loadChart(currentDBMS) {


    selectedQueries = "";
    $("#querySelect option:selected").each(function() {

        if (selectedQueries != "") {
            selectedQueries += ",";
        }
        selectedQueries += $(this).text();
    });
    
    xhr = $.ajax({
        async: false,
        type: 'GET',
        cache: false,
        timeout: 30000,
        url: dataURL,
        dataType: "json",
        success: function(data) {
           
            $("#statDataset").html(selectedElement("benchmarkInputs"));
            $("#statDBMS").html(selectedElement("dbmsInputs"));
            $("#statAboxes").html(selectedElement("aboxes"));
            $("#statQueries").html(selectedQueries);
            if (selectedElement("prune") == "") {
                $("#statSummary").html("OFF");
            } else {
                $("#statSummary").html("ON");
            }
            if (selectedElement("pruneDB") == "") {
                $("#statDB").html("OFF");
            } else {
                $("#statDB").html("ON");
            }
            setupStatistics();



            chartTitle = "Query=" + selectedQueries + ", Database=" + selectedElement("aboxes") + ", DBMS=" + selectedElement("dbmsInputs");


            setupBarChart(data, chartTitle, currentDBMS);
        },
        done: function(msg) {
            console.log("MSG: " + msg);
        }
    });


}

function addData(chart, label, data) {


    label.forEach(function(item) {
        chart.data.labels.push(item);
    });
    data.forEach(function(item) {
        chart.data.datasets.push(item);
    });
   

    chart.update();
}

function removeData(chart) {
    for (i = 0; i < labelCount; i++) {
        myChart.data.labels.pop();
    }



    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}


//Bar Chart

function setupBarChart(data, chartTitle, currentDBMS) {

    var localData = data;

    $('<div class="row" id="chartArea' + currentDBMS + 'Row"></div>').appendTo('#chartArea');
    $('<div id="chartArea' + currentDBMS + 'Col" class="col-8"></div>').appendTo('#chartArea' + currentDBMS + 'Row');
    var chartID = "myChart-" + currentDBMS;
    $('<canvas id="' + chartID + '"></canvas>').appendTo('#chartArea' + currentDBMS + 'Col');
    var labels = data.chartjs.labels;

    labelCount = data.chartjs.labels.length;
    datasetCount = data.chartjs.datasets.length;


    var nans = false;
    if (data.chartjs.NANS) {
        nans = data.chartjs.NANS;

    }
    footer = (tooltipItems) => {
        let sum = 0;
        let tooltipStr = "";
        let answers = "\nNumber of answers: " + nans;
        tooltipItems.forEach(function(tooltipItem) {
            sum += tooltipItem.parsed.y;


            if ((tooltipItem.dataset.label).includes("pruned")) {
                if (localData.chartjs.tooltipData[tooltipItem.dataset.label]) {
                    alert(tooltipStr);
                    tooltipStr += "\n\n" + localData.chartjs.tooltipData[tooltipItem.dataset.label];
                }

            }
        });
        sum = sum.toFixed(2);
        tooltipStr = tooltipStr.replaceAll(",", "");

        return 'Total time: ' + sum + " (ms) " + answers + tooltipStr;
    };


    var data = {
        labels: labels,
        datasets: data.chartjs.datasets
    };
    var config = {
        type: 'bar',
        data,
        options: {
            onClick: (e) => {
                const canvasPosition = Chart.helpers.getRelativePosition(e, myChart);
                const dataX = myChart.scales.x.getValueForPixel(canvasPosition.x);
                const dataY = myChart.scales.y.getValueForPixel(canvasPosition.y);

                refType = (myChart.data.labels[dataX]).toLowerCase();

                var rawOrPruned = 0;
                var activePoint = myChart.getElementsAtEventForMode(e, 'nearest', {
                    intersect: true
                }, true);

                var prunedDB = 0;



                if (selectedElement("prune") && selectedElement("pruneDB")) {
                    if (activePoint[0].datasetIndex > 4) {
                        rawOrPruned = 1;
                        prunedDB = 0;
                    } else if (activePoint[0].datasetIndex > 1) {
                        rawOrPruned = 0;
                        prunedDB = 1;
                    } else {
                        rawOrPruned = 0;
                        prunedDB = 0;
                    }
                } else if (selectedElement("prune")) {
                    prunedDB = 0;
                    if (activePoint[0].datasetIndex > 1) {
                        rawOrPruned = 1;
                    } else {
                        rawOrPruned = 0;

                    }
                } else if (selectedElement("pruneDB")) {
                    rawOrPruned = 0;
                    if (activePoint[0].datasetIndex > 1) {
                        prunedDB = 1;
                    } else {
                        prunedDB = 0;
                    }
                } else {
                    rawOrPruned = 0;
                    prunedDB = 0;
                }

                window.open("tree/" + refType + ".html?dataset=" + selectedElement("benchmarkInputs") + "&pruned=" + rawOrPruned + "&q=" + selectedQueries + "&pruneDB=" + prunedDB+"&size="+ ($('input[name=aboxes]:checked').val()) + "&d="+dynamic, "", "toolbar=no,status=no,menubar=no,location=center,scrollbars=no,resizable=no,height=" + (window.innerHeight) + ",width=" + (window.innerWidth));




            },
            responsive: true,
            //events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
            interaction: {
                intersect: false,
                mode: 'nearest',
                axis: 'x'
            },
            scales: {
                x: {
                    stacked: true,
                },
                y: {
					min:0,
                    stacked: true,
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function(value, index, values) {
                            return value + " ms";
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        footer: footer,
                        label: function(tooltipItem, data) {
                            label = "";
                            if (label) {
                                label = label.replaceAll(",", "");
                            }
                            tooltipItem.formattedValue = tooltipItem.formattedValue.replaceAll(",", "");

                            var tempLabel = tooltipItem.dataset.label;
                            var tempValue = tooltipItem.formattedValue.replaceAll(",", "");

                            if (tooltipItem.raw < 0) {
                                tempValue = "EXITED WITH ERROR";
                            }

                            return tempLabel + ": " + tempValue;
                        }
                    },
					titleFont:{
						size:20
					},
					bodyFont:{
						size: 14
					},
					footerFont:{
						size: 14
					}
                },
                title: {
                    display: true,
                    text: chartTitle,
					
                },


            }
        }
    };

    chartCtx = document.getElementById(chartID);

    myChart = new Chart(
        chartCtx,
        config
    );

    chartSetup = true;
}

function chartClickHandler(e) {
    const points = myChart.getElementsAtEventForMode(e, 'nearest', {
        intersect: true
    }, true);
    if (points.length) {
        const firstPoint = points[0];
    }
}



function setupStatistics() {
    $("#statsTableHead").empty();
    $("#statsTableBody").empty();


    var tempArr = selectedElement("aboxes").split(",");
    var arrSize = tempArr.length;
    //Setup table head 
    
    $("#statsTableHead").append("<tr id=\"thtr\"> </tr>");
    $("#thtr").append("<th>#</th>");

    for (i = 0; i < arrSize; i++) {
        $("#thtr").append("<th>" + selectedElement("benchmarkInputs") + " - " + tempArr[i] + "</th>");
    }

    var dataURL = ("getStats.php?dbms=" + selectedElement("dbmsInputs") + "&benchmark=" + selectedElement("benchmarkInputs") + "&aboxes=" +
        selectedElement("aboxes") + "&d="+dynamic);
    

    $.getJSON(dataURL, function(data) {
       
       for (i = 0; i < data.length; i++) {
            $("#statsTableBody").append("<tr id=\"tbtr" + i + "\"> </tr>");
            for (j = 0; j < data[i].length; j++) {
                $("#tbtr" + i).append("<td>" + data[i][j] + " </td>");
            }

        }

        var i = 0;
        data.data.forEach(function(item) {
            $("#statsTableBody").append("<tr id=\"tbtr" + i + "\"> </tr>");
            item.forEach(function(item2) {
                $("#tbtr" + i).append("<td>" + item2 + " </td>");
            });
            i++;
        });

    });
}

function setupStatisticsLocal(currentDBMS) {
    tableID = "statsTable" + currentDBMS;
    tableHead = "statsTableHead" + currentDBMS;
    tableBody = "statsTableBody" + currentDBMS;

    $('<div id="statsArea' + currentDBMS + 'Col" class="col-4"></div>').appendTo('#chartArea' + currentDBMS + 'Row');

    $('<div class="row"><div class="col-12"><div class="card text-center"><div class="card-body"><h6 class="card-title">Statistics</h6><table class="table" id="' + tableID + '"><thead id="' + tableHead + '"></thead><tbody id="' + tableBody + '"></tbody></table></div></div></div></div>').appendTo('#statsArea' + currentDBMS + 'Col');

    $("#" + tableHead).empty();
    $("#" + tableBody).empty();


    var tempArr = selectedElement("aboxes").split(",");
    var arrSize = tempArr.length;
    //Setup table head 
    $("#" + tableHead).append("<tr id=\"thtr" + currentDBMS + "\"> </tr>");
    $("#thtr" + currentDBMS).append("<th>#</th>");

    for (i = 0; i < arrSize; i++) {
        $("#thtr" + currentDBMS).append("<th>" + currentDBMS + ": " + selectedElement("benchmarkInputs") + " - " + tempArr[i] + "</th>");
    }

    var dataURL = ("getStats.php?dbms=" + currentDBMS + "&benchmark=" + selectedElement("benchmarkInputs") + "&aboxes=" +
        selectedElement("aboxes") + "&d="+dynamic);

    fileReader = new FileReader();

}
function numberWithSpaces(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}

function setupStatistics(currentDBMS) {
    tableID = "statsTable" + currentDBMS;
    tableHead = "statsTableHead" + currentDBMS;
    tableBody = "statsTableBody" + currentDBMS;

    $('<div id="statsArea' + currentDBMS + 'Col" class="col-4"></div>').appendTo('#chartArea' + currentDBMS + 'Row');

    $('<div class="row"><div class="col-12 "><div class="card text-center"><div class="card-body"><h6 class="card-title">Statistics</h6><table class="table" id="' + tableID + '"><thead id="' + tableHead + '"></thead><tbody id="' + tableBody + '"></tbody></table></div></div></div></div>').appendTo('#statsArea' + currentDBMS + 'Col');

    $("#" + tableHead).empty();
    $("#" + tableBody).empty();


    var tempArr = selectedElement("aboxes").split(",");
    var arrSize = tempArr.length;
    //Setup table head 
    $("#" + tableHead).append("<tr id=\"thtr" + currentDBMS + "\"> </tr>");
    $("#thtr" + currentDBMS).append("<th>#</th>");

    for (i = 0; i < arrSize; i++) {
        $("#thtr" + currentDBMS).append("<th>" + currentDBMS + ": " + selectedElement("benchmarkInputs") + " - " + tempArr[i] + "</th>");
    }

    var dataURL = ("getStats.php?dbms=" + currentDBMS + "&benchmark=" + selectedElement("benchmarkInputs") + "&aboxes=" +
        selectedElement("aboxes") + "&d="+dynamic);
    

    $.getJSON(dataURL, function(data) {


        inUseDBMS = data.dbms;

        dArr = data.data;
        for (i = 0; i < dArr.length; i++) {


            $("#statsTableBody" + inUseDBMS).append("<tr id=\"tbtr" + inUseDBMS + "_" + i + "\"> </tr>");


            for (j = 0; j < dArr[i].length; j++) {
				currentValueStr = dArr[i][j];
				currentValueStr = currentValueStr.replace(",",".");
                $("#tbtr" + inUseDBMS + "_" + i).append("<td>" + numberWithSpaces(currentValueStr) + " </td>");
            }

        }

    });
}

var labels2 = [
    '1MT -- Q2001',
    '1MT -- Q2002',
    '100MT -- Q2001',
    '100MT -- Q2002',
];
var data2 = {
    labels: labels2,
    datasets: [{
            label: 'UCQ - Reformulation Time',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [28, 37, 39523, 73],
            stack: 'Stack 0',
        },
        {
            label: 'UCQ - Pruning Time',
            backgroundColor: 'rgb(255, 99, 14)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 0, 0, 0],
            stack: 'Stack 0',
        },
        {
            label: 'UCQ - Execution Time',
            backgroundColor: 'rgb(255, 15, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [3487, 345, 92957, 2860],
            stack: 'Stack 0',
        },
        {
            label: 'USCQ - Reformulation Time',
            backgroundColor: 'rgb(25, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [28, 37, 39523, 73],
            stack: 'Stack 1',
        },
        {
            label: 'USCQ - Pruning Time',
            backgroundColor: 'rgb(25, 99, 14)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 0, 0, 0],
            stack: 'Stack 1',
        },
        {
            label: 'USCQ - Execution Time',
            backgroundColor: 'rgb(55, 15, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [3487, 345, 92957, 2860],
            stack: 'Stack 1',
        },
        {
            label: 'JUCQ - Reformulation Time',
            backgroundColor: 'rgb(25, 99, 1)',
            borderColor: 'rgb(255, 99, 132)',
            data: [28, 37, 39523, 73],
            stack: 'Stack 3',
        },
        {
            label: 'JUCQ - Pruning Time',
            backgroundColor: 'rgb(25, 99, 14)',
            borderColor: 'rgb(255, 99, 1)',
            data: [0, 0, 0, 0],
            stack: 'Stack 3',
        },
        {
            label: 'JUCQ - Execution Time',
            backgroundColor: 'rgb(55, 15, 1)',
            borderColor: 'rgb(255, 99, 132)',
            data: [3487, 345, 92957, 2860],
            stack: 'Stack 3',
        },
    ]
};