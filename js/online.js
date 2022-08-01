
var move = 0;

var postStack = [];

function collect(coordinate, value){
	
	var post = [];

	post['coordinate'] = coordinate;
	post['value'] = value;

	postStack.push(post);
}

function sendStack(callback){
	
	if(postStack.length == 0){
		
		callback();
		
		return;
	}
	
	post = postStack.pop();
	
	$.post( "acceptMove.php", 
		{
			x: post['coordinate']["x"], 
			y: post['coordinate']["y"], 
			value: post['value'], 
			color: turn, 
			moveNr: move 
		}).done(function( data ) {
			
			if(data !== 'it is done'){
			
				alert(data);			
			}

			move++;
			
			sendStack(callback);
		});
}

function persistTurn(turn, poll){

	$.post( "saveTurn.php", 
		{
			turn: turn
		}).done(function( data ) {

			if(poll){
				
				pollTurn();
			}
		});
}

function pollTurn(){
	$.ajax( "getTurn.php" )
		.done(function(data) {

			if(data == ownColor){

				serverColor = data;
			
				getMove();

			}else{
			
				setTimeout(pollTurn, 1000);						
			}
		});
}

function getMove(){
	
	$.post( "getMove.php",
		{
			minMove: move
		}
	)
		.done(function(data) {

			var mangled = data.substr(0, data.length - 1) + "]";

			var movez = JSON.parse(mangled);
			
			var mointain = false;

			for(i = 0; i < movez.length; i++){
				
				if(movez[i]['value'] == 'm'){
					
					showRetrievedMountain(coordinates[movez[i]['x']][movez[i]['y']]);
					
					mointain = true;
				
				} else if(movez[i]['value'] == 's'){
					
					checkSuccess(coordinates[movez[i]['x']][movez[i]['y']]);
				
				} else if(movez[i]['value'] == 'p'){
					
					otherPassed();
				}
				
				move++;
			}
			
			turn = serverColor;
			
			checkListen();
			
			if(mointain){
				
				checkToBeginPlay();
			}
		});
}