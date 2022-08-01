<?php

session_start();

include_once("settings.php");

$sql = "select id from gebrkr where color = '".$_SESSION['color']."' and name = '".$_SESSION['name']."';";

$result = $conn->query($sql);

if ($result->num_rows == 0) {
	
	die("can't be");
}

$row = $result->fetch_assoc();

$sql = "insert into cht (gebr_id, room, enters, leaves) ";
$sql .= " values ('".$row['id']."', 'lobby', 'Y', 'N');";

$result = $conn->query($sql);

?>

<html>
	<head>
		<script src="../frameworkz/js/jquery-3.6.0.min.js"></script>
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>
		<style>
			.outer {
				display: table;

				position: absolute;
				top: 0;
				left: 0;
				height: 100%;
				width: 100%;
			}

			.middle {
				display: table-cell;
				vertical-align: middle;
			}

			.inner {
				margin-left: auto;
				margin-right: auto;
				width: 500px;
				text-align: left;
			}
			
			#next{
				position: absolute;
				right: 50px;
				bottom: 50px;
			}
			
			#chat{
				width:500px;
				border-style: none none none solid;
				position: absolute;
				right:0px;
				height: 100%;
			}
			
			#talk{
				border-style: solid none none none;
				position: absolute;
				bottom: 10px;
				width:90%;
				padding-top: 10px;
				text-align: left;
			}
			#say{
				position: absolute;
				bottom: 0px;
			}
			#word{
				width:300px;
				margin-left: 10px;
			}
			#say{
				position: absolute;
				right: 10px;
			}
			#chatTitle{
				margin-left: 10px;
			}
			
		</style>
		<script>
			function fillChat() {

				$
						.ajax({
							type : "get",
							xhrFields : {
								withCredentials : true
							},
							url : 'http://3.249.16.111/pagez/chatText.php?board=lobby',
							success : function(text) {

								if (text != "clean") {

									$('#chatText').html(text);

									var objDiv = document.getElementById("chatText");
									objDiv.scrollTop = objDiv.scrollHeight;
								}
							}
						});
			}
			
			function showChat() {

				setTimeout(function() {

					fillChat();

					showChat();

				}, 1000);
			}

			showChat();
	
		</script>
	</head>
	<body>

		<center>
			<div class="outer">
				<div class="middle">
					<div class="inner">
						<h1>Play</h1>
						<h1>Rules</h1>
						<h1>Report a bug</h1>
						<h1>Become a supporter</h1>
					</div>
				</div>
			</div>
		</center>
		
		<div id='chat'>
			<h3 id='chatTitle'>Chat</h3>
			<div id='chatText'></div>
			<div id="talk">
				<input id='word' type='text' /><button id='say' type="submit" class="btn btn-primary">Say</button>
			</div>
		</div>
		
	</body>
</html>