<?php
    //前端向服务器发送发布留言的请求 服务器将数据入数据库
    header('Content-Type: text/html; charset=UTF-8');
    $uid=$_POST['uid'];
    $psw=$_POST['psw'];
    // $uid=$_GET['uid'];
    // $psw=$_GET['psw'];
    include_once "mysql.php"; 
    $sql = "SELECT type, name, head FROM user WHERE uid = '$uid' and psw = '$psw'";
    $result = $con->query($sql);
    $arr=[];

    $flag=1;
    while($row=mysqli_fetch_assoc($result)){
        //print_r($row);
        $arr[]=$row;
        $arr[0]['status'] = true;
        $flag=0;    
    }
    if($flag==1){
        $arr[0]['status'] = false;
    }

    // while($row=mysqli_fetch_assoc($result)){
    //     //print_r($row);
    //     $arr[]=$row;
    //     $arr[0]['status'] = 0;
    // }
    // print_r($arr);
    
    $json = json_encode($arr[0]);
    echo $json;
?>
