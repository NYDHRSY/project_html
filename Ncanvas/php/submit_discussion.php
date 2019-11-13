<?php
    //前端向服务器发送发布留言的请求 服务器将数据入数据库
    header('Content-Type: text/html; charset=UTF-8');
    $uid=$_POST['uid'];
    $cid=$_POST['cid'];
    $content=$_POST['content'];

    include_once "mysql.php"; 

    date_default_timezone_set('PRC');

    $timestamp = time();
    $time=date('Y-m-d H:i:s' , $timestamp);
    $sql = "SELECT name, head FROM user WHERE uid = $uid ";//user表中找name
    $result = $con->query($sql);
    $row=mysqli_fetch_assoc($result);
    $name=$row['name'];
    $head=$row['head'];
    $sql = "INSERT INTO discussion (uid, cid, head, time, name, content) values ('{$uid}', '{$cid}','{$head}','{$time}','{$name}','{$content}')";
    $result = $con->query($sql);
    $arr = array('status' =>$result);

    $json = json_encode($arr);

    echo $json;
?>