<html>
	<head>
		<script src="frameworkz/js/jquery-3.6.0.min.js"></script>
		<link rel="stylesheet" href="frameworkz/colorPicker/css/bootstrap-colorpicker.min.css">
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
				padding: 10px;
				position: absolute;
				bottom: 10px;
				left: 10px;
				width:90%;
			}
			#say{
				position: absolute;
				bottom: 0px;
			}
			#word{
				width:300px;
			}
			#say{
				position: absolute;
				right: 10px;
			}
			
		</style>
	</head>
	<body>

		<center>
			<div class="outer">
				<div class="middle">
					<div class="inner">
						<h1>Play</h1>
						<h1>Rules</h1>
						<h1>Become a supporter</h1>
					</div>
				</div>
			</div>
		</center>
		
		<div id='chat'>
			<h3>Chat</h3>
			<div id="talk">
				<input id='word' type='text' /><button id='say' type="submit" class="btn btn-primary">Say</button>
			</div>
		</div>
		
	</body>
</html>