<html>
	<head>
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
				width: 400px;
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
						<form>
<?php				
							echo "You choose: ".$_POST['color'].":";
							echo "<input type='color' value='".$_POST['color']."' disabled='disabled'>";
							echo "<br/>";
							echo "Looks like a pretty decent color, if I may say...";
							echo "<br/>";
							echo "Next: (we're almost there), how would you like to be called?";
							echo "<br/>";
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