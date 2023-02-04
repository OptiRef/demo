<?php
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
    
    //$baseDirectory = "";
    $benchmark = $_GET["benchmark"];
    $query = $_GET["q"];
    
    $finalURL = $mainDir.$subDir.$benchmark."/Queries/Original/".trim($query).".queries";
    //$fSys = fopen
    $content = file_get_contents($finalURL);
    //return readfile($finalURL);
    
    $lines = explode("\n", $content);
    $qText = implode("\n", array_slice($lines, 2));
    
    $send = array(
        "query" => $qText
        //"queryMap" => $queryMap
        
    );
    
    
    
    header("Content-Type: application/json");
    header("Pragma: no-cache");
    header("Expires: 0");
    echo json_encode($send);
    
//    file_get_contents($finalURL);
    
 ?>