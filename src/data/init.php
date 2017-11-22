<?php
    header("Content-Type:application/json;charset=utf-8");
	header('Access-Control-Allow-Credentials:true');
	header('Access-Control-Allow-Origin:http://localhost:3000');
    $conn=mysqli_connect("127.0.0.1","root","","mk",3306);
    mysqli_query($conn,"set names utf8");
?>