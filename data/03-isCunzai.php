<?php
header("Content-Type:application/json;charset=utf-8");
@$uname=$_REQUEST["uname"];
if(!$uname){
    echo json_encode(["ok"=>0,"msg"=>"用户名不能为空"]);
}else{
    require_once("./00-init.php");
    $sql="SELECT uid FROM user_info WHERE uname='$uname'";
    $result=mysqli_query($conn, $sql);
    $row=mysqli_fetch_row($result);
    if($row){
        echo json_encode(["ok"=>0,"msg"=>"用户名已存在"]);
    }else{
        echo json_encode(["ok"=>1,"msg"=>"正确"]);
    }
}
