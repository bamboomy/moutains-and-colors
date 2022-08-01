function getNeighboursFromCoordinate(coordinate) {
	return getNeighbours(coordinate["x"], coordinate["y"]);
}

function getNeighbours(x, y) {

	var neighbours = [];

	if (x < 0 || height <= x) {
		alert("illegal x");
	}

	// alert(x);

	if (y < 0 || coordinates[x].length <= y) {
		alert("illegal y");
	}

	if (0 < x) {

		var newArray = neighbours.concat(getTopOnes(x, y));

		neighbours = newArray;
	}

	var newArray = neighbours.concat(getSiblings(x, y));

	neighbours = newArray;

	if (x < height - 1) {

		var newArray = neighbours.concat(getBottomOnes(x, y));

		neighbours = newArray;
	}

	return neighbours;
}

function getTopOnes(x, y) {

	var topOnes = [];

	var delta = 0;

	if (middleRow < x) {
		delta = 1;
	}

	if (0 < y + delta) {
		topOnes.push(coordinates[x - 1][y - 1 + delta]);
	}

	if (y + delta < coordinates[x - 1].length) {
		topOnes.push(coordinates[x - 1][y + delta]);
	}

	return topOnes;
}

function getSiblings(x, y) {

	var siblings = [];

	if (0 < y) {
		siblings.push(coordinates[x][y - 1]);
	}

	if (y + 1 < coordinates[x].length) {
		siblings.push(coordinates[x][y + 1]);
	}

	return siblings;
}

function getBottomOnes(x, y) {

	var bottomOnes = [];

	var delta = 0;

	if (x < middleRow) {
		delta = 1;
	}

	if (0 < y + delta) {
		bottomOnes.push(coordinates[x + 1][y - 1 + delta]);
	}

	if (y + delta < coordinates[x + 1].length) {
		bottomOnes.push(coordinates[x + 1][y + delta]);
	}

	return bottomOnes;
}

function putStone(coordinate) {

	var suffix = getStoneColorOfTurn(turn) + ".png";

	$("#img_" + coordinate["id"]).attr("src", "../imgz/" + suffix);

	coordinate["state"] = turn;

	return true;
}

function markStoneDead(coordinate) {

	if (coordinate["dead"]) {

		var string = [];
	
		markGroupAlive(coordinate, string);
		
		return true;
	}

	if (coordinate["state"] != 'r' && coordinate["state"] != 'y') {
		return false;
	}
	
	var string = [];

	markGroupDead(coordinate, string);
	
	return true;
}

function markGroupDead(coordinate, string){
	
	if (!alreadyIn(coordinate, string)) {

		string.push(coordinate);
	
	} else {
		
		return;
	}

	var neighbours = getNeighboursFromCoordinate(coordinate);

	for (var i = 0; i < neighbours.length; i++) {

		if (neighbours[i]["state"] == coordinate["state"]) {
			
			markGroupDead(neighbours[i], string);
		}
	}

	var imgString = $("#img_" + coordinate["id"]).attr("src");

	var res = imgString.split(".png");

	var suffix = "_p.png";

	$("#img_" + coordinate["id"]).attr("src", res[0] + suffix);

	coordinate["state"] = getInverseFromColor(coordinate["state"]);

	tryToColorNeighbours(coordinate);

	coordinate["dead"] = true;
}

function markGroupAlive(coordinate, string){
	
	if (!alreadyIn(coordinate, string)) {

		string.push(coordinate);
	
	} else {
		
		return;
	}

	var neighbours = getNeighboursFromCoordinate(coordinate);

	for (var i = 0; i < neighbours.length; i++) {

		if (neighbours[i]["state"] == coordinate["state"] && neighbours[i]["dead"]) {
			
			markGroupAlive(neighbours[i], string);
		}
	}

	coordinate["state"] = getInverseFromColor(coordinate["state"]);

	var imgString = $("#img_" + coordinate["id"]).attr("src");

	var res = imgString.split("_p.png");

	var suffix = ".png";

	$("#img_" + coordinate["id"]).attr("src", res[0] + suffix);
	
	coordinate["dead"] = false;
	
	unClaim(coordinate);
}

function isEmpty(coordinate) {

	return coordinate["state"] == "e";
}

function neutralizeAll(coordinate, color) {

	removeStone(coordinate);

	var neighbours = getNeighboursFromCoordinate(coordinate);

	for (var i = 0; i < neighbours.length; i++) {
		if (neighbours[i]["state"] == color) {
			neutralizeAll(neighbours[i], color);
		}
	}
}

function removeStone(coordinate) {

	$("#img_" + coordinate["id"]).attr("src", "");

	coordinate["state"] = "e";
}