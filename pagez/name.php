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
		</style>
	</head>
	<body>

		<center>
			<div class="outer">
				<div class="middle">
					<div class="inner">
						<form action='cookie.php' method='post'>
<?php				
							echo "You choose: <span style='background-color:".$_POST['color'].";'>".$_POST['color']."</span> :)<br/>";
							echo "Looks like a pretty decent color, if I may say...";
							echo "<br/>";
							echo "Next: (we're almost there), how would you like to be called?";
							echo "<br/>";
							echo "<input type='hidden' name='color' value='".$_POST['color']."'/>";
?>
							<input type="text" name="name"/>
							<button id="next" type="submit" class="btn btn-primary">Next</button>
						</form>
					</div>
				</div>
			</div>
		</center>
	</body>
</html>