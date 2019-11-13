<?php
function getFile($dir) {
    $fileArray[]=NULL;
    if (false != ($handle = opendir ( $dir ))) {
        $i=0;
        while ( false !== ($file = readdir ( $handle )) ) {
            //去掉"“.”、“..”以及带“.xxx”后缀的文件
            if ($file != "." && $file != ".."&&strpos($file,".")) {
                $fileArray[$i]="./imageroot/current/".$file;
                if($i==100){
                    break;
                }
                $i++;
            }
        }
        //关闭句柄
        closedir ( $handle );
    }
    return $fileArray;
}
function getDirContent($path){
    if(!is_dir($path)){
        return false;
    }
    //readdir方法
    /* $dir = opendir($path);
    $arr = array();
    while($content = readdir($dir)){
        if($content != '.' && $content != '..'){
            $arr[] = $content;
        }
    }
    closedir($dir); */

    //scandir方法
    $arr = array();
    $data = scandir($path);
    foreach ($data as $value){
        if($value != '.' && $value != '..'){
            $arr[] = $value;
        }
    }
    return $arr;
}

// if(!empty($_GET['dir'])){
//     $dir = $_GET['dir'];
//     $list = getDirContent($dir);
// 	foreach ($list as $file) {
// 	  echo "<a href = '" . $dir . "/" . $file . "'>" . $file . "</a><br>";
// 	}
// }
// else {
//     echo "<h1>Students haven't uploaded their files</h1>";
// }

$dir = $_GET['dir'];
$list = getDirContent($dir);
if(!empty($list)){
	foreach ($list as $file) {
	  echo "<a href = '" . $dir . "/" . $file . "'>" . $file . "</a><br>";
	}
}
else {
    echo "<h1>Students haven't uploaded their files</h1>";
}
?>


