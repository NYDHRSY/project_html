<?php 
header("Access-Control-Allow-Origin: *");
header("ALLOW-CONTROL-ALLOW-ORIGIN:*");	
header("ALLOW-CONTROL-ALLOW-ORIGIN:*");
header('Access-Control-allow-credentials:true');
header("Content-Type:text/html;charset=utf-8");
header("Access-Control-allow-methonds:POST,GET");
header("Content-Type:text/html;charset=utf-8");
$file = $_FILES['mod'];//接收文件
$path = "/opt/lampp/htdocs/phptest/file/abc";
move_uploaded_file($file['tmp_name'],$path);//上传文件
echo $_POST["tid"];

?>


$file = $_FILES['file'];//接收文件
$file = $_FILES['file'];//接收文件
$file = $_FILES['file'];//接收文件

