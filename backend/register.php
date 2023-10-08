<?php

require "connection.php";

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData);

$mobile = $data->mobile;
$password = $data->password;
$firstName = $data->firstName;
$lastName = $data->lastName;
$userType = $data->userType;

$obj = new stdClass();

if (empty($firstName)) {
    $obj->msg = "Please enter the first name";
} else if (empty($lastName)) {
    $obj->msg = "Please enter the last name";
}else if (empty($mobile)) {
    $obj->msg = "Please enter the mobile number";
}else if (strlen($mobile) != 10) {
    $obj->msg = "Mobile number should contain only 10 characters";
} else if (preg_match("/07[0,1,2,4,5,6,7,8,][0-9]{7}+/", $mobile) == 0) {
    $obj->msg = "Invalid mobile number";
} else if (empty($password)) {
    $obj->msg = "Please enter the password";
} else if (empty($userType)){
    $obj->msg = "Please select a user type";
} else {

    $rs = Database::search("SELECT * FROM `user` WHERE `mobile` = $mobile");

    if ($rs->num_rows > 0) {
        $obj->msg = "User account exists with the same mobile number";
    } else {

        Database::iud("INSERT INTO `user`(`first_name`, `last_name`, `mobile`, `password`, `user_type_id`) VALUES ('$firstName', '$lastName', '$mobile', '$password', '$userType')");
        $obj->msg = "success";
        $obj->user = $data;
    }
}

echo json_encode($obj);
