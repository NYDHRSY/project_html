<?php 
header("ALLOW-CONTROL-ALLOW-ORIGIN:*");
header('Access-Control-allow-credentials:true');
header("Content-Type:text/html;charset=utf-8");
header("Access-Control-allow-methonds:POST,GET");

$json_raw= file_get_contents("php://input");
$json_data=json_decode($json_raw);
echo json_data['uid'];


?>
