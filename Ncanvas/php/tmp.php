<?php
	$cid =$_GET["cid"];
	$uid =$_GET["uid"];
	include_once "mysql.php"; 
    	$sql = "SELECT * from test where cid=$cid and uid=$uid";
	$result = $con->query($sql);
	/*
	前端传过来cid
	数据库根据cid找 markdown文件的url
	*/
    
    $arr=[];
    while($row=mysqli_fetch_assoc($result)){
        $arr[]=$row;
    }
    $json = json_encode($arr);
    echo $json;

?>
