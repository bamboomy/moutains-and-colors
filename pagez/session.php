<?php

session_start();

include_once("settings.php");

$_SESSION['hash']=md5(random_bytes(20));

$sql = "insert into gebrkr (color, name, hash) ";
$sql .= " values ('".$_POST['color']."', '".$_POST['name']."', '".$_SESSION['hash']."');";

$result = $conn->query($sql);

$sql = "select id from gebrkr where color = '".$_POST['color']."' and name = '".$_POST['name']."';";

$result = $conn->query($sql);

$_SESSION['color'] = $_POST['color'];
$_SESSION['name'] = $_POST['name'];

header("Location: lobby.php");
		
exit;

?>
