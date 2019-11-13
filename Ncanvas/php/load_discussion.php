<?php
    //前端向服务器发送查看讨论区内容的请求 服务器返回讨论区信息
    $cid =$_POST["cid"];
    header("Content-Type:text/html;charset=utf-8");
    include_once "mysql.php"; 
    $sql = "SELECT * from discussion WHERE cid = $cid";
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