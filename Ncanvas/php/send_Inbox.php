<?php
    //前端向服务器发送发布站内消息的请求 服务器将数据入数据库
    header('Content-Type: text/html; charset=UTF-8');
    $uid_ano=$_POST['uid_ano'];//收件人
    $uid=$_POST['uid'];//发件人
    $head=$_POST['head'];
    $title=$_POST['title'];
    $content=$_POST['content'];

    include_once "mysql.php"; 
    date_default_timezone_set('PRC');
    
    $timestamp = time();
    $time=date('Y-m-d H:i:s' , $timestamp);
    $sql = "SELECT name FROM user WHERE uid = $uid ";//user表中找发件人的name
    $result = $con->query($sql);
    $arr=[];
    $row=mysqli_fetch_assoc($result);
    $name=$row['name'];
    $sql = "INSERT INTO inbox (uid_ano, uid, time, name, head, title, content) values ('{$uid_ano}', '{$uid}', '{$time}','{$name}','{$head}', '{$title}','{$content}')";
    $result = $con->query($sql);
    $arr = array('status' =>$result);
    $json = json_encode($arr);
    echo $json;
?>