<?php
    
    header("Content-Type:text/html;charset=utf-8");
   $con=mysqli_connect("localhost","root","","software");
if (!$con)
{
    die("连接错误: " . mysqli_connect_error());
} 
?>
