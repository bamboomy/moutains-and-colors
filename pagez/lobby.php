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
		<link rel="manifest" href="manifest.json">
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
				right: 10px;
			}

			#word{
				width:300px;
				margin-left: 10px;
			}

			#chatTitle{
				margin-left: 10px;
			}

			#online{
				width:300px;
				border-style: none solid none none;
				position: absolute;
				left:5px;
				height: 100%;
			}

		</style>
		<script>

			function updateOnline() {

				$
						.ajax({
							type : "get",
							xhrFields : {
								withCredentials : true
							},
							url : 'http://3.249.16.111/pagez/online.php?board=lobby',
							success : function(text) {

								if (text != "clean") {

									$('#users').html(text);

									var objDiv = document.getElementById("chatText");
									objDiv.scrollTop = objDiv.scrollHeight;
								}
							}
						});
			}
		
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
			
			function refresh() {

				setTimeout(function() {

					fillChat();
					
					updateOnline();

					refresh();

				}, 1000);
			}

			refresh();
			
			function sendMessage() {
		
				var chat = $('#word').val();
		
				$('#word').val("");

				$
						.ajax({
							type : "POST",
							xhrFields : {
								withCredentials : true
							},
							url : 'http://3.249.16.111/pagez/sendChat.php?board=lobby',
							data : {
								text : chat
							},
							success : function(text) {

								fillChat();
							}
						});
			}
			
			$(document).ready(function() {

				$('#word').on('keydown', function(e) {

					if (e.which == 13) {

						sendMessage();
					}
				});
			});
	
		</script>
	</head>
	<body>

		<center>
			<div class="outer">
				<div class="middle">
					<div class="inner">
						<h1>Play</h1>
						<h1>Rules</h1>
						<h1>See an old game</h1>
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
				<input id='word' type='text' /><button id='say' onclick='sendMessage();' class="btn btn-primary">Say</button>
			</div>
		</div>

		<div id='online'>
			<h3 id='onlineTitle'>Online</h3>
			<div id='users'></div>
		</div>
		
	</body>
</html>