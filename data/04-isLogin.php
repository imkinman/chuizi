<?php
header("content-type:application/json;charset=utf-8");
$output=[
    "ok"=>0
];
session_start();
if( @$uname = $_SESSION["uname"] ){
    require_once("./00-init.php");
    $sql="SELECT uid, avatar FROM user_info WHERE uname='$uname'";
    $result = mysqli_query($conn, $sql);
    if($row=mysqli_fetch_all($result, MYSQLI_ASSOC)){
        foreach($row as $key=>$value){
            $output[$key]=$value;
        }
    }
    echo json_encode($output);
}else{
    $output["ok"]=1;
    echo json_encode($output);
}