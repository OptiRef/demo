<?php

$strJsonFileContents = file_get_contents("../info.json");
$settings = json_decode($strJsonFileContents, true);

$dynamic = $_GET["d"];

if($dynamic==="true"){
    $mainDir = $settings["dynamic"]["mainDir"];
    $subDir = $settings["dynamic"]["mainSubDir"];
}else{
    $mainDir = $settings["static"]["mainDir"];
    $subDir = $settings["static"]["mainSubDir"];
}

if($mainDir == ""){
    $mainDir = "../";
}

$arrayCount = array();

$arrayCount["red"]=0;
$arrayCount["green"]=0;

$query = $_GET["q"];
$dataset = $_GET["dataset"];
$type = $_GET["pruned"];
$pruneDB = $_GET["pruneDB"];
$size = $_GET["size"];

$fileToRead = $mainDir.$subDir.$dataset."/Queries/Reformulations/UCQ/".$size."/" . $query.".txt";


$fSys = fopen($fileToRead,"r");
$dataArray = array();

$l = fgets($fSys);

$dataArray["name"] = $l;
$dataArray["nodeid"] = "U";
$dataArray["type"] = "root";
$dataArray["tooltip"] = "Query ".$_GET["q"];
$dataArray["children"] = array();
fgets($fSys);

    

    while (($l = fgetcsv($fSys,0,"^")) !== false) {

        
        $temp = array();
        
        $temp["name"] = $l[4];
        $temp["nodeid"] = $l[2];
        
        if($pruneDB && !$type && ($l[0]==0 ||$l[0]==1 || $l[0]==2 )){
            //if doing pruning on the DB, everything is pruned
            $temp["type"] = 1;
            
            $temp["tooltip"] = "Reformulated Query CQ".$l[2]."  (Empty query, eliminated by optimization on D)";
            $arrayCount["green"]++;
        }else if($type ==0 && ($l[0]==0 ||$l[0]==1 || $l[0]==2 )){
            //if No pruning
            //nothing is eliminated
            $temp["type"] = 2;
            
            $temp["tooltip"] = "Reformulated Query CQ".$l[2]."  (Empty query, should be eliminated)";
            $arrayCount["red"]++;
        }else{
            $temp["type"] = $l[0];
            
            if($type ==1 && ($l[0]==0 ||$l[0]==1)){
                //prune on S
                //Things pruned by the summary
                $temp["tooltip"] =  "Reformulated Query CQ".$l[2]." (Empty query, eliminated by optimization on S)";
                $arrayCount["green"]++;
            }else if($type ==1 && ($l[0]==2)){
                //prune on S
                //Things NOT pruned by the summary
                $temp["tooltip"] =  "Reformulated Query CQ".$l[2]." (Empty query, not eliminated by optimization)";
                $arrayCount["red"]++;
            }else{
                //CQ with answer 
                $temp["tooltip"] =  "Reformulated Query CQ".$l[2];
            }
            
        }
        
        
        $dataArray["children"][] = $temp;
        fgets($fSys);
    }
    
    
    //$querieBaseDirectory = "../queries/".$dataset."/";
    
    $queryDir = $mainDir.$subDir.$dataset."/Queries/Original/".$query.".queries";
    $queryStr ="";
    //echo $queryDir;
    if (file_exists($queryDir)) {
        $fSysQ = fopen($queryDir, "r");
        while (($l = fgets($fSysQ)) !== false) {
            
            if( str_contains($l, trim($query)."(")){
                    $queryStr = $l;
                
                    //echo $queryStr;
            }
        }
        
    }
    
//     $filesArr = array_slice(scandir($querieBaseDirectory), 2);
//     if($filesArr[0]==".DS_Store"){
//         $filesArr = array_slice($filesArr,1);
//     }
    
//     foreach ($filesArr as $item2) {
//         $fSysQ = fopen($querieBaseDirectory."/".$item2, "r");
//         while (($l = fgets($fSysQ)) !== false) {
            
//             if( str_contains($l, '(?')){
//                 $elements = explode("(?",$l);
//                 if(str_contains($elements[0],$query)){
//                     $queryStr = $l;
//                 }
                
//             }
//         }
        
//     }
    
    $cqCount = count($dataArray["children"]);
    $arrayCount["total"] = $cqCount;
    $send = array (
        "d" => $dataArray,
        "count" => $arrayCount,
        "query" =>$queryStr
    );

header("Content-Type: application/json");
header("Pragma: no-cache");
header("ExpiresDependant: 0");
echo json_encode($send);

?>