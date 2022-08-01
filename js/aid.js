
function getFull(color) {

	if (color == 'r') {
		return "red";
	} else if (color == 'y') {
		return "yellow";
	} else {
		alert("invalid color");
	}
}

function getMountains(color) {

	if (color == 'r') {
		return mountainsLeftRed;
	} else if (color == 'y') {
		return mountainsLeftYellow;
	} else {
		alert("invalid color for mountains");
	}
}

function switchTurn(persist) {

	if (turn == 'r') {
		
		if(phase == "play" || (phase == "mountain" && mountainsLeftYellow > 0)){
			
			if(bot){
				
				turn = 'y';
				
				generateMove();

			}else{

				turn = 'y';
			}
		}
		
	} else if (turn == 'y') {

		if(phase == "play" || (phase == "mountain" && mountainsLeftRed > 0)){
			
			turn = 'r';
		}
		
	} else{
		alert("invalid turn");
	}

	if(persist){
		
		//persistTurn(turn, true);
	}
	
	checkListen();
}

function checkToBeginPlay(){
	
	if(getMountains('r') <= 0 && getMountains('y') <= 0){
		
		phase = "play";
		
		$("#buttonz").html("<p><img id='pass' src='../imgz/pass.jpg' /><p><img id='undo' src='../imgz/undo.jpg' /></p></p><p><img id='resign' src='../imgz/resign.jpg' /></p>");
		
		$(function() {
			$("#undo").click(undo);
			$("#pass").click(pass);
			$("#resign").click(resign);
		});
	}
}

function getStoneColorOfTurn(turn){
	
	if (turn == 'r') {
		return "red";
	} else if (turn == 'y') {
		return "yellow";
	} else {
		alert("invalid color for getStoneColorOfTurn");
	}
}

function getInverseFromColor(color){
	
	if (color == 'r') {
		return 'y';
	} else if (color == 'y') {
		return 'r';
	} else{
		alert("invalid turn in inverse");
	}
}

function getInverse(){
	
	return getInverseFromColor(turn);
}

function alreadyIn(coordinate, string){
	
	for(var i=0; i< string.length; i++){
		if(coordinate === string[i]){
			return true;
		}
	}
	
	return false;
}

function addAll(coordinate, string, value){
	
	if(!alreadyIn(coordinate, string)){
		string.push(coordinate);
	}

	var neighbours = getNeighboursFromCoordinate(coordinate);
	
	for (var i = 0; i < neighbours.length; i++) {
		if(neighbours[i]["state"] == value && !alreadyIn(neighbours[i], string)){
			addAll(neighbours[i], string, value);
		}
	}
}

function checkListen(){
	
	//listen = turn == ownColor;
	
	/*
	if(!listen){
		
		$("#statusText").html("turn: other");

	}else{
		
		$("#statusText").html("turn: you");
	}
	*/
	
	$("#status").html("turn: " + turn);
}

function checkToSwitchMountain(){

	if(turn == 'r' && (getMountains('y') > 0 || getMountains('r') == 0)){

		sendMountains = true;
		
		return;
	}
	
	if(turn == 'y' && (getMountains('r') > 0 || getMountains('y') == 0)){
		
		sendMountains = true;
		
		return;
	}
}