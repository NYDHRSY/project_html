<?php
    header('Content-Type: text/html; charset=UTF-8');
    include_once "mysql.php"; 
    $sql = "SELECT * from user";
    $result = $con->query($sql);
    $arr=[];
    while($row=mysqli_fetch_assoc($result)){
        $arr[]=$row;
    }

    // $head ="../assets/file/cxk.gif";


    $json = json_encode($arr);
    echo $json;
    mysqli_free_result($result);
    mysqli_close($con);
?>