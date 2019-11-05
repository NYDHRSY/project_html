<?php
$data = file_get_contents("php://input");
// $json = json_decode($data, true);
// echo $json["cid"];
echo $_POST['course'][0];
?>