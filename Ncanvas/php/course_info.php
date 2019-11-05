<?php
    //前端向服务器发送查看课程信息的请求 服务器返回课程信息
    $cid =$_GET["cid"];
    header("Content-Type:text/html;charset=utf-8");
    include_once "mysql.php"; 
    $sql = "SELECT * from class where cid=$cid";
    $result = $con->query($sql);
    $arr=[];
    while($row=mysqli_fetch_assoc($result)){
        $arr[]=$row;

    }
    
    $json = json_encode($arr);
   

    echo $json;
    mysqli_free_result($result);
    mysqli_close($con);
	
?>
