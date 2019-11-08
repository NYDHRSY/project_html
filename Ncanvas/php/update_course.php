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
	上传cid 和三个md文件
	*/
	//md_path 保存的是存markdown的路径 以 / 结尾
	$md_path = "../markdown/";//服务器路径设定
	$cid = $_POST["cid"];

	
	//$md_path = "/opt/lampp/htdocs/phptest/markdown/ ";// 本地的路径
    //判断目录存在否，存在给出提示，不存在则创建目录
    
	include_once 'mysql.php';
	 if ( ! is_dir($md_path) )//判断目录是否存在
	 {  
         $res=mkdir(iconv("UTF-8", "GBK", $md_path),0777,true); 
         if ($res){
 //            echo "目录 $path 创建成功";
         }
	 	else
		{
 //            echo "目录 $path 创建失败";
         }
    	 }
	$file_name = $md_path . "" . $cid. "home" . "" . ".md";
	move_uploaded_file($_FILES["home"]['tmp_name'],$file_name);//上传主页文件
	$home_path = $file_name;
	
	$file_name = $md_path . "" . $cid. "syl"  . "" . ".md";
	move_uploaded_file($_FILES["syl"]['tmp_name'],$file_name);//上传syl文件
	$syl_path = $file_name;
	
	$file_name = $md_path . "" . $cid. "mod"  . "" . ".md";
	move_uploaded_file($_FILES["mod"]['tmp_name'],$file_name);//上传module文件
	$mod_path = $file_name;
	
	$file_name = $md_path . "" . $cid. "cov"  . "" . ".jpg";
	move_uploaded_file($_FILES["cover"]['tmp_name'],$file_name);//上传module文件
	$cov_path = $file_name;
	//$cov_path="123";
	//以下是各文件路径
	echo $home_path;
	echo $syl_path;
	echo $mod_path;
	echo $cov_path;

	
	$ctitle = $_POST["ctitle"];
	//$ctitle="P.E";
	$start=1;
	$end=$_POST["weeks"];
	$did=0;
	$uid=$_POST["uid"];	
	//$uid = $_POST["uid"];
	$d=$_POST["days"];
	echo "days:";
	echo $d;
		;
	$hello=explode(',',$d);
	$e =count($hello);
	
	echo $e	;
	$ctext="this is ". $ctitle;
$sql = "delete from class where cid=$cid";
 $sql = "delete from class where cid=$cid";
$result = $con->query($sql);
	for($i=0;$i<count($hello);$i++){
	//for($i=0;$i<0;$i++){
		$sql2 = "insert into class (cid,weekdays,ctitle,start,end,cover_url,home_url,syllabus_url, modles_url,did,uid,day,ctext) values (".$cid.",'".$d."','".$ctitle."',".$start.",".$end.",'".$cov_path."','".$home_path."','".$syl_path."','".$mod_path."',".$did.",'".$uid."',".$hello[$i].",'".$ctext."')";
		try{	
			$result2 = $con->query($sql2);
		}
		catch(PDOException $e){

		}
	}
	
	

	
	
//move_uploaded_file($file['tmp_name'],$path);//上传文件
//echo $_POST["tid"];
//echo $path;
?>
