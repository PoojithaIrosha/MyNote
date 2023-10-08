<?php

require "connection.php";

$mobile = "0762873649";
$password = "123";

$rs = Database::search("SELECT * FROM `user` WHERE `mobile` = $mobile AND `password` = $password");

if ($rs->num_rows > 0) {
    $user = $rs->fetch_assoc();
    echo (json_encode($user));
}
