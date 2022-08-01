function done() {

	alert("let's count...");

}

function prepareTerritory() {

	var rowLength = Math.round(height / 2);

	for (var row = 0; row < height; row++) {

		for (var col = 0; col < rowLength; col++) {

			tryToColor(coordinates[row][col]);
		}

		if (row < middleRow) {

			rowLength++;

		} else {

			rowLength--;
		}

	}

}

function tryToColor(coordinate) {

	if (coordinate["claimed"] == "no" && coordinate["state"] == "e") {

		var color = tryToClaim(coordinate);

		if (color != "undetermined") {

			claim(coordinate, color);
		}
	}
}

function tryToClaim(coordinate) {

	var string = [];

	var color = "e";

	var neighbours = getNeighboursFromCoordinate(coordinate);

	for (var i = 0; i < neighbours.length; i++) {

		if (neighbours[i]["state"] != "e" && neighbours[i]["state"] != "m") {

			if (color != "e" && neighbours[i]["state"] != color) {

				return "undetermined";
			}

			color = neighbours[i]["state"];
		}
	}

	return claimRecursively(coordinate, string, color);
}

function claimRecursively(coordinate, string, claimedColor) {

	if (!alreadyIn(coordinate, string)) {

		string.push(coordinate);

	} else {

		return claimedColor;
	}

	var neighbours = getNeighboursFromCoordinate(coordinate);

	for (var i = 0; i < neighbours.length; i++) {

		if (neighbours[i]["state"] != "e" && neighbours[i]["state"] != "m") {

			if (claimedColor != "e") {

				if (neighbours[i]["state"] != claimedColor) {

					return "undetermined";
				}

			} else {

				claimedColor = neighbours[i]["state"];
			}

		} else if (neighbours[i]["state"] == "e") {

			var newNeighbourColor = claimRecursively(neighbours[i], string,
					claimedColor);

			if (claimedColor != "e" && newNeighbourColor != claimedColor) {

				return "undetermined";

			} else if (newNeighbourColor != "e") {

				claimedColor = newNeighbourColor;

			}
		}
	}

	return claimedColor;
}

function claim(coordinate, color) {

	var string = [];

	colorOpaque(coordinate, color);

	claimAll(coordinate, color, string, true);
}

function claimAll(coordinate, color, string) {

	if (!alreadyIn(coordinate, string)) {

		string.push(coordinate);

	} else {

		return;
	}

	var neighbours = getNeighboursFromCoordinate(coordinate);

	for (var i = 0; i < neighbours.length; i++) {

		if (neighbours[i]["state"] == "e") {

			colorOpaque(coordinate, color);

			claimAll(neighbours[i], color, string)
		}
	}
}

function colorOpaque(coordinate, color) {

	if (color == "y") {

		$("#img_c_" + coordinate["id"]).attr("src", "../imgz/yellow.png");

	} else if (color == "r") {

		$("#img_c_" + coordinate["id"]).attr("src", "../imgz/red.png");

	} else {

		$("#img_c_" + coordinate["id"]).attr("src", "");

		coordinate["claimed"] = "no";

		return;
	}

	coordinate["claimed"] = "yes";
}

function tryToColorNeighbours(coordinate) {

	var neighbours = getNeighboursFromCoordinate(coordinate);

	for (var i = 0; i < neighbours.length; i++) {

		tryToColor(neighbours[i]);
	}
}

function unClaim(coordinate) {

	var string = [];

	var neighbours = getNeighboursFromCoordinate(coordinate);

	for (var i = 0; i < neighbours.length; i++) {

		if (neighbours[i]["state"] == "e" && neighbours[i]["claimed"] == "yes") {
			unClaimAll(neighbours[i], string);
		}
	}
}

function unClaimAll(coordinate, string) {

	if (!alreadyIn(coordinate, string)) {

		string.push(coordinate);

	} else {

		return;
	}

	colorOpaque(coordinate, "e");

	var neighbours = getNeighboursFromCoordinate(coordinate);

	for (var i = 0; i < neighbours.length; i++) {

		if (neighbours[i]["state"] == "e" && neighbours[i]["claimed"] == "yes") {

			unClaimAll(neighbours[i], string);
		}
	}
}