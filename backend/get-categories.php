<?php

require "connection.php";

$obj = new stdClass();

$rs = Database::search("SELECT * FROM `note_category`");

if ($rs->num_rows > 0) {
    $a = array();
    for ($x = 0; $x < $rs->num_rows; $x++) {
        $data = $rs->fetch_assoc();
        $a[$x] = array("label" => $data["category"], "value" => $data["id"]);
    }
    $obj->categories = $a;
    $obj->msg = "success";
} else {
    $obj->msg = "No notes found";
}

echo (json_encode($obj));
