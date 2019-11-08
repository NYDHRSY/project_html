<?php
	//$uid =$_GET["uid"];
	$c=$_POST["course"];//数组
	//$cnt=$data["cnt"];
	$uid=$_POST["uid"];
	//$uid=1026;	
	include_once "mysql.php"; 
	$cnt=count($c);
   	$sql = "delete from class where uid=$uid";
	$result = $con->query($sql);
	
	$sql = "delete from test where uid=$uid";
	$result = $con->query($sql);
	
	$sql = "delete from question where uid=$uid";
	$result = $con->query($sql);
	//echo "yes";
	for ($j=1; $j < $cnt; $j++){
		$cid=$c[$j];
		//$cid=1003;
	    	$sql = "SELECT * from class where cid=$cid group by day";
	//$sql = "SELECT COUNT(tid) AS num from test where cid=$cid and uid=$uid";
		$result = $con->query($sql);
		while($row=mysqli_fetch_assoc($result)){
		//$sql2="";	
			$sql2 = "insert into class (cid,weekdays,ctitle,start,end,cover_url,home_url,syllabus_url, modles_url,did,uid,day,ctext) values (".$row['cid'].",'".$row['weekdays']."','".$row['ctitle']."',".$row['start'].",".$row['end'].",'".$row['cover_url']."','".$row['home_url']."','".$row['syllabus_url']."','".$row['modles_url']."',".$row['did'].",'".$uid."',".$row['day'].",'".$row['ctext']."')";
			try{	
				$result2 = $con->query($sql2);
			}
			catch(PDOException $e){

			}
		}


	}


	for ($j=1; $j < $cnt; $j++){
		//echo $cid[$j];
		$cid=$c[$j];
		//$cid=1003;
	    	$sql = "SELECT * from test where cid=$cid group by tid";
	    
		$result = $con->query($sql);
		while($row=mysqli_fetch_assoc($result)){
			//	echo "BBBBBB";
			$tid=$row['tid'];
			$tname=$row['tname'];
			$ttype=$row['ttype'];
			$deadline=$row['deadline'];
			$score_total=$row['score_total'];
			$score_gained=$row['score_gained'];
			$done=0;
			
			$sql2 = "insert into test (tid,uid,cid,tname,ttype,deadline,score_total,score_gained,done) values  ('".$tid."','".$uid."',".$cid.",'".$tname."',".$ttype.",'".$deadline."',".$score_total.",".$score_gained.",".$done.")";
			try{	
				$result2 = $con->query($sql2);
			}
			catch(PDOException $e){

			}

		}


	}

        for ($j=1; $j < $cnt; $j++){
        
        	$cid=$c[$j];
			//$cid=1003;
	    	$sql = "SELECT * from question where cid=$cid group by qid";
			$result = $con->query($sql);
		while($row=mysqli_fetch_assoc($result)){
				//echo "CCCCCC";
			$q=$row['qid'];
			$tid=$row['tid'];
			$cid=$row['cid'];
			$choiceA=$row['choiceA'];
			$choiceB=$row['choiceB'];
			$choiceC=$row['choiceC'];
			$choiceD=$row['choiceD'];
			$std=$row['std'];
			$ans=$row['ans'];
			$std_score=$row['std_score'];
			$score=$row['score'];
			$title=$row['title'];
			$question_type=$row['question_type'];

			
			$sql2 = "insert into question (qid,tid,cid,choiceA,choiceB,choiceC,choiceD,std,ans,std_score,score,title,uid,question_type) values ('".$q."','".$tid."',".$cid.",'".$choiceA."','".$choiceB."','".$choiceC."','".$choiceD."','".$std."','".$ans."',".$std_score.",".$score.",'".$title."',".$uid.",".$question_type.")";
			try{	
				$result2 = $con->query($sql2);
			}
			catch(PDOException $e){

			}
		}


	}
	$flag="true";
	$info = array(
		"flag" => $flag

		
	);

	echo json_encode($info);

		/*
	前端传过来cid
	数据库根据cid找 markdown文件的url
	*/
   /* $arr=[];
    while($row=mysqli_fetch_assoc($result)){
        $arr[]=$row;
	//echo $row['cid'];
    }
    $json = json_encode($arr);
    echo $json;

	*/
	//echo 1;
?>
