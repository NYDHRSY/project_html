<?php
    //前端向服务器发送发布留言的请求 服务器将数据入数据库
    header('Content-Type: text/html; charset=UTF-8');
    $name=$_POST['name'];
    $uid=$_POST['uid'];
    $psw=$_POST['psw'];
    $type=$_POST['type'];



    /*get head file and insert*/

    /*mkdir*/
    $path="../assets/img/head/";
    if (!is_dir($path))//判断目录是否存在
    {
        $res=mkdir(iconv("UTF-8", "GBK", $path),0777,true); 
        if ($res){
            // echo "目录 $path 创建成功";
        }
        else
        {
            echo "目录 $path 创建失败";
        }
    }
    /*get file*/
    // $file = $_FILES["head"];
    // $file_name = $path . "" . $uid . ".png";
    // move_uploaded_file($file['tmp_name'],$file_name);
    $file_name;
    if(!empty($_FILES["head"])){
        $file = $_FILES["head"];
        $file_name = $path . "" . $uid . ".png";
        move_uploaded_file($file['tmp_name'],$file_name);
    }
    else {
        $file_name = "../assets/img/head/default.png";
    }


    include_once "mysql.php"; 
    $sql = "INSERT INTO user (name, uid, psw, type, head) values ('{$name}', '{$uid}','{$psw}','{$type}','{$file_name}')";
    $result = $con->query($sql);
    $arr = array('status' =>$result);
    $json = json_encode($arr);
    echo $json;

?>