<?php

session_start();

include_once("settings.php");

$sql = "select id from gebrkr where hash = '".$_SESSION['hash']."';";

$result = $conn->query($sql);

$row0 = $result->fetch_assoc();

$sql = "insert into cht(gebr_id, room, enters, leaves, message)";
$sql .= " values ('".$row0['id']."', '".$_GET['board']."', 'N', 'N', '".$_POST['text']."');"

$result = $conn->query($sql);
?>
