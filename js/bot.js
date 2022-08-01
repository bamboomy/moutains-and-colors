
function generateMove() {

	if (phase == "play") {

		var x = Math.floor(Math.random() * (height - 1));

		var y = Math.floor(Math.random() * calculateLength(x));

		while (unwindLegal(coordinates[x][y])) {

			x = Math.floor(Math.random() * (height - 1));

			y = Math.floor(Math.random() * calculateLength(x));
		}

		tap(x, y);

	} else if (phase == "mountain" && mountainsLeftYellow != 0) {

		putRandom();
	}

}

function unwindLegal(coordinate) {

	var newStone = !isEmpty(coordinate) || isSuicide(coordinate);

	if (!newStone) {

		backUpCurrentSituation();

		if (ko(coordinate)) {

			newStone = true;

		} else {

			rollback();
		}
	}

	return newStone;
}

function calculateLength(y) {

	if (y > Math.round(height / 2) - 1) {

		return height - 1 - (y - Math.round(height / 2));

	} else {

		return Math.round(height / 2) + y;
	}
}