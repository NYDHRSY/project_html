<?php
header("Access-Control-Allow-Origin: *");
        header("ALLOW-CONTROL-ALLOW-ORIGIN:*");
    header("Content-Type:text/html;charset=utf-8");
    
    include_once 'mysql.php';
   // $data = $_POST;
     
    $cid = $_GET["cid"];
   
    
    //$cid =300;
   // $cnt=1;

    $sql = "delete from class where cid=$cid";
    $result = $con->query($sql);
    $sql = "delete from test where cid=$cid";
    $result = $con->query($sql); 
    $sql = "delete from question where cid=$cid";
    $result = $con->query($sql);
?>
