<?php
header("Content-type: application/json;charset=utf-8");
@$uname=$_REQUEST["uname"];
@$upwd=$_REQUEST["upwd"];
@$re_upwd=$_REQUEST["re_upwd"];
@$user_avatar="default";
$regUname="/^(\w+@[0-9a-zA-Z_]+.[0-9a-zA-Z]+)|((\+86\s+|0086\s+)?1[34578]\d{9})$/";
$regUpwd="/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)[a-zA-Z0-9~!@#$%^&*_]{6,16}$/";
//输出结果
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
}else if($upwd!==$re_upwd){
    $output["ok"]=3;
    $output["msg"]="两次密码输入不一致";
    $output["ipt"]='this.$re_upwd';
    echo json_encode($output);
}else if(preg_match($regUname, $uname)&&preg_match($regUpwd, $upwd)){
    require_once("./00-init.php");
    $sql="SELECT uid FROM user_info WHERE uname='$uname'";
    $result=mysqli_query($conn, $sql);
    $row=mysqli_fetch_row($result);
    if(!$row){
        $sql="INSERT INTO user_info VALUES(null,'$uname','$upwd',$user_avatar)";
        if(mysqli_query($conn, $sql)){
            $output["msg"]="注册成功";
            echo json_encode($output);
        }
    }else{
        $output["ok"]=4;
        $output["msg"]="用户已存在";
        $output["ipt"]='this.$uname';
        echo json_encode($output);
    }
}