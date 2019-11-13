<?php
    //前端向服务器发送发布留言的请求 服务器将数据入数据库
    header('Content-Type: text/html; charset=UTF-8');
    // $uid=$_POST['uid'];
    $uid=$_POST['uid'];
    // $uid='21161626';

    include_once "mysql.php"; 
    $sql = "DELETE FROM user WHERE uid = $uid ";
    $result = $con->query($sql);
    $arr = array('status' =>$result);
    $json = json_encode($arr);
    echo $json;

?>

