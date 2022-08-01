<?php

session_start();

include_once("settings.php");

$sql = "select id from gebrkr where color = '".$_SESSION['color']."' and name = '".$_SESSION['name']."';";

$result = $conn->query($sql);

$row0 = $result->fetch_assoc();

$sql = "select dt_read from cht_rd where gebr_id = '".$row0['id']."' and room = '".$_GET['board']."';";

$result = $conn->query($sql);

$row = $result->fetch_assoc();

$sql = "select max(dt_add) from cht where room = '".$_GET['board']."';"; // and time < 50min

$result2 = $conn->query($sql);

$row2 = $result2->fetch_assoc();

if($result->num_rows != 0 && $row2['max(dt_add)'] < $row['dt_read']){
	
	echo "clean";
	
	exit;
}

if($result->num_rows == 0){
	
	$sql = "insert into cht_rd(gebr_id, room)";
	$sql .= " values ('".$row0['id']."', '".$_GET['board']."');";

} else {

	$sql = "update cht_rd set dt_read = now()";
	$sql .= " where gebr_id = '".$row0['id']."' and room='".$_GET['board']."';";
}

$result3 = $conn->query($sql);

$sql = "select * from cht where room = '".$_GET['board']."';"; // and time < 50min

$result4 = $conn->query($sql);

while($row = $result4->fetch_assoc()){

	if($row['enters'] == 'Y'){
		
		$sql = "select color, name from gebrkr where id = '".$row['gebr_id']."';"; 
		
		$result5 = $conn->query($sql);
		
		$row5 = $result5->fetch_assoc();
		
		echo "<span style='background-color:".$row5['color'].";'>O</span> ".$row5['name']." has entered the lobby :)<br/>";
	}
}
?>
