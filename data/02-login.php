<?php
header("Content-type:application/json;charset=utf=8;");
@$uname=$_REQUEST["uname"];
@$upwd=$_REQUEST["upwd"];

$output=[
    "ok"=>0,
    "msg"=>"",
    "ipt"=>""
];

if(!$uname){
    $output["ok"]=1;
    $output["msg"]="用户名不能为空";
    $output["ipt"]='this.$uname';
    echo json_encode($output);
}else if(!$upwd){
    $output["ok"]=2;
    $output["msg"]="密码不能为空";
    $output["ipt"]='this.$upwd';
    echo json_encode($output);
}else{
    require_once("./00-init.php");
    $sql="SELECT uid FROM user_info WHERE uname='$uname' AND binary upwd='$upwd'";
    $result = mysqli_query($conn, $sql);
    if($row = mysqli_fetch_row($result)){
        //登录成功
        session_start();
        $_SESSION["uname"]=$uname;
        $output["msg"]="登录成功";
        echo json_encode($output);
    }else{
        $output["ok"]=3;
        $output["msg"]="密码错误";
        $output["ipt"]='this.$upwd';
        echo json_encode($output);
    }
}