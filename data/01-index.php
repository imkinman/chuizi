<?php
header("Content-type:application/json");
require_once("./00-init.php");
/* 返回给前端的对象 */
$output=[];
/* 1、查询广告轮播信息 */
$sql = "SELECT * FROM carrousel";
$result=mysqli_query($conn,$sql);
if(($row=mysqli_fetch_all($result,MYSQLI_ASSOC))!=null){
    $output["carrousel"]=$row;
}

/* 2、查询图片导航 */

var_dump($output);