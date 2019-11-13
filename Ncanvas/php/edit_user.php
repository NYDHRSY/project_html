<?php
    header('Content-Type: text/html; charset=UTF-8');
    $name=$_POST['name'];
    $uid=$_POST['uid'];
    $psw=$_POST['psw'];
    $type=$_POST['type'];

    // $name=$_GET['name'];
    // $uid=$_GET['uid'];
    // $psw=$_GET['psw'];
    // $type=$_GET['type'];
    // 测试：uid=21161626&name=Alex&psw=1234&type=2


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
    $sql = "UPDATE user SET name='$name', psw='$psw', head='$file_name' WHERE uid=$uid";
    $result = $con->query($sql);
    $arr = array('status' =>$result);
    $json = json_encode($arr);
    echo $json;
?>
