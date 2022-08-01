function tap(x, y) {

	// alert(x + "," + y);
	
	var tempCoor = coordinates[x][y];

	if (listen) {

		var succes = checkSuccess(tempCoor);

		if (succes) {
			
			if (phase == "mountain") {
			
				//collect(tempCoor, 'm');
				
				checkToSwitchMountain()

				if (sendMountains) {
					
					sendMountains = false;
				
					//sendStack(moveMade);
					
					moveMade();
				}

			} else if (phase == "play") {
				
				//collect(tempCoor, 's');
				
				//sendStack(moveMade);
				
				moveMade();
			}
		}
	}
}

function checkSuccess(tempCoor){
	
	var succes = false;

	if (phase == "mountain") {

		succes = checkAndPutMointain(tempCoor);

	} else if (phase == "play") {

		if (dirty) {

			backUpCurrentSituation();

			dirty = false;
		}

		if (stoneLegal(tempCoor)) {

			succes = true;

			undone = false;

			firstMovePlayed = true;

			dirty = true;
		}

	} else if (phase == "markDead") {

		if (!markStoneDead(tempCoor)) {

			alert("There is no stone there!!!");

		} else {
		}
	}

	return succes;
}

function moveMade(){
	
	checkToBeginPlay();	

	switchTurn(true);

	onePassed = false;
}

function oneLastSwitch(){
	
	switchTurn(true);
}


function stoneLegal(coordinate) {

	if (!isEmpty(coordinate)) {

		alert("not empty");

		return false;
	}

	if (isSuicide(coordinate)) {

		alert("that would be suicide... (not allowed...)");

		return false;
	}

	if (ko(coordinate)) {

		alert("The exact same boardconfiguration can occur only once (ko)...");

		return false;
	}

	return true;
}

function checkNeightbours(coordinate) {

	var neighbours = getNeighboursFromCoordinate(coordinate);

	var otherColor = getInverse();

	for (var i = 0; i < neighbours.length; i++) {
		if (neighbours[i]["state"] == otherColor) {
			if (checkDeath(neighbours[i], otherColor)) {
				neutralize(neighbours[i], otherColor);
			}
		}
	}
}

function checkDeath(coordinate, ownColor) {

	var string = [];

	string.push(coordinate);

	var neighbours = getNeighboursFromCoordinate(coordinate);

	for (var i = 0; i < neighbours.length; i++) {
		if (neighbours[i]["state"] == ownColor) {
			addAll(neighbours[i], string, ownColor);
		}
	}

	var stringAlive = [];

	for (var i = 0; i < string.length; i++) {

		stringAlive.push(string[i]);

		if (checkAlive(string[i], stringAlive, ownColor)) {
			return false;
		}
	}

	return true;
}

function checkAlive(coordinate, string, ownColor) { // refactored

	var neighbours = getNeighboursFromCoordinate(coordinate);

	for (var i = 0; i < neighbours.length; i++) {

		if (neighbours[i]["state"] == "e") {
			return true;
		}
	}

	for (var i = 0; i < neighbours.length; i++) {

		if (!alreadyIn(neighbours[i], string)) {

			string.push(neighbours[i]);

			if (neighbours[i]["state"] == ownColor
					&& checkAlive(neighbours[i], string, ownColor)) {
				return true;
			}
		}
	}

	return false;
}

function neutralize(coordinate, color) {

	neutralizeAll(coordinate, color);
}

function isSuicide(coordinate) {

	coordinate["state"] = turn;

	checkNeightbours(coordinate);

	var stringAlive = [];

	stringAlive.push(coordinate);

	if (!checkAlive(coordinate, stringAlive, turn)) {

		coordinate["state"] = "e";

		return true;
	}

	coordinate["state"] = "e";

	return false;
}

function otherPassed(){
	
	if(checkOtherPass()){
		
		return;
	}
	
	alert('The opponent passed, if you do too this game is ended.');
	
	onePassed = true;
}

function pass() {
	
	if(!listen){
		
		return;
	}
	
	collect(coordinates[0][0], 'p');

	if(checkOtherPass()){
		
		sendStack(scoring);
		
		return;
	}
	
	sendStack(oneLastSwitch);

	alert('You passed, when both players pass the game is ended...');

	onePassed = true;
}

function scoring(){
	
	persistTurn(getInverseFromColor(turn), false);
}

function checkOtherPass(){

	if (onePassed) {

		alert('Both players passed, scoring can begin...');

		alert("Can you mark the dead stones? \n(click 'done' when ready)");

		$(function() {
			$("#buttonz").html(
					"<p><img id='done' src='../imgz/done.jpg' /></p>");
		});

		$(function() {
			$("#done").click(done);
		});

		$(function() {
			phase = "markDead";

			prepareTerritory();
		});
		
		return true;
	}	
	
	return false;
}

function resign() {
	alert('You resigned');

	if (turn == 'r') {
		alert('Yellow has won the game...');
	} else {
		alert('Red has won the game...');
	}
}

function backUpCurrentSituation() {

	twoMovesAgo = [];

	for (var row = 0; row < oldCoordinates.length; row++) {

		var rowIDz = [];

		for (var col = 0; col < oldCoordinates[row].length; col++) {

			var state = [];

			state["id"] = oldCoordinates[row][col]["id"];
			state["state"] = oldCoordinates[row][col]["state"];
			state["x"] = oldCoordinates[row][col]["x"];
			state["y"] = oldCoordinates[row][col]["y"];
			state["owner"] = oldCoordinates[row][col]["owner"];
			state["claimed"] = oldCoordinates[row][col]["claimed"];
			state["dead"] = oldCoordinates[row][col]["dead"];

			rowIDz[col] = state;
		}

		twoMovesAgo[row] = rowIDz;
	}

	oldCoordinates = [];

	for (var row = 0; row < coordinates.length; row++) {

		var rowIDz = [];

		for (var col = 0; col < coordinates[row].length; col++) {

			var state = [];

			state["id"] = coordinates[row][col]["id"];
			state["state"] = coordinates[row][col]["state"];
			state["x"] = coordinates[row][col]["x"];
			state["y"] = coordinates[row][col]["y"];
			state["owner"] = coordinates[row][col]["owner"];
			state["claimed"] = coordinates[row][col]["claimed"];
			state["dead"] = coordinates[row][col]["dead"];

			rowIDz[col] = state;
		}

		oldCoordinates[row] = rowIDz;
	}

}

function ko(coordinate) {

	putStone(coordinate);

	checkNeightbours(coordinate);

	var same = true;

	for (var row = 0; row < coordinates.length; row++) {

		for (var col = 0; col < coordinates[row].length; col++) {

			same = same
					&& twoMovesAgo.length != 0
					&& coordinates[row][col]["state"] == twoMovesAgo[row][col]["state"]
		}
	}

	if (same) {
		
		rollback();

		dirty = true;
	}

	return same;
}

function rollback() {

	coordinates = [];

	for (var row = 0; row < oldCoordinates.length; row++) {

		var rowIDz = [];

		for (var col = 0; col < oldCoordinates[row].length; col++) {

			var state = [];

			state["id"] = oldCoordinates[row][col]["id"];
			state["state"] = oldCoordinates[row][col]["state"];
			state["x"] = oldCoordinates[row][col]["x"];
			state["y"] = oldCoordinates[row][col]["y"];
			state["owner"] = oldCoordinates[row][col]["owner"];
			state["claimed"] = oldCoordinates[row][col]["claimed"];
			state["dead"] = oldCoordinates[row][col]["dead"];

			if (oldCoordinates[row][col]["state"] != "e"
					&& oldCoordinates[row][col]["state"] != "m") {

				var suffix = getStoneColorOfTurn(oldCoordinates[row][col]["state"])
						+ ".png";

				$("#img_" + state["id"]).attr("src", "../imgz/" + suffix);

			} else if (oldCoordinates[row][col]["state"] == "e") {

				$("#img_" + oldCoordinates[row][col]["id"]).attr("src", "");
			}

			rowIDz[col] = state;
		}

		coordinates[row] = rowIDz;
	}

	oldCoordinates = [];

	for (var row = 0; row < twoMovesAgo.length; row++) {

		var rowIDz = [];

		for (var col = 0; col < twoMovesAgo[row].length; col++) {

			var state = [];

			state["id"] = twoMovesAgo[row][col]["id"];
			state["state"] = twoMovesAgo[row][col]["state"];
			state["x"] = twoMovesAgo[row][col]["x"];
			state["y"] = twoMovesAgo[row][col]["y"];
			state["owner"] = twoMovesAgo[row][col]["owner"];
			state["claimed"] = twoMovesAgo[row][col]["claimed"];
			state["dead"] = twoMovesAgo[row][col]["dead"];

			rowIDz[col] = state;
		}

		oldCoordinates[row] = rowIDz;
	}
}

function undo() {

	alert("trying to undo");

	if (!firstMovePlayed) {

		alert("can't undo nothing...");

		return;
	}

	if (undone) {

		alert("you can only go back one move...");

		return;
	}

	rollback();

	switchTurn();

	undone = true;
}