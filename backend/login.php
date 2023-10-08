<?php

require "connection.php";

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData);

$mobile = $data->mobile;
$password = $data->password;

$obj = new stdClass();

if (empty($mobile)) {
    $obj->msg = "Please enter the mobile number";
} else if (strlen($mobile) != 10) {
    $obj->msg = "Mobile number should contain only 10 characters";
} else if (preg_match("/07[0,1,2,4,5,6,7,8,][0-9]{7}+/", $mobile) == 0) {
    $obj->msg = "Invalid mobile number";
} else if (empty($password)) {
    $obj->msg = "Please enter the password";
} else {

    $rs = Database::search("SELECT `first_name`, `last_name`, `mobile`, `type` FROM `user` JOIN `user_type` ON `user`.`user_type_id` = `user_type`.`id` WHERE `mobile` = $mobile AND `password` = $password");

    if ($rs->num_rows > 0) {
        $user = $rs->fetch_assoc();
        $obj->msg = "success";
        $obj->user = $user;
    } else {
        $obj->msg = "No user found with the provided mobile";
    }
}

echo json_encode($obj);
