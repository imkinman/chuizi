<?php
require_once("./00-constant.php");
$conn = mysqli_connect(
    HOST,
    ADMIN,
    PASSWORD,
    DB,
    PORT
);
mysqli_query($conn,"SET NAMES UTF8");