<?php

session_start();

include_once("settings.php");

$sql = "select gebr_id from cht_rd where dt_read > date_sub(now(), INTERVAL 20 SECOND) and room = '".$_GET['board']."';";

$result = $conn->query($sql);

while($row = $result->fetch_assoc()){

	$sql = "select * from gebrkr where id = '".$row['gebr_id']."';"; 
	
	$result2 = $conn->query($sql);
	
	$row2 = $result2->fetch_assoc();
	
	echo "<span style='background-color:".$row2['color'].";'>^L^</span> <span style='text-decoration: underline;'>".$row2['name']."</span><br/>";
}
?>
