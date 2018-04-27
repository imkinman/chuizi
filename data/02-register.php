<?php
header("Content-type: application/json;charset=utf-8");
@$uname=$_REQUEST["uname"];
@$upwd=$_REQUEST["upwd"];
@$re_upwd=$_REQUEST["re_upwd"];
$regUname="/^(\w+@[0-9a-zA-Z_]+.[0-9a-zA-Z]+)|((\+86\s+|0086\s+)?1[34578]\d{9})$/";
$regUpwd="/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)[a-zA-Z0-9~!@#$%^&*_]{6,16}$/";
//输出结果
$output=[];

if(!$uname || !$upwd || ($upwd!==$re_upwd)){
    $output["ok"]=0;
    $output["msg"]="用户名或密码格式不符合";
    echo json_encode($output);
}else if(preg_match($regUname, $uname)&&preg_match($regUpwd, $upwd)){
    require_once("./00-init.php");
    $sql="SELECT uid FROM user_info WHERE uname='$uname'";
    $result=mysqli_query($conn, $sql);
    $row=mysqli_fetch_row($result);
    if(!$row){
        $sql="INSERT INTO user_info VALUES(null,'$uname','$upwd')";
        if(mysqli_query($conn, $sql)){
            $output["ok"]=1;
            $output["msg"]="注册成功";
            echo json_encode($output);
        }
    }else{
        $output["ok"]=0;
        $output["msg"]="用户已存在";
        echo json_encode($output);
    }
}