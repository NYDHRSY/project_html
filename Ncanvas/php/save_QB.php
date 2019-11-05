<?php 
header("Access-Control-Allow-Origin: *");
header("ALLOW-CONTROL-ALLOW-ORIGIN:*");	
header("ALLOW-CONTROL-ALLOW-ORIGIN:*");
header('Access-Control-allow-credentials:true');
header("Content-Type:text/html;charset=utf-8");
header("Access-Control-allow-methonds:POST,GET");
header("Content-Type:text/html;charset=utf-8");

/*
$home = $_FILES["home"];//接收 主页文件
$ = $_FILES["home"];//接收 主页文件
$file = $_FILES["home"];//接收 主页文件
*/


	/*
	学生提交主观题答案
	上传uid cid tid
	和一个文件 保存按原文件格式保存
	*/
	
	//md_path 保存的是存markdown的路径 以 / 结尾
	//$tid=123;

	$cid = $_POST["cid"];
	$uid = $_POST["uid"];
	$tid = $_POST["tid"];
	$path="../test/";
	$path2=$path ."".$tid;
	$md_path = $path2."/";//服务器路径设定
	echo $md_path;
	//$md_path = "/opt/lampp/htdocs/phptest/markdown/ ";// 本地的路径
    //判断目录存在否，存在给出提示，不存在则创建目录
    
	 if ( ! is_dir($md_path) )//判断目录是否存在
	 {
         	$res=mkdir(iconv("UTF-8", "GBK", $md_path),0777,true); 
		 if ($res){
		    //echo "目录 $path 创建成功";
		 }
		 else
		 {
            		echo "目录 $path 创建失败";
    		 }
    	}
	$file = $_FILES["ans"];
	$type = $file['tmp_name'];
	$file_name = $md_path . "" . $uid. "-" . $tid . "-" . ".txt" ;
	move_uploaded_file($file['tmp_name'],$file_name);//上传主页文件
	
	$ans_path = $file_name;//答案文件路径 保存值数据库
	echo $ans_path;

//move_uploaded_file($file['tmp_name'],$path);//上传文件
//echo $_POST["tid"];
//echo $path;
?>
