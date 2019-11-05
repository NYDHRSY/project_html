<?php

	
	header("Access-Control-Allow-Origin: *");
        header("ALLOW-CONTROL-ALLOW-ORIGIN:*");
	include_once "mysql.php";
	
	
	$uid =$_GET["uid"];
	$data=date("Y/m/d");
	$sql = "SELECT * from test where uid=$uid and deadline>=$data";
	//echo $uid;

	$result = $con->query($sql);
  	$arr=[];
	$score_gained=0;
	$i = 0;
	$calender_list = array();
    	while($row=mysqli_fetch_assoc($result)){//遍历每门课
		$arr[]=$row;

	}
	
	echo json_encode($arr);
?>
