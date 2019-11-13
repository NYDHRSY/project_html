<?php
    //前端向服务器发送查看站内消息内容的请求 服务器返回站内信息内容
    $uid =$_POST["uid"];
    header("Content-Type:text/html;charset=utf-8");
    include_once "mysql.php"; 
    $sql = "SELECT * from inbox WHERE uid_ano = $uid";
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