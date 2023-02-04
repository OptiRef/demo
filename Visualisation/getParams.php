<?php
	
    $baseDirectory = "data";
		
	
	$dataParams = array();
	
	$dbms = array_slice(scandir($baseDirectory), 2);
	if($dbms[0]==".DS_Store"){
	    $dbms = array_slice($dbms,1);
	}
	$dataParams["dbms"] = $dbms;
	
	foreach ($dbms as $item) {
	    $dataParams[$item]["benchmark"] = array();
	    $benchmark = array_slice(scandir($baseDirectory."/".$item), 2);
	    if($benchmark[0]==".DS_Store"){
	        $benchmark = array_slice($benchmark,1);
	    }
	    $dataParams[$item]["benchmark"] = $benchmark;
	    $dataParams["benchmarks"] = $benchmark;
	    
	    foreach ($benchmark as $item2) {
	        $dataParams[$item][$item2] = array();
	        $abox  = array_slice(scandir($baseDirectory."/".$item."/".$item2), 2);
	        if($abox[0]==".DS_Store"){
	            $abox = array_slice($abox,1);
	        }
// 	        print_r($abox);
	        $abox = array_reverse($abox);
// 	        print_r($abox);
	        if($abox[0]=="Stats"){
	            $abox = array_slice($abox,1);
	        }
// 	        print_r($abox);
// 	        sort($abox);
	        
	        $count = count($abox);
	        for ($i = 0; $i < $count; $i++) {
	            for ($j = $i + 1; $j < $count; $j++) {
	                $prefix1 = intval($abox[$i]);
	                $prefix2 = intval($abox[$j]);
	                
	                if ($prefix1 > $prefix2) {
	                    $temp = $abox[$i];
	                    $abox[$i] = $abox[$j];
	                    $abox[$j] = $temp;
	                }
	            }
	        }
	        
	        $dataParams[$item][$item2]["aboxes"] = ($abox);
// 	        print_r(array_reverse($abox));
	        $dataParams[$item][$item2]["queries"] = array();
	        $dataParams[$item][$item2]["methods"] = array();
	        foreach ($abox as $item3) {
	            $reformulations = array_slice(scandir($baseDirectory."/".$item."/".$item2."/".$item3), 2);
	            if($reformulations[0]==".DS_Store"){
	                $reformulations = array_slice($reformulations,1);
	            }
	            
	            if (in_array("UCQ", $reformulations) && !in_array("UCQ", $dataParams[$item][$item2]["methods"])){
	                $dataParams[$item][$item2]["methods"][] = "UCQ";
	            }
	            if (in_array("USCQ", $reformulations) && !in_array("USCQ", $dataParams[$item][$item2]["methods"])){
	                $dataParams[$item][$item2]["methods"][] = "USCQ";
	            }
	            if (in_array("JUCQ", $reformulations) && !in_array("JUCQ", $dataParams[$item][$item2]["methods"])){
	                $dataParams[$item][$item2]["methods"][] = "JUCQ";
	            }
	            foreach ($reformulations as $refo) {
	                if (!in_array($refo, $dataParams[$item][$item2]["methods"])){
	                    
	                    $dataParams[$item][$item2]["methods"][] = $refo;
	                }
	            }
	            
	            foreach ($reformulations as $item4) {
	                $datafiles = array_slice(scandir($baseDirectory."/".$item."/".$item2."/".$item3."/".$item4), 2);
	                if($datafiles[0]==".DS_Store"){
	                    $datafiles = array_slice($datafiles,1);
	                }
	                $dataParams[$item][$item2][$item3][$item4]["fileNames"] = $datafiles;
	                
	                foreach ($datafiles as $item5) {
	                    $results = fopen($baseDirectory."/".$item."/".$item2."/".$item3."/".$item4."/".$item5, "r"); // On récupère la liste des bases dans le fichier correspondant
	                    fgetcsv($results);
	                    $queryNames = array();
	                    while (($l = fgetcsv($results)) !== false) {
	                        if (!in_array($l[0], $queryNames)) {
	                            if($l[0]){
	                                $queryNames[] = $l[0];
	                            }
	                        }
	                        if (!in_array($l[0], $dataParams[$item][$item2]["queries"])) {
	                            if($l[0]){
	                               $dataParams[$item][$item2]["queries"][] = $l[0];
	                            }
	                        }
	                        
	                    }
	                    $dataParams[$item][$item2][$item3][$item4][$item5]["queries"] = $queryNames;
	                    $dataParams[$item][$item2][$item3]["queries"] = $queryNames;
	                    fclose($results);
	                }
	                
	                
	            }
	            
	            
	        }
	        
	    }

	}
	
	

	$querieBaseDirectory = "queries";
	
	
	
	$dbmsDirectory = array_slice(scandir($querieBaseDirectory), 2);
	if($dbmsDirectory[0]==".DS_Store"){
	    $dbms = array_slice($dbmsDirectory,1);
	}
	
	$prefix = "";
	$queryMap = array();
	
	foreach ($dbms as $item) {
	    $queryMap[$item] = array();
	    
	    $filesArr = array_slice(scandir($querieBaseDirectory."/".$item), 2);
	    if($filesArr[0]==".DS_Store"){
	        $filesArr = array_slice($filesArr,1);
	    }
	    
	    foreach ($filesArr as $item2) {
	        $fSysQ = fopen($querieBaseDirectory."/".$item."/".$item2, "r");
	        while (($l = fgets($fSysQ)) !== false) {
	            
	            if (str_contains($l, 'PREFIX')) {
	                $prefix = substr($l,strpos($l," ")+1);
	                $queryMap[$item]["prefix"] = $prefix;
	            }else if( str_contains($l, '(?')){
	                $elements = explode("(?",$l);
	                $queryMap[$item]["map"][$elements[0]] = $l;
	            }
	        }
	        
	    }
	}
	
	
	
	$queryMapData = array (
	    "prefix" => $prefix,
	    "map" => $queryMap
	);
	
	
	
	$send = array(
	    "dataParams" => $dataParams,
	    "queryMap" => $queryMap
	    
	);
	
	
	
	header("Content-Type: application/json");
	header("Pragma: no-cache");
	header("Expires: 0");
	echo json_encode($send);
	

?>