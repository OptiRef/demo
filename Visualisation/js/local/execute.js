
$('#executeQuery').on("click",function(e){
	e.preventDefault();
	
	
	var currentBenchmark = ($('input[name=benchmarkInputs]:checked').val());
	var currentDbPref = ParamsData["benchmarks-data"][currentBenchmark]["db-prefix"];
	var currentABOX = ($('input[name=aboxes]:checked').val());
	var currentQName = $("#new-query-name").val();
	var currentQuery = $("#new-query").val();
	var currentPref = ParamsData["benchmarks-data"][currentBenchmark]["prefix"];
	// alert($("#new-query").val());
	var currentDBMS = selectedElement("dbmsInputs");
	
	$("#loader").addClass( 'show');
	
	
	console.log("Executing query:");
	console.log("currentBenchmark: "+currentBenchmark);
	console.log("currentDbPref: "+currentDbPref);
	console.log("currentABOX: "+currentABOX);
	console.log("currentQName: "+currentQName);
	console.log("currentQuery: "+currentQuery);
	console.log("currentPref: "+currentPref);
	console.log("currentDBMS: "+ currentDBMS);
	console.log("dynamic: "+dynamic)
	
	$.post('execute.php',
        {
            dataset: currentDbPref,
            datasize:currentABOX,
			dbms: currentDBMS,
			qname:currentQName,
			qbody: currentQuery,
			qprefix: currentPref,
			bench: currentBenchmark,
			d: dynamic
        },
        function(data) {
			console.log("done");
			console.log(data);
			setTimeout(function(){
				reinitialiserParams(currentQName);
				$("#loader").removeClass( 'show');
			}, 3000);
			
			
        }
    );
	
	
	});
	
	
	


    

