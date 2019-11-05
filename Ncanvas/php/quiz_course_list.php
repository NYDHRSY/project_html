<?php
	//每个学生点击quiz时 选好了course 中的一项
	//每个课程有个quiz_list 当前代码用服务器向前端传所有的信息 包括考试选项之类
/*	$uid =$_POST["uid"];
	$cid =$_POST["cid"];
	$data=file_get_contents("php://input");
        $json=json_decode($data,true);
	echo $json["cid"];
*/

	/*
	前端传过来uid cid
	数据库 查询 
	tname tid //多个
	status考试状态(学生有没有考试) 
	考试成绩score_total 考试总分score_gained 
	考试截止日期due
	*/
        header("Access-Control-Allow-Origin: *");
        header("ALLOW-CONTROL-ALLOW-ORIGIN:*");
	
	header("Content-Type:text/html;charset=utf-8");
	$uid =$_GET["uid"];
	$cid =$_GET["cid"];


	//$uid=1024;
        //$cid=100;
	include_once "mysql.php"; 
    	$sql = "SELECT COUNT(tid) AS num from test where cid=$cid and uid=$uid";
	$result = $con->query($sql);
	
        $row=mysqli_fetch_assoc($result);
        $len=$row['num'];
	 
	//$len=$row['num'] ; //list 的长度

	//echo $len;

	$tname ;
	$tid;
	$status;
	$score_total;
	$score_gained; 
	$due;
	$QA;
	$QB;
	//保存QA QB的中间变量
	$type;
	$title;
	$choice;
	$choosed;
	$download;
	$file_rul;
	
	$list = array();

	$sql2 = "SELECT * from test where cid=$cid and uid=$uid";
	$result2 = $con->query($sql2);
	$tid_list=[];


   	while($row2=mysqli_fetch_assoc($result2)){
        	


		//这里是每个course_quiz的包
		//m每次更新cid cname值

		//问题个数 根据tid查询得到
		$QA=[];
		$QB=[];
		$JQA="";
		$JQB="";
		$type=$row2['ttype'];
		$tmptid=$row2['tid'] ;
		/*echo "S:";		
		echo $tmptid;
		echo "B:";
		echo $type;*/


		if($type==0){
//echo "debug";
//echo $tmptid;echo $uid;
 

			//echo $tmp_tid;
				/*
				更新以下各值
				$type;
				$title;
				$choice;
				$choosed;
				$download;
				$file_rul;
				*/
			
				/*
				判断是qa 还是qb 进行赋值
		
				$qa 设定示范 一下数据都 不是 json choice如果是json要json_decode一下
				*/
			
				// $QA是包含所有选择题的包 $qa是一个选择题的包
				

				$sql4 = "SELECT * from question where tid=$tmptid and uid=$uid";
//echo "yes";
				$result4 = $con->query($sql4);
//echo "yes";
				while($row4=mysqli_fetch_assoc($result4)){
					//echo "hello";							
					$QA[]=$row4;
//echo $row4['qid'];

				}
	 			//$JQA = json_encode($QA);
	/*
				$qa = array(
					"type"=>$type,
					"title"=>$title,
					"choice"=>$choice,
					"choosed"=>$choosed
				);
				array_push($QA, $qa);
	*/

			

		}
		else {

				$sql5 = "SELECT * from question where tid=$tmptid and uid=$uid";
				$result5 = $con->query($sql5);
				while($row5=mysqli_fetch_assoc($result5)){
					$QB[]=$row5;//echo "hello";	

				}
	 			//$JQB = json_encode($QB);


		}
		$status="Done";
		if($row2['done']==0){
			$status="Not Done";
		}
		$info = array(
		"tname" => $row2['tname'] ,
		"tid" => $row2['tid'] ,
		"status" => $status,
		"score_total" => $row2['score_total'],
		"score_gained" =>  $row2['score_gained'],
		"due" => $row2['deadline'],
		"QA" => $QA,
		"QB" => $QB
		);
		array_push($list, $info);
	}
	
	echo json_encode($list);
	
?>
