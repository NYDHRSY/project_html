<?php

	
	header("Access-Control-Allow-Origin: *");
        header("ALLOW-CONTROL-ALLOW-ORIGIN:*");
	include_once "mysql.php";
	
	
	$uid =$_GET["uid"];
	$sql = "SELECT * from class where uid=$uid ";
	//echo $uid;

	$result = $con->query($sql);
  	$arr=[];
	$score_gained=0;
	$i = 0;
	$calender_list = array();
    	while($row=mysqli_fetch_assoc($result)){//遍历每门课
	//echo "                              AAA             ";
	//前端传过来uid数据库生成每个人一个学期的课表
	
	$course_num;//数据库查询到的course数 周2 周4上的同一门课视作2门
	
	
	/*
	每天每一门课的array的格式：
	"title": $course_name,
    	"description": "",
    	"start": "2019-10-30T09:30:00",
    	"end": "2019-10-30T11:45:00",
    	"allDay": true
	*/
	
		//此处查询数据库 更新值
		
		$start=$row['day'];//$start 存的是一个课周几开始上的 是个数 周一是1
 		$cname=$row['ctitle'];
 		


		$start_week=1;//每门课起始周
		$end_week=15;//每门课结束周
		$ctext=$row['ctext'];
		$date=mktime(0, 0, 0, 9, 1, 2019);// 初始时间为2019-08-29 
		for($week = $start_week; $week <= $end_week ; $week++)
		{
			$day= $start + (7 * ($week -1) )-65;//
		//echo $day;
		//echo " ";
			$text ="+".$day." "."day";
			$date = strtotime($text);
			$submit_time = date("Y-m-d", $date );
			
			$item = array(
				"title" => $cname,
				"description" => $ctext,
				"start" => $submit_time,
				"end" => $submit_time,
				"allDay"=> true
			);
			array_push($calender_list, $item);
		}

	}
	
	echo json_encode($calender_list);
?>
