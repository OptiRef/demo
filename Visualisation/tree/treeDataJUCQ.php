<?php

header("Content-Type: application/json");
header("Pragma: no-cache");
header("ExpiresDependant: 0");


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
$dataset = $_GET["dataset"];
$query = $_GET["q"];
$type = $_GET["pruned"];
$pruneDB = $_GET["pruneDB"];
$size = $_GET["size"];
$arrayCount["red"]=0;
$arrayCount["green"]=0;

$fileToRead = $mainDir.$subDir.$dataset."/Queries/Reformulations/USCQ/".$size."/"  . $query.".txt";
$fSys = fopen($fileToRead,"r");

$l = fgetcsv($fSys,0,"^");


$tempDataArray = array(); 
$tempDataArray[$l[2]] = $l; 


fgets($fSys);

$countCQ = 0;

while (($l = fgetcsv($fSys,0,"^")) !== false) {
    
    $tempDataArray[$l[2]][] = $l; 
    $countCQ++;
    fgets($fSys);
}



echo "{ \"d\":";
echo "{ \n";
echo "\"name\" : \"root\", ";
echo "\"text\" : \"⋈\",";
echo "\"style\" : \"root\", ";
echo "\"type\" : \"root\", ";
echo "\"tooltip\" : \"Query ".$_GET["q"]."\", ";
echo "\"count\" : \"$countCQ\", ";
echo "\"children\" : [ ";
$countMain = 0;
foreach($tempDataArray as $key=>$value){
    
    if($key!="origin" && $key!="main"){
            echo "{ \n";
            
            if(sizeof($value)>1){
            
                echo "\"name\" : \"UNION\", ";
                echo "\"text\" : \"U\",";
                echo "\"style\" : \"circleRoot\", ";
                echo "\"type\" : \"root\", ";
                echo "\"tooltip\" : \"Union ".$key."\", ";
                echo "\"children\" : [ ";
            }else{
                echo "\"name\" : \"\", ";
                echo "\"text\" : \"\",";
                echo "\"style\" : \"circleTransparent\", ";
                echo "\"type\" : \"circleTransparent\", ";
                echo "\"tooltip\" : \" \", ";
                echo "\"children\" : [ ";
                
            }
            $count = 0;
            foreach($value as $key1=>$value1){
                $count++;
                echo "{ \n";
                echo "\"name\" : \"$value1[6]\", ";
                echo "\"text\" : \"CQ$value1[4]\",";
                if($pruneDB && !$type && ($value1[0]==0 ||$value1[0]==1 ||$value1[0]==2)){
                    echo "\"style\" : \"circle1\", ";
                    echo "\"tooltip\" : \"Reformulated Query CQ".$key1." (empty query, eliminated by optimization on D)\", ";
                    $arrayCount["green"]++;
                    echo "\"type\" : \"1\" ";
                } else
                if($type ==0 && ($value1[0]==0 ||$value1[0]==1 ||$value1[0]==2)){
                    echo "\"style\" : \"circle2\", ";
                    
                    $arrayCount["red"]++;
                    echo "\"tooltip\" : \"Reformulated Query CQ".$value1[4]." (Empty query, should be eliminated)\", ";
                    echo "\"type\" : \"2\" ";
                }else{
                    echo "\"style\" : \"circle$value1[0]\", ";
                    if($type ==1 && ($value1[0]==0 ||$value1[0]==1)){
                        echo "\"tooltip\" : \"Reformulated Query CQ".$value1[4]." (Empty query, eliminated by optimization on S) \", ";
                        $arrayCount["green"]++;
                    }else if($type ==1 && ($value1[0]==2)){
                        echo "\"tooltip\" : \"Reformulated Query CQ".$value1[4]."  (Empty query, not eliminated by optimization) \", ";
                        $arrayCount["red"]++;
                    }else{
                        echo "\"tooltip\" : \"Reformulated Query CQ".$value1[4]." \", ";
                    }
                    
                    
                    echo "\"type\" : \"$value1[0]\" ";
                    
                }
                
                echo "}";
                if($count!= sizeof($value)){
                    echo ",";
                }
                
            }
            
        echo "]";
        echo "}";
        $countMain++;
        if($countMain!= (sizeof($tempDataArray)-1)){
                    echo ",";
                }
        
        
    }
}

echo "]";
echo "}";

//Start count
echo ",";
echo "\"count\" : { ";
echo "\"red\" : ".$arrayCount["red"].",";
echo "\"green\" : ".$arrayCount["green"].",";
echo "\"total\" : ".$countCQ."";
echo "} ";
//End count



$queryDir = $mainDir.$subDir.$dataset."/Queries/Original/".$query.".queries";
$queryStr ="";

if (file_exists($queryDir)) {
    $fSysQ = fopen($queryDir, "r");
    while (($l = fgets($fSysQ)) !== false) {
        
        if( str_contains($l, trim($query)."(")){
            $queryStr = $l;
            
            
        }
    }
    
}
//Start queryStr
echo ",";
echo "\"query\" :  \"".str_replace("\"","\\\"",trim($queryStr))."\"";
//End count





echo "}";



//echo ($dataObj);

?>