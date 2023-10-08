<?php

require "connection.php";

$mobile = $_GET["mobile"];

$obj = new stdClass();

if (empty($mobile)) {
    $obj->msg = "You need to login first";
} else {
    $rs = Database::search("SELECT `title`, `description`, `created_at`, `user_mobile`, `category`, `image` FROM `note` JOIN `note_category` ON `note`.`note_category_id` = `note_category`.`id` WHERE `user_mobile` = $mobile");

    if ($rs->num_rows > 0) {
        $a = array();
        for ($x = 0; $x < $rs->num_rows; $x++) {
            $data = $rs->fetch_assoc();
            $a[$x] = $data;
        }
        $obj->notes = $a;
        $obj->msg = "success";
    } else {
        $obj->msg = "No notes found";
    }
}

echo (json_encode($obj));
