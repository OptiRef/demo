<?php
error_reporting(E_ERROR | E_PARSE);

//$baseDirectory = "data";
//$mainDir = "/Users/wafaaelhusseini/Documents/OptiRef_Main/Optiref-VLDB/resources-main/";
//$subDir = "Experiments/11-Oct-2022/";

$strJsonFileContents = file_get_contents("info.json");
$settings = json_decode($strJsonFileContents, true);

$dynamic = $_GET["d"];

if($dynamic==="true"){
    $mainDir = $settings["dynamic"]["mainDir"];
    $subDir = $settings["dynamic"]["mainSubDir"];
}else{
    $mainDir = $settings["static"]["mainDir"];
    $subDir = $settings["static"]["mainSubDir"];
}



$colorMap = array();

$colorMap["TREF_no"] = '#5c64b4';
$colorMap["TEXEC_no"] = '#b3e6ff';
$colorMap["TREF_pDB"] = '#2d9494';
$colorMap["TPRUN_pDB"] = '#f39a4d';
$colorMap["TEXEC_pDB"] = '#e295b3';
$colorMap["TREF_pS"] = '#83b623';
$colorMap["TPRUN_pS"] = '#d31668';
$colorMap["TEXEC_pS"] = '#ffd966';

$benchmark = strtoupper(trim($_GET["benchmark"]));
$dbms = explode(",", strtoupper($_GET["dbms"]));
$aboxes = explode(",", $_GET["aboxes"]);
$queries = explode(",", $_GET["queries"]);
$methods = explode(",", $_GET["methods"]);
$prune = $_GET["prune"];
$pruneDB = $_GET["pruneDB"];


$finalArray = array();

$indexMap = array();
$indexMap["TREF"] = 0;
$indexMap["TEVAL"] = 1;
if($prune && $pruneDB){
	$indexMap["TREF (optimized with DB)"] = 2;
	$indexMap["TOPTIM (optimized with DB)"] = 3;
	$indexMap["TEVAL (optimized with DB)"] = 4;	
	$indexMap["TREF (optimized with S)"] = 5;
	$indexMap["TOPTIM (optimized with S)"] = 6;
	$indexMap["TEVAL (optimized with S)"] = 7;
}else if($prune){
    $indexMap["TREF (optimized with S)"] = 2;
    $indexMap["TOPTIM (optimized with S)"] = 3;
    $indexMap["TEVAL (optimized with S)"] = 4;
}else if($pruneDB){
    $indexMap["TREF (optimized with DB)"] = 2;
    $indexMap["TOPTIM (optimized with DB)"] = 3;
    $indexMap["TEVAL (optimized with DB)"] = 4;
}

//loop over DBMS to get info
for($ww =0; $ww<count($dbms);$ww++){
	//$baseURL = $baseDirectory."/".$dbms[$ww]."/".$benchmark[0]."/".$aboxes[0];
    $baseURL = $mainDir.$subDir.$benchmark."/DBMS/".$dbms[$ww]."/".$aboxes[0]."/Queries/".$queries[0];
   // echo $baseURL;
    if(is_dir($baseURL)){
        $count = 0;
        $dataArray = array();
        $max = 0; // Taille de la barre la plus haute à envoyer pour la mise à l'échelle du graphique
        $numberOfAnswers = 0;
        $dataArrayNew = array();
        $dataArrayNew["labels"] = array();
        $dataArrayNew["datasets"] = array(); 
        $dataArray = array();
        $str = array();
        $stackMap = array();
        
        //Loop over reformulation methods for this query
        for($k=0;$k<count($methods);$k++){
            $queryFiles = array_slice(scandir($baseURL . "/" . $methods[$k]), 2);
            if($queryFiles[0]==".DS_Store"){
                $queryFiles = array_slice($queryFiles,1);
            }
            
            for($a=0; $a<count($queryFiles);$a++){
                if ( strpos($queryFiles[$a], '.csv') == true
                    && !((strpos($queryFiles[$a], 'CQ.prune') !== false)  && $prune == false)
                    && !((strpos($queryFiles[$a], 'CQ.db.prune') !== false)  && $pruneDB == false)
                    ) {
                
                    if(strpos($queryFiles[$a], 'ref.csv')){
                        //This is the orginal reformulation file results without pruning at all 
                    }
                    $fSys = fopen($baseURL . "/" . $methods[$k]."/" .$queryFiles[$a], "r");
                    fgetcsv($fSys);
                    
                    $prunedQuery = "";
                    
                    if ((strpos($queryFiles[$a], 'CQ.db.prune') !== false)) {
                        $prunedQuery = "_pDB";
                        $stackMap["_pDB"] =2;
                    }else if((strpos($queryFiles[$a], 'CQ.prune') !== false)){
                        
                        $prunedQuery = "_pS";
                        $stackMap["_pS"] =3;
                    }else{
                        $prunedQuery = "_no";
                        $stackMap["_no"] =1;
                    }
                    
                    $currentQueryData = array();
                    if (($l = fgetcsv($fSys)) !== false ) {

                       
                        $dataArray[$methods[$k].$prunedQuery] = array();
                        $dataArray[$methods[$k].$prunedQuery]["name"] = $queries[0];
                        $currentQueryData["count"] =1;
                        $currentQueryData[0] = $l[1];
                        $currentQueryData[1] = $l[2];
                        $currentQueryData[2] = $l[3];
                        $currentQueryData[3] = $l[4];
                        $currentQueryData[4] = $l[5];
                        $currentQueryData[5] = $l[6];
                        $currentQueryData[6] = $l[7];
                        
                    }
                    while (($l = fgetcsv($fSys)) !== false) {
                        $currentQueryData[0] += $l[1];//EXEC_TIME
                        $currentQueryData[1] += $l[2];//NANS
                        $currentQueryData[2] += $l[3];//NREF
                        $currentQueryData[3] += $l[4];//TREF
                        $currentQueryData[4] += $l[5];//NPRUN
                        $currentQueryData[5] += $l[6];//TPRUN
                        $currentQueryData[6] += $l[7];//total
                        $currentQueryData["count"]++;//count the number of repetitions (typically 5)
                    }
                    // finished treating query
                    $count_value = $currentQueryData["count"];
                    $dataArray[$methods[$k].$prunedQuery]["NANS"] = $currentQueryData[1]/$count_value;
                    $numberOfAnswers = $currentQueryData[1]/$count_value;
                    
                    $dataArray[$methods[$k].$prunedQuery]["TOTAL"] = $currentQueryData[6]/$count_value;
                    $dataArray[$methods[$k].$prunedQuery]["TREF"] = $currentQueryData[3]/$count_value;//Temps de reformulation
                    $dataArray[$methods[$k].$prunedQuery]["TPRUN"] = $currentQueryData[5]/$count_value;
                    $dataArray[$methods[$k].$prunedQuery]["TEXEC"] = $currentQueryData[0]/$count_value;
                    $dataArray[$methods[$k].$prunedQuery]["NREF"] = $currentQueryData[2]/$count_value;
                    $dataArray[$methods[$k].$prunedQuery]["NPRUN"] = $currentQueryData[4]/$count_value;
                    
                    
                    
                    fclose($fSys);
                    
                
                
                    }
                
                
                
            }
            
            
        }
        
        $temp = array();
        $count = 0;
        $numberOfAnswers = 0;
        
        foreach($dataArray as $key => $value) {
            
            $str[$count] = array("nom" => $aboxes[0]." -- ".$value["name"]. " \n Number of answers: " .$value["NANS"]);
            $methodVal = (substr($key,0, strpos($key, " (pruned)")));
            
            $numberOfAnswers = $value["NANS"];
            
            if($methodVal!= "NANS"){
                $temp[$key]["TREF"]["data"][] = $value["TREF"];
                
                if($prune  && (strpos($key, '_pS') == true)){
                    $temp[$key]["TPRUN"]["data"][] = $value["TPRUN"];
                    $temp[$key]["TPRUN"]["tooltip"] = "Number of sub-CQs: ".$value["NREF"]." \n"."Number of sub-CQs after optimization using Summary: ".$value["NPRUN"];
                }else if($pruneDB  && (strpos($key, '_pDB') == true)){
                    $temp[$key]["TPRUN"]["data"][] = $value["TPRUN"];
                    $temp[$key]["TPRUN"]["tooltip"] = "Number of sub-CQs: ".$value["NREF"]." \n"."Number of sub-CQs after optimization using Original Database: ".$value["NPRUN"];
                }else{
                    
                }
                
                $temp[$key]["TEXEC"]["data"][] = $value["TEXEC"];
                $str[$count][$key][] = $value["TOTAL"]. "," . $value["TREF"]. ", ".$value["TPRUN"]. ", ".$value["TEXEC"];
                
                if ($value["TOTAL"] > $max) { $max = $value["TOTAL"]; }
                
            }
            $count++;
            
        }
        
        $stackCount = 0;
        $countColor = 0;
        $orderCount = 0;
        
        foreach($temp as $key => $value) {
            
            if($key!="NANS"){
                $tempData = array();
                
                $keyPrefix = substr($key,0, strpos($key, "_"));
                $keySuffix = substr($key,strpos($key, "_"));
                
                
                
                foreach($value as $key1 => $value1) {
                    
                    $arrayIndex = $key1.$keySuffix;
                    
                    if($keySuffix == "_pS"){
                        $tempData["label"] =   $key1. " (optimized with S)";
                        
                    }else if($keySuffix == "_pDB"){
                        $tempData["label"] =   $key1. " (optimized with DB)";
                    }else{
                        $tempData["label"] =   $key1;
                    }
                    
                    
                    
                    
                    if(!isset($dataArrayNew["datasets"][$arrayIndex])){
                        $dataArrayNew["datasets"][$arrayIndex] = array();
                    }
                    
                    $tempLabel = $tempData["label"]; //$arrayIndex;
                    $tempLabel = str_replace("TEXEC", "TEVAL", $tempLabel);
                    $tempLabel = str_replace("TPRUN", "TOPTIM", $tempLabel);
                    
                    
                    $dataArrayNew["datasets"][$arrayIndex]["label"] = $tempLabel;
                    $dataArrayNew["datasets"][$arrayIndex]["backgroundColor"] = $colorMap[$arrayIndex];// $colors[$countColor%(count($colors))];
                    $dataArrayNew["datasets"][$arrayIndex]["data"][] = $value1["data"];
                    $dataArrayNew["datasets"][$arrayIndex]["stack"] = "Stack ". ($stackMap[$keySuffix]);
                    
                    
                    $orderCount++;
                    $dataArrayNew["tooltipData"] = array();
                    if(isset($value1["tooltip"])){
                        $dataArrayNew["tooltipData"][$tempLabel] = "". $value1["tooltip"];
                    }
                    
                    $countColor++;
                    
                }
                $stackCount++;
            }
        }
        
        
        $dataArrayNew2 = array();
        $dataArrayNew3 = array();
        
        $dataArrayNew2["NANS"] = $numberOfAnswers;
        $dataArrayNew3["NANS"] = $numberOfAnswers;
        //print_r($numberOfAnswers);
        if($numberOfAnswers == false){
            $dataArrayNew2["NANS"] = 0;
        }
        
        $dataArrayNew2["labels"] =  $methods;//$dataArrayNew["labels"];
        $dataArrayNew2["datasets"] = array();
        $dataArrayNew2["tooltipData"] = $dataArrayNew["tooltipData"];
        
        $dataArrayNew3["labels"] =  $methods;//$dataArrayNew["labels"];
        $dataArrayNew3["datasets"] = array();
        $dataArrayNew3["tooltipData"] = $dataArrayNew["tooltipData"];
        
        foreach($dataArrayNew["datasets"] as $key => $value) {
            
            $dataArrayNew2["datasets"][$indexMap[$value["label"]]]["label"] = $value["label"];
            $dataArrayNew2["datasets"][$indexMap[$value["label"]]]["backgroundColor"] = $value["backgroundColor"];
            $dataArrayNew2["datasets"][$indexMap[$value["label"]]]["stack"] = $value["stack"];
            
            // 	    print_r($value["data"]);
            foreach($value["data"] as $key2 => $value2) {
                $dataArrayNew2["datasets"][$indexMap[$value["label"]]]["data"][] = $value2[0];
            }
            
            
        }
        $index = 0;
        foreach($dataArrayNew2["datasets"] as $key => $value) {
            $dataArrayNew3["datasets"][$index]["label"] = $dataArrayNew2["datasets"][$index]["label"];
            $dataArrayNew3["datasets"][$index]["backgroundColor"] = $dataArrayNew2["datasets"][$index]["backgroundColor"];
            $dataArrayNew3["datasets"][$index]["stack"] = $dataArrayNew2["datasets"][$index]["stack"];
            $dataArrayNew3["datasets"][$index]["data"] = $dataArrayNew2["datasets"][$index]["data"];
            $index++;
        }
        
        // On envoie le maximum obtenu et les données
        $send = array (
            "d" => $str,
            "max" => $max,
            "temp" => $temp,
            "test" => $dataArrayNew2,
            "chartjs" => $dataArrayNew3
        );
        
        if (!empty($str)){
            $finalArray[$dbms[$ww]] = array (
                "d" => $str,
                "max" => $max,
                "temp" => $temp,
                "test" => $dataArrayNew2,
                "chartjs" => $dataArrayNew3
            );
            
        }
        
        
    }
    
    
}

//}
	// Forme :
	/*
	
	{
	d: [
	// Un élément de ce tableau correspond aux données correspondant à une requête
	{
	cbqa: [
	// Un élément de ce tableau correspond aux données correspondant à une base pour le système cbqa
	"tempsTotalBase1,nomBase1,tempsEtape1Base1,tempsEtape2Base1",
	"tempsTotalBase2,nomBase2,tempsEtape1Base2,tempsEtape2Base2",
	...
	],
	combo: [
	// idem 5 lignes au dessus
	]
	},
	{
	cbqa: ,
	combo:
	},
	...
	],
	max: max
	}
	
	*/
	header("Content-Type: application/json");
	header("Pragma: no-cache");
	header("ExpiresDependant: 0");
	echo json_encode($finalArray);
	?>
	