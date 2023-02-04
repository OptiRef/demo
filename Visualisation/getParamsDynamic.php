<?php
$strJsonFileContents = file_get_contents("info.json");
$settings = json_decode($strJsonFileContents, true);

$dynamic = $_GET["d"];

if ($dynamic === "true") {
    $mainDir = $settings["dynamic"]["mainDir"];
    $subDir = $settings["dynamic"]["mainSubDir"];
} else {
    $mainDir = $settings["static"]["mainDir"];
    $subDir = $settings["static"]["mainSubDir"];
}

$dataParams = array();

$dataParams["dbms"] = array();
$dataParams["benchmarks"] = array();
$dataParams["methods"] = array();

$bench = array_slice(scandir($mainDir . $subDir), 2);
if ($bench[0] == ".DS_Store") {
    $bench = array_slice($bench, 1);
}
$dataParams["benchmarks-data"] = array();
$dataParams["benchmarks"] = $bench;

foreach ($bench as $item) {
    $dataParams["benchmarks-data"][$item]["sizes"] = array();
    $dataParams["benchmarks-data"][$item]["queries"] = array();
    $finalURL = $mainDir . $subDir . $item . "/Info/Prefix/prefix.txt";
    if (file_exists($finalURL)) {
        $content = file_get_contents($finalURL);
        $dataParams["benchmarks-data"][$item]["prefix"] = trim(str_replace("PREFIX", "", str_replace("\n", "", $content)));
    }
    $finalURL = $mainDir . $subDir . $item . "/Info/Prefix/db_prefix.txt";
    if (file_exists($finalURL)) {
        $content = file_get_contents($finalURL);
        $dataParams["benchmarks-data"][$item]["db-prefix"] = trim(str_replace("PREFIX", "", str_replace("\n", "", $content)));
    }

    if (file_exists($mainDir . $subDir . "/" . $item . "/DBMS/")) {
        // Directory for DBMS
        $currentDir = array_slice(scandir($mainDir . $subDir . "/" . $item . "/DBMS/"), 2);
        if ($currentDir[0] == ".DS_Store") {
            $currentDir = array_slice($currentDir, 1);
        }

        // Checking the DBMS used for this benchmark.
        foreach ($currentDir as $dbms) {
            if (! in_array($dbms, $dataParams["dbms"])) {
                $dataParams["dbms"][] = $dbms;
            }

            // Directory for Aboxes for each DBMS
            if (file_exists($mainDir . $subDir . "/" . $item . "/DBMS/" . $dbms . "/")) {

                $currentDirAbox = array_slice(scandir($mainDir . $subDir . "/" . $item . "/DBMS/" . $dbms . "/"), 2);
                // print_r ($currentDirAbox);
                if (count($currentDirAbox) > 0 && $currentDirAbox[0] == ".DS_Store") {
                    $currentDirAbox = array_slice($currentDirAbox, 1);
                }

                // Looping over the ABoxes
                foreach ($currentDirAbox as $abox) {
                    if (! in_array($abox, $dataParams["benchmarks-data"][$item]["sizes"]) && ! (substr($abox, 0, 1) === "_")) {
                        $dataParams["benchmarks-data"][$item]["sizes"][] = $abox;
                    }

                    // Looping over the queries
                    if (file_exists($mainDir . $subDir . "/" . $item . "/DBMS/" . $dbms . "/" . $abox . "/Queries/")){
                    $currentDirQueries = array_slice(scandir($mainDir . $subDir . "/" . $item . "/DBMS/" . $dbms . "/" . $abox . "/Queries/"), 2);
                    if (count($currentDirQueries) > 0) {
                        if ($currentDirQueries[0] == ".DS_Store") {
                            $currentDirQueries = array_slice($currentDirQueries, 1);
                        }
                        foreach ($currentDirQueries as $q) {
                            if(!str_starts_with($q,"_")){
                                
                            
                                if (! in_array($q, $dataParams["benchmarks-data"][$item]["queries"])) {
                                    $dataParams["benchmarks-data"][$item]["queries"][] = $q;
                                    $dataParams["benchmarks-data"][$item]["queries-for-size"][$abox][] = $q;
                                }
    
                                // Looping over Methods
                                $currentDirMethods = array_slice(scandir($mainDir . $subDir . "/" . $item . "/DBMS/" . $dbms . "/" . $abox . "/Queries/" . $q . "/"), 2);
                                if ($currentDirMethods[0] == ".DS_Store") {
                                    $currentDirMethods = array_slice($currentDirMethods, 1);
                                }
    
                                if (in_array("UCQ", $currentDirMethods) && ! in_array("UCQ", $dataParams["methods"])) {
                                    $dataParams["methods"][] = "UCQ";
                                }
                                if (in_array("USCQ", $currentDirMethods) && ! in_array("USCQ", $dataParams["methods"])) {
                                    $dataParams["methods"][] = "USCQ";
                                }
                                if (in_array("JUCQ", $currentDirMethods) && ! in_array("JUCQ", $dataParams["methods"])) {
                                    $dataParams["methods"][] = "JUCQ";
                                }
    
                                foreach ($currentDirMethods as $method) {
                                    if (! in_array($method, $dataParams["methods"])) {
                                        $dataParams["methods"][] = $method;
                                    }
                                }
                            
                        }
                        }
                    }
                }
                }
            }
        }
    }
}

$send = array(
    "dataParams" => $dataParams
);

header("Content-Type: application/json");
header("Pragma: no-cache");
header("Expires: 0");
echo json_encode($send);

?>