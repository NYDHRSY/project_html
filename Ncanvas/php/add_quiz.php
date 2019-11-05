<?php
header("Access-Control-Allow-Origin: *");
        header("ALLOW-CONTROL-ALLOW-ORIGIN:*");
    header("Content-Type:text/html;charset=utf-8");
    
    include_once 'mysql.php';
$data = $_POST;
    
    $uid = $data["uid"];
    $cid = $data["cid"];
    $tid = $data["tid"];
    $tname=$data["tname"];
    $deadline=$data["due"]; 
    $cnt=$data["cnt"]; 	
echo"CNT:";
    echo $cnt;
    $ttype=$data["ttype"];

    
   // $cid =300;
   // $cnt=1;

    $sql = "SELECT distinct uid from class where cid=$cid ";
    $result = $con->query($sql);
    $arr=[];
    $score=0;
    $std_score=10;		
    $question=0;

    $score_total=$std_score*$cnt;
    $score_gained=0;
    $ans=0; 	
    $done=0;


     if($ttype=="0"){
			$QA = $data["QA"];
			echo "AAAAAA";	
			for ($j=0; $j < $cnt; $j++){

				$a=$tid;
				$b=$j;	
				$c=(string)($b); 
				$q=$a . "" . $c;
				$choiceA=$QA[$j]['choiceA'];
				$choiceB=$QA[$j]['choiceB'];
				$choiceC=$QA[$j]['choiceC'];
				$choiceD=$QA[$j]['choiceD'];
				$std=$QA[$j]['std'];
				$title=$QA[$j]['title'];
				$question_type=$ttype;
				/*
				$q="91002";
				$tid="9100";
				$choiceA="A";
				$choiceB="B";
				$choiceC="C";
				$choiceD="D";
				$std="A";
				$title="hello kitty";*/
					
				$sql2 = "insert into question (qid,tid,cid,choiceA,choiceB,choiceC,choiceD,std,ans,std_score,score,title,uid,question_type) values ('".$q."','".$tid."',".$cid.",'".$choiceA."','".$choiceB."','".$choiceC."','".$choiceD."','".$std."','".$ans."',".$std_score.",".$score.",'".$title."',".$uid.",".$question_type.")";
				$result2 = $con->query($sql2);
			
		    }
		}
			//$tid="9200";$tname="addtion_test";$deadline="2019/12/11";
 	         else {
				$QB = $data["QB"];
			for ($j=0; $j < $cnt; $j++){

				
				$a=$tid;
				$b=$j;	
				$c=(string)($b); 
				$q=$a . "" . $c;
				
				$title=$QB[$j]['title'];
				$question_type=$ttype;
				/*$q="91002";
				$tid="9100";
				$choiceA="A";
				$choiceB="B";
				$choiceC="C";
				$choiceD="D";
				$std="A";
				$title="hello kitty";
				*/	
				$sql2 = "insert into question (qid,tid,cid,ans,std_score,score,title,uid,question_type) values ('".$q."','".$tid."',".$cid.",'".$ans."',".$std_score.",".$score.",'".$title."',".$uid.",".$question_type.")";
				$result2 = $con->query($sql2);
			
		    }
		}


		$sql3 = "insert into test (tid,uid,cid,tname,ttype,deadline,score_total,score_gained,done) values  ('".$tid."','".$uid."',".$cid.",'".$tname."',".$ttype.",'".$deadline."',".$score_total.",".$score_gained.",".$done.")";
		$result3 = $con->query($sql3);	

    //$cnt=strlen($ans);	

  
    while($row=mysqli_fetch_assoc($result)){
	    $uid=$row['uid'];	
		echo "U:";	
		echo $uid;
	    
	    	if($ttype=="0"){
			$QA = $data["QA"];
			echo "AAAAAA";	
			for ($j=0; $j < $cnt; $j++){

				$a=$tid;
				$b=$j;	
				$c=(string)($b); 
				$q=$a . "" . $c;
				$choiceA=$QA[$j]['choiceA'];
				$choiceB=$QA[$j]['choiceB'];
				$choiceC=$QA[$j]['choiceC'];
				$choiceD=$QA[$j]['choiceD'];
				$std=$QA[$j]['std'];
				$title=$QA[$j]['title'];
				$question_type=$ttype;
				/*
				$q="91002";
				$tid="9100";
				$choiceA="A";
				$choiceB="B";
				$choiceC="C";
				$choiceD="D";
				$std="A";
				$title="hello kitty";*/
					
				$sql2 = "insert into question (qid,tid,cid,choiceA,choiceB,choiceC,choiceD,std,ans,std_score,score,title,uid,question_type) values ('".$q."','".$tid."',".$cid.",'".$choiceA."','".$choiceB."','".$choiceC."','".$choiceD."','".$std."','".$ans."',".$std_score.",".$score.",'".$title."',".$uid.",".$question_type.")";
				$result2 = $con->query($sql2);
			
		    }
		}
			//$tid="9200";$tname="addtion_test";$deadline="2019/12/11";
 	         else {
				$QB = $data["QB"];
			for ($j=0; $j < $cnt; $j++){

				
				$a=$tid;
				$b=$j;	
				$c=(string)($b); 
				$q=$a . "" . $c;
				
				$title=$QB[$j]['title'];
				$question_type=$ttype;
				/*$q="91002";
				$tid="9100";
				$choiceA="A";
				$choiceB="B";
				$choiceC="C";
				$choiceD="D";
				$std="A";
				$title="hello kitty";
				*/	
				$sql2 = "insert into question (qid,tid,cid,ans,std_score,score,title,uid,question_type) values ('".$q."','".$tid."',".$cid.",'".$ans."',".$std_score.",".$score.",'".$title."',".$uid.",".$question_type.")";
				$result2 = $con->query($sql2);
			
		    }
		}


		$sql3 = "insert into test (tid,uid,cid,tname,ttype,deadline,score_total,score_gained,done) values  ('".$tid."','".$uid."',".$cid.",'".$tname."',".$ttype.",'".$deadline."',".$score_total.",".$score_gained.",".$done.")";
		$result3 = $con->query($sql3);
			
    }
    	
    //$cnt = $data["cnt"];
    //$te = "hello world!";
	
   //echo "AAAA";
echo $data["QA"];;
	


?>







