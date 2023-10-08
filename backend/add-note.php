<?php

require "connection.php";

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData);

$mobile = $data->mobile;
$title = $data->title;
$description = $data->description;
$category = $data->category;


$obj = new stdClass();

if (empty($mobile)) {
    $obj->msg = "Please login first";
} else if (empty($title)) {
    $obj->msg = "Please enter the title";
}else if (empty($description)) {
    $obj->msg = "Please enter the description";
}else if (empty($category)) {
    $obj->msg = "Please select the category";
} else {

    $d = new DateTime();
    $tz = new DateTimeZone("Asia/Colombo");
    $d->setTimezone($tz);
    $date = $d->format("Y-m-d H:i:s");

    Database::iud("INSERT INTO `note`(`title`, `description`, `created_at`, `user_mobile`, `note_category_id`) VALUES ('$title', '$description', '$date', '$mobile', '$category')");
    $obj->msg = "success";
}

echo json_encode($obj);
