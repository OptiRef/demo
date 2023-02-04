<?php 

$strJsonFileContents = file_get_contents("info.json");
$settings = json_decode($strJsonFileContents, true);

$dynamic = $_POST["d"];

if($dynamic==="true"){
    $mainDir = $settings["dynamic"]["mainDir"];
    $mainSubDir = $settings["dynamic"]["mainSubDir"];
    $jarFile= $settings["dynamic"]["query"]["jarFile"];
    $queryPropName = $settings["dynamic"]["propFileName"];



$bench = strtoupper(trim($_POST["bench"]));
$datasetName = $_POST["dataset"];//lubm150
$datasetSize = $_POST["datasize"];//1MT
$dbms = explode(",", strtoupper($_POST["dbms"]));

$qname = trim($_POST["qname"]);//qTest1
$qprefix = $_POST["qprefix"];
$qbody = $_POST["qbody"];

$subDir = $mainSubDir.$bench."/";

$queryProp = $mainDir.$queryPropName;
$newQueryFile = $mainDir."".$subDir."/Queries/Original/".$qname.".queries";


$qbody = str_replace(substr($qbody,0,strpos($qbody,"(")),$qname,$qbody);


$myFile = fopen($newQueryFile,"w") or die("Unable to open file!");

fwrite($myFile, "PREFIX ".$qprefix."\n\n");
fwrite($myFile, $qbody);

fclose($myFile);

$reformulationMethods = array("UCQ", "USCQ", "JUCQ");

for($k=0;$k<count($dbms);$k++){
    
    $path = $mainDir."".$subDir."DBMS/".$dbms[$k]."/".$datasetSize."/Queries/".$qname."/UCQ";
    if (!file_exists($path)) {
        mkdir($path, 0777, true);
    }
    $path = $mainDir."".$subDir."DBMS/".$dbms[$k]."/".$datasetSize."/Queries/".$qname."/USCQ";
    if (!file_exists($path)) {
        mkdir($path, 0777, true);
    }
    $path = $mainDir."".$subDir."DBMS/".$dbms[$k]."/".$datasetSize."/Queries/".$qname."/JUCQ";
    if (!file_exists($path)) {
        mkdir($path, 0777, true);
    }
    
    echo 'Staring Ececution for dbms:'.$dbms[$k];
    echo '<br><br>';
    echo 'java -Xmx100G -jar '.$jarFile.' '.$queryProp.'  '.$datasetName.' '.$datasetSize.' '.$dbms[$k].' ALL '.$newQueryFile.' 2>&1';
    echo '<br><br>';
    $result=null;
    for($i=0;$i<count($reformulationMethods);$i++){
        $output = exec('java -Xmx100G -jar '.$jarFile.' '.$queryProp.'  '.$datasetName.' '.$datasetSize.' '.$dbms[$k].' '.$reformulationMethods[$i].' '.$newQueryFile.' 2>&1', $result);
        
        
        
        echo '<br><br>';
        echo "<pre>$output</pre>";
        echo '<br>';
        print_r( $result);
    }
    
    
    
    echo '<br><br>';
    
    echo 'Finished Ececution for dbms:'.$dbms[$k];
    echo '<br><br>';
    echo '<br><br>';
}
}


?>