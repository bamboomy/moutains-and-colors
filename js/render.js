
function init() {

	alert("ready for the sound?");

	var audio = new Audio('../soundz/start.mp3');
	//audio.play();

	var rowLength = Math.round(height / 2);

	for (var row = 0; row < height; row++) {

		var rowIDz = [];

		rowString = "";

		for (var col = 0; col < rowLength; col++) {

			var id = "cell_" + row + "_" + col;

			var state = [];

			state["id"] = id;
			state["state"] = "e";
			state["x"] = row;
			state["y"] = col;
			state["owner"] = "e";
			state["claimed"] = "no";
			state["dead"] = false;

			rowIDz[col] = state;
			
			if(bot){
				yellowNotPlayed.push(state);
				redNotPlayed.push(state);
			}

			if (row == 0) {// eerste rij

				if (col == 0) {
					rowString += "<div class='place'><a id='" + id + "' onclick='tap(" + row + ","
							+ col + ");' ><img src='../imgz/tlc.png' /><img class='count' src='../imgz/nothing.png' id='img_c_" + id + "' />"
							+ "<img class='data' id='img_" + id + "' src='../imgz/nothing.png'/></a></div>";
				} else if (col != rowLength - 1) {
					rowString += "<div class='place'><a id='" + id + "' onclick='tap(" + row + ","
							+ col + ");' ><img src='../imgz/t.png' /><img class='count' src='../imgz/nothing.png' id='img_c_" + id + "' />"
							+ "<img class='data' id='img_" + id + "' src='../imgz/nothing.png'/></a></div>";
				} else {
					rowString += "<div class='place'><a id='" + id + "' onclick='tap(" + row + ","
							+ col + ");' ><img src='../imgz/trc.png' /><img class='count' src='../imgz/nothing.png' id='img_c_" + id + "' />"
							+ "<img class='data' id='img_" + id + "' src='../imgz/nothing.png'/></a></div>";
				}

			} else if (0 < row && row < middleRow) { // tussen bovenste en
				// midden

				if (col == 0) { // links
					rowString += "<div class='place'><a id='" + id + "' onclick='tap(" + row + ","
							+ col + ");' ><img src='../imgz/tl.png' /><img class='count' src='../imgz/nothing.png' id='img_c_" + id + "' />"
							+ "<img class='data' id='img_" + id + "' src='../imgz/nothing.png'/></a></div>";
				} else if (col != rowLength - 1) { // middelste cellen
					rowString += "<div class='place'><a id='" + id + "' onclick='tap(" + row + ","
							+ col + ");' ><img src='../imgz/m.png' /><img class='count' src='../imgz/nothing.png' id='img_c_" + id + "' />"
							+ "<img class='data' id='img_" + id + "' src='../imgz/nothing.png'/></a></div>";
				} else { // rechts
					rowString += "<div class='place'><a id='" + id + "' onclick='tap(" + row + ","
							+ col + ");' ><img src='../imgz/tr.png' /><img class='count' src='../imgz/nothing.png' id='img_c_" + id + "' />"
							+ "<img class='data' id='img_" + id + "' src='../imgz/nothing.png'/></a></div>";
				}

			} else if (row == middleRow) { // middelste rij

				if (col == 0) {// links
					rowString += "<div class='place'><a id='" + id + "' onclick='tap(" + row + ","
							+ col + ");' ><img src='../imgz/ml.png' /><img class='count' src='../imgz/nothing.png' id='img_c_" + id + "' />"
							+ "<img class='data' id='img_" + id + "' src='../imgz/nothing.png'/></a></div>";
				} else if (col != rowLength - 1) {// middle columns
					rowString += "<div class='place'><a id='" + id + "' onclick='tap(" + row + ","
							+ col + ");' ><img src='../imgz/m.png' /><img class='count' src='../imgz/nothing.png' id='img_c_" + id + "' />"
							+ "<img class='data' id='img_" + id + "' src='../imgz/nothing.png'/></a></div>";
				} else {// rechts
					rowString += "<div class='place'><a id='" + id + "' onclick='tap(" + row + ","
							+ col + ");' ><img src='../imgz/mr.png' /><img class='count' src='../imgz/nothing.png' id='img_c_" + id + "' />"
							+ "<img class='data' id='img_" + id + "' src='../imgz/nothing.png'/></a></div>";
				}

			} else if (middleRow < row && row < height - 1) { // tussen
				// bovenste
				// en midden

				if (col == 0) { // links
					rowString += "<div class='place'><a id='" + id + "' onclick='tap(" + row + ","
							+ col + ");' ><img src='../imgz/bl.png' /><img class='count' src='../imgz/nothing.png' id='img_c_" + id + "' />"
							+ "<img class='data' id='img_" + id + "' src='../imgz/nothing.png'/></a></div>";
				} else if (col != rowLength - 1) { // middelste cellen
					rowString += "<div class='place'><a id='" + id + "' onclick='tap(" + row + ","
							+ col + ");' ><img src='../imgz/m.png' /><img class='count' src='../imgz/nothing.png' id='img_c_" + id + "' />"
							+ "<img class='data' id='img_" + id + "' src='../imgz/nothing.png'/></a></div>";
				} else { // rechts
					rowString += "<div class='place'><a id='" + id + "' onclick='tap(" + row + ","
							+ col + ");' ><img src='../imgz/br.png' /><img class='count' src='../imgz/nothing.png' id='img_c_" + id + "' />"
							+ "<img class='data' id='img_" + id + "' src='../imgz/nothing.png'/></a></div>";
				}

			} else {

				if (col == 0) {
					rowString += "<div class='place'><a id='" + id + "' onclick='tap(" + row + ","
							+ col + ");' ><img src='../imgz/blc.png' /><img class='count' src='../imgz/nothing.png' id='img_c_" + id + "' />"
							+ "<img class='data' id='img_" + id + "' src='../imgz/nothing.png'/></a></div>";
				} else if (col != rowLength - 1) {
					rowString += "<div class='place'><a id='" + id + "' onclick='tap(" + row + ","
							+ col + ");' ><img src='../imgz/b.png' /><img class='count' src='../imgz/nothing.png' id='img_c_" + id + "' />"
							+ "<img class='data' id='img_" + id + "' src='../imgz/nothing.png'/></a></div>";
				} else {
					rowString += "<div class='place'><a id='" + id + "' onclick='tap(" + row + ","
							+ col + ");' ><img src='../imgz/brc.png' /><img class='count' src='../imgz/nothing.png' id='img_c_" + id + "' />"
							+ "<img class='data' id='img_" + id + "' src='../imgz/nothing.png'/></a></div>";
				}
			}
		}

		if (row < middleRow) {

			rowLength++;

		} else {

			rowLength--;
		}

		document.getElementById(row).innerHTML = rowString;

		coordinates[row] = rowIDz;
	}
}