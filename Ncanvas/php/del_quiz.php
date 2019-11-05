<?php
header("Access-Control-Allow-Origin: *");
        header("ALLOW-CONTROL-ALLOW-ORIGIN:*");
    header("Content-Type:text/html;charset=utf-8");
    
    include_once 'mysql.php';
    $data = $_POST;
     
    $tid = $_GET["tid"];
   
    
    //$cid =300;
   // $cnt=1;
    $sql = "delete from test where tid=$tid";
    $result = $con->query($sql);
    $sql = "delete from question where tid=$tid";
    $result = $con->query($sql);
?>
