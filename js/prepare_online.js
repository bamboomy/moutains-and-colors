function putRandom() {
	
	if(!listen){
		
		return;
	}

	alert("going to randomize...");
	
	ouptutErrors = false;
	
	var remainder = getMountains(turn);

	for (var i = 0; i < remainder; i++) {

		chooseRandomSpot();
	}

	checkToBeginPlay();	
	
	sendStack(callback);
}

function callback(){

	ouptutErrors = true;

	switchTurn(true);
}

function chooseRandomSpot() {

	var row = Math.floor(Math.random() * (height - 1));
	var col = Math.floor(Math.random() * (coordinates[row].length - 1));

	while (coordinates[row][col]["state"] !== "e" || !valid(coordinates[row][col])) {

		var row = Math.floor((Math.random() * (height - 1)) + 1);
		var col = Math
				.floor((Math.random() * (coordinates[row].length - 1)) + 1);
	}

	saveMountain(coordinates[row][col]);
}

function checkAndPutMointain(coordinate){
	
	if (!valid(coordinate)) {
		return false;
	}

	saveMountain(coordinate);
	
	return true;
}

function saveMountain(coordinate){
	
	putMountain(coordinate);

	collect(coordinate, 'm');
}

function putMountain(coordinate) {

	$("#img_" + coordinate["id"]).attr("src", "../imgz/mountain.png");
	coordinate["state"] = "m";
	
	decreaseMountains(turn);
}

function showRetrievedMountain(coordinate){
	
	putMountain(coordinate);
}

function valid(coordinate) {
	
	var string = [];
	
	coordinate["state"] = "m";

	if (starFailed(coordinate, string)) {
		
		coordinate["state"] = "e";
		
		if(ouptutErrors){
			alert("stars are not allowed...");
		}
		
		return false;
	}
	
	coordinate["state"] = "e";

	if (triagleFailed(coordinate)) {
		
		if(ouptutErrors){
			alert("triangles are not allowed...");
		}
		
		return false;
	}

	if (tooLongFailed(coordinate)) {

		if(ouptutErrors){
			alert("only 1 chain of four and others of 3 are allowed...");	
		}

		return false;
	}

  if (fourFailed(coordinate)) {
	  
		if(ouptutErrors){
			alert("only one chain of four is allowed...");
		}
	  
	  return false; 
  }
  
  if (bordersFailed(coordinate)) {
	  
	  if(ouptutErrors){
		  alert("placing on the borders is only allowed if there is an inwards connection...");
	  }
	  
	  return false; 
  }
	 

	return true;
}

function tooLongFailed(coordinate) {

	var neighbours = getNeighboursFromCoordinate(coordinate);
	
	var string = [{coordinate}];

	for (var i = 0; i < neighbours.length; i++) {
		if(neighbours[i]["state"]=="m"){
			addAll(neighbours[i], string, "m");
		}
	}

	 return 4 < string.length;
}

function fourFailed(coordinate) {

	var neighbours = getNeighboursFromCoordinate(coordinate);
	
	var string = [];
	
	string.push(coordinate);

	for (var i = 0; i < neighbours.length; i++) {
		if(neighbours[i]["state"]=="m"){
			addAll(neighbours[i], string, "m");
		}
	}
	
	if(string.length == 4 && fourMade){
		return true;
	}
	
	if(string.length == 4){
		fourMade = true;
	}

	return false;
}

function bordersFailed(coordinate){
	
	if(coordinate["x"] == 0 && !checkNeighbours(coordinate)){
		
		return true;
	}
	
	if(coordinate["x"] == (height -1) && !checkNeighbours(coordinate)){
		
		return true;
	}

	if(coordinate["y"] == 0 && !checkNeighbours(coordinate)){
		
		return true;
	}

	if(coordinate["y"] == (coordinates[coordinate["x"]].length -1) && !checkNeighbours(coordinate)){
		
		return true;
	}

	return false;
}

function checkNeighbours(coordinate){
	
	var neighbours = getNeighboursFromCoordinate(coordinate);
	
	for (var i = 0; i < neighbours.length; i++) {
		if(neighbours[i]["state"]=="m"){
			return true;
		}
	}
	
	return false;
}

function triagleFailed(coordinate){
	
	var neighbours = getNeighboursFromCoordinate(coordinate);
	
	var indexes = [];
	
	for (var i = 0; i < neighbours.length; i++) {
		if(neighbours[i]["state"]=="m"){
			indexes.push(i);
		}
	}

	if((indexes.includes(0) && indexes.includes(1))
			|| (indexes.includes(1) && indexes.includes(3))
			|| (indexes.includes(3) && indexes.includes(5))
			|| (indexes.includes(4) && indexes.includes(5))
			|| (indexes.includes(2) && indexes.includes(4))
			|| (indexes.includes(0) && indexes.includes(2))
			){
		
		return true;
	}
	
	if(5<=coordinate["x"] && coordinate["x"] <=10 && coordinate["y"] == 0 &&
			(indexes.includes(1) && indexes.includes(2))
			|| (indexes.includes(2) && indexes.includes(3))
			){
		
		return true;
	}

	if(0 <= coordinate["x"]  && coordinate["x"] <= 5 && (coordinate["y"] - coordinate["x"] == 5) &&
			(indexes.includes(1) && indexes.includes(2))
			){
		
		return true;
	}

	return false;
}

function starFailed(coordinate, string){
	
	var neighbours = getNeighboursFromCoordinate(coordinate);
	
	var counter = 0;
	
	if(alreadyIn(coordinate, string)){
		return;
	}

	string.push(coordinate);
	
	for (var i = 0; i < neighbours.length; i++) {
		if(neighbours[i]["state"]=="m"){
			counter++;
		}
	}
	
	if(counter == 3){
		return true;
	}
	
	for (var i = 0; i < neighbours.length; i++) {
		if(neighbours[i]["state"]=="m" && starFailed(neighbours[i], string)){
			return true;
		}
	}
	
	return false;
}

function decreaseMountains(color) {

	if (color == 'r') {
		mountainsLeftRed--;
	} else if (color == 'y') {
		mountainsLeftYellow--;
	} else {
		alert("invalid color for decrease");
	}
	
	if(color == ownColor){
		
		if (color == 'r') {
			$("#info").html(mountainsLeftRed + " Left");
		} else if (color == 'y') {
			$("#info").html(mountainsLeftYellow + " Left");
		} else {
			alert("invalid color for decrease (somehow)");
		}
	}
}
