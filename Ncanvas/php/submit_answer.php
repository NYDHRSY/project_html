<?php
	/*
	学生上交答案
	后台实现自动批改
	*/
	header("Access-Control-Allow-Origin: *");
        header("ALLOW-CONTROL-ALLOW-ORIGIN:*");
	include_once "mysql.php";
	

	//$json = file_get_contents("php://input");
	
	//$data = json_decode($json, true); 
	$data = $_POST;
	//echo $data["uid"];
	$uid = $data["uid"];
	$cid = $data["cid"];
	$tid = $data["tid"];
	//$cnt = $data["cnt"];
	//$te = "hello world!";
	
	$ans = $data["ans"];
	$len = strlen($ans);//有多少个题
/*	
	echo &uid;
	echo &tid;
  */  	$sql = "SELECT * from question where uid=$uid and tid=$tid";
  	$result = $con->query($sql);
  	$arr=[];
	$score_gained=0;
	$i = 0;

	$QA=array();;
	$QB=array();;
	$qa;
    	while($row=mysqli_fetch_assoc($result)){
			
		$tmp=$ans[$i];
		if($ans[$i]==$row['std']){
//echo $ans[$i];
//echo $row['std'];
			$score_gained=$score_gained+$row['std_score'];
			$qa['score']=$row['std_score'];		
		}
		else {
			$qa['score']="0";
		}
		$qa['chose']=$ans[$i];
		$a=$tid;
		$b=$i;	
		$c=(string)($b); 
		$q=$a . "" . $c;
				
 
		$sql7 = "UPDATE question SET ans = '".$tmp."' WHERE qid=$q and uid=$uid ";
		$result7 = $con->query($sql7);
		$tmp2=$qa['score'];
		$sql8 = "UPDATE question SET score = '.$tmp2.' WHERE qid=$q and uid=$uid ";
  		$result8 = $con->query($sql8);
		
		//echo $q;
		
		$i++;
		array_push($QA, $qa);
        	
		    	
	}
/*
$tmp="A";$q="9903-0";

$sql7 = "UPDATE question SET ans = '".$tmp."' WHERE qid=$q and uid=$uid ";
	if (	$result7 = $con->query($sql7)){
}
else {
	echo "null";
}
$tmp="B";$q="9903-1";

$sql7 = "UPDATE question SET ans = '".$tmp."' WHERE qid=$q and uid=$uid ";
		$result7 = $con->query($sql7);
$tmp="C";$q="9903-2";

$sql7 = "UPDATE question SET ans = '".$tmp."' WHERE qid=$q and uid=$uid ";
		$result7 = $con->query($sql7);
*/

	/*
	
	//数据库访问答案
	
	
	//此处是自动批改 由于不知道数据格式 暂时不写
	
	
	for ($j=1; $j <= $len; $j++)//这里是每个quiz的题目数量
	{
		
			
		/*
		更新以下各值
		$type;
		$title;
		$choice;
		
		*/
		//判断是qa 还是qb 进行赋值
		//$qa 设定示范 一下数据都 不是 json choice如果是json要json_decode一下
			
			
			// $QA是包含所有选择题的包 $qa是一个选择题的包
			//$chose;历史选了什么
			//$score:考试一个题得分

/*
			$qa = array(
				"chose" => $chose,
				"score" => $score
			);
			array_push($QA, $qa);
			
	}
	array_push($QB, $qb);//QB暂时未定义
	/*
	除QA QB外 其他属性和student quiz list内对应含义一样
	*/
	//$sql3 = "UPDATE test SET done = '1' WHERE tid=$tid and uid=$uid ";

  	//$result3 = $con->query($sql3);

	$sql3 = "UPDATE test SET score_gained = '".$score_gained."' WHERE tid=$tid and uid=$uid ";
  	$result3 = $con->query($sql3);
	//$JQA = json_encode($QA);

	//$tid="9903";$uid="1024";
	$sql3 = "SELECT * from test where uid=$uid and tid=$tid";
  	$result3 = $con->query($sql3);
	$row3=mysqli_fetch_assoc($result3);
	$score_gained=$row3['score_gained'];
	$tname=$row3['tname'];
	
	$due=$row3['deadline'];
	$score_total=$row3['score_total'];
	//$score_gained=$row3['score_gained'];
	$status="Done";
	if($row3['done']==0){
		$status="Not Done";
	}
	$flag="false";
	$info = array(
		"flag" => $flag,

		"tname" => $tname,
		"tid" => $tid,
		"status" => $status,
		"score_total" => $score_total,
		"score_gained" => $score_gained,
		"due" => $due ,
		"QA" => $QA,
		"QB" => $QB
	);
	
	echo json_encode($info);
	
?>
