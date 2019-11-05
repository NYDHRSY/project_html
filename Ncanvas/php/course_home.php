<?php
	$cid =$_GET["cid"];
	include_once "mysql.php"; 
    	$sql = "SELECT home_url from class where cid=$cid";
	$result = $con->query($sql);
	/*
	前端传过来cid
	数据库根据cid找 markdown文件的url
	*/
        $url_link;
	while($row=mysqli_fetch_assoc($result)){
		$url_link=$row;

	 }  
	 $json = json_encode($url_link);
	// $student = $_GET['syllabus']; 
	 echo $url_link['home_url'];
	
?>
