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

    //$baseDirectory = "data";
    $baseDirectory = $mainDir.$subDir;

	// Récupération des paramètresDependant GET
    $benchmark = explode(",", $_GET["benchmark"]);
    $dbms = explode(",", $_GET["dbms"]);
    $aboxes = explode(",", $_GET["aboxes"]);
    
    $dataToRetain = ["Initial data base tuples", "Summary tuples", "Compression ration", "Time to create the summary", "Compression ratio"];
    
    
    $dataArray = array();
    
    
    $baseURL = $baseDirectory.$benchmark[0]."/DBMS/".$dbms[0]."/".$aboxes[0]."/Stats/";

        $statsFiles = array_slice(scandir($baseURL), 2);
        
        if($statsFiles[0]==".DS_Store"){
            $statsFiles = array_slice($statsFiles,1);
        }
        for($j=0;$j<count($statsFiles);$j++){
            $fSys = fopen($baseURL.$statsFiles[$j], "r");
            while (($l = fgets($fSys)) !== false) {
                $elements = explode(":",$l);
                if(in_array($elements[0], $dataToRetain)){
                    $dataArray[$elements[0]][] = $elements[0];
                    $dataArray[$elements[0]][] = $elements[1];
                }
            }
        }
         
        
    $dataArrayNew = array();
    foreach($dataArray as $key => $value) {
        $dataArrayNew[] = $value;
    }
    
    $send = array (
        "data" => $dataArrayNew,
        "dbms" => $dbms[0]
    );
    header("Content-Type: application/json");
    header("Pragma: no-cache");
    header("ExpiresDependant: 0");
    echo json_encode($send);
?>