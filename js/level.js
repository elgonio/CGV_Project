var rowGroup = new THREE.Group();
var rowObjGroup = [];
var movingBlockArray = [];
var clock = new THREE.Clock();
var time = 0;
var delta = 0; //For consistent movement across different FPS rates
var direction = new THREE.Vector3(0, 0, 1);


class LevelManager{

	constructor(difficulty, zPosSpawn, zSpawnDistInterval){
		this.difficulty = difficulty; //Easy or Avg or Hard
		this.zSpawnDistInterval = zSpawnDistInterval;
		this.zPosSpawn = zPosSpawn;
		this.rowGroupArray = [];
		this.rowObjGroupArray = [];
		this.powerUpArray = [];
		this.allRows = new THREE.Group(); 
		this.powerUpObjArray = [];
		this.score = 0;
		this.scoreEnabled = true; 
		this.gameOver = false
		this.speed = 40;

		switch(this.difficulty){

			case "Easy":
				this.speed = 35;
				this.zSpawnDistInterval = 150;
				break;
			case "Avg":
				this.speed = 40;
				this.zSpawnDistInterval = 135;
				break;
			case "Hard":
				this.speed = 45;
				this.zSpawnDistInterval = 120;
				break;
		}
	}
	generateRows(){

		for (var i = 0; i < 20; i++) { //Max 20 generated row combinations that will loop
			rowGroup = new THREE.Group();
			rowObjGroup = [];
			var scenarioNum = Math.floor((Math.random() * 5)+1);
			switch(scenarioNum){
				case 1:
					scenario1();
					break;
				case 2:
					scenario2();
					break;
				case 3:
					scenario3();
					break;
				case 4:
					scenario4();
					break;
				case 5:
					scenarioMovingBlock();
					break;
			}
			rowGroup.position.set(0, 0, this.zPosSpawn - i*this.zSpawnDistInterval);

			//Chance to spawn a power up
			//var randNum = Math.floor(Math.random()*5 + 1);
			//if(randNum == 1){ //1 in 5 chance to spawn a power up
			var powerUp = new PowerUp();
			powerUp.get_mesh().position.set(0, 0, this.zPosSpawn - i*this.zSpawnDistInterval - 50);
			this.powerUpArray.push(powerUp.get_mesh());
			this.powerUpObjArray.push(powerUp);
			this.allRows.add(powerUp.get_mesh());
			//}


			this.rowObjGroupArray.push(rowObjGroup);//For obtaining collision info
			this.rowGroupArray.push(rowGroup); //For animation purposes
			this.allRows.add(rowGroup); //For rendering purposes
			//console.log(this.rowObjGroupArray);
			
		}
	}

	handleMovement(){
		delta = globalDelta;
		//console.log(delta);
        
        if(this.difficulty == "easy"){
        	this.speed = 40;
        	var arrayLength = this.rowGroupArray.length;
        	for (var i = 0; i <= arrayLength-1; i++) {
	 			this.rowGroupArray[i].position.addScaledVector(direction, this.speed*delta);
	 			if(this.rowGroupArray[i].position.z > 15){
	 				this.rowGroupArray[i].position.z = 15 + (-1)*this.zSpawnDistInterval*20 //Loops around again
	 				this.scoreEnabled = true; //To allow scoring again since the row has moved to the back of the line of incoing rows again
	 			}

	 			for (var k = 0; k < this.rowGroupArray[i].children.length; k++) {
	 				var block = this.rowObjGroupArray[i][k];
	 				block.handleMovement();
	 			}
        	} 
        	arrayLength = movingBlockArray.length;		
        	for (var i = 0; i <= arrayLength-1; i++) {
	 			movingBlockArray[i].handleMovement();
        	} 

        	arrayLength = this.powerUpArray.length;
        	for (var i = 0; i <= arrayLength-1; i++){
        		this.powerUpObjArray[i].handleMovement();
				this.powerUpArray[i].position.addScaledVector(new THREE.Vector3(0,0,1), this.speed*delta); //make power up move down the track when it spawns
        	}
        }

	}

	handleScoring(){
		var arrayLength = this.rowGroupArray.length;
    	for (var i = 0; i <= arrayLength-1; i++) {
 			if(this.rowGroupArray[i].position.z > 5 && this.scoreEnabled == true && this.gameOver == false){
 				this.score += 1;
 				this.scoreEnabled = false; //To control scoring to only increment by 1 (otherwise the score would increment by 1 for every frame)
				 console.log("Score: "+this.score);
				if (!lost) 
				{
					var ScoreText = document.getElementById("ScoreText");
 					ScoreText.innerHTML = "Score: "+this.score;
				}
 				
 			}
    	} 
	}
	// checks if a given player collides with any obstacle in this level
	// returns true if the ball is ok
	// returns false otherwise
	// this should probaly be renamed to something more intuitive
	checkCollisions(player_ball)
	{
		var player_pos = new THREE.Vector3( );

		player_ball.sphere.getWorldPosition(player_pos);
		

		for (var i = 0; i <= this.rowGroupArray.length-1; i++) {
			for (var k = 0; k < this.rowGroupArray[i].children.length; k++) {
				var block = this.rowObjGroupArray[i][k];
				var block_pos = new THREE.Vector3( );
				block.get_mesh().getWorldPosition(block_pos);

				var size = block.size/2; // radius of block there
				if(block_pos.distanceTo(player_pos) < player_ball.size + size){
					// COLLIDE
					// now we check if the colours are matching		
					if(block.get_colour() == player_ball.get_colour()){
						// do nothing
					}
					else{
						console.log("Block Colour: "+block.get_colour());
						console.log("Player Colour: "+player_ball.get_colour());
						return false;
					}
				}
			}
			
	   } 

	   return true;
	}

	//Render this node object
	get_allRows(){
		//console.log("rendering row");
		return this.allRows;
	}



	/* Testing Functions
	generateSingleRow(){
		rowGroup = new THREE.Group();
		scenario1();
		rowGroup.position.set(0, 0, this.zPosSpawn);
		console.log(rowGroup);
		this.rowGroupArray.push(rowGroup); //For animation purposes
		this.allRows.add(rowGroup); //For rendering purposes	
	}

	handleSingleRowAnim(){
		delta = clock.getDelta();
        
        if(this.difficulty == "easy"){
        	speed = 50;
 			this.rowGroupArray[0].position.addScaledVector(direction, speed*delta);
 			if(this.rowGroupArray[0].position.z > 15){
 				this.rowGroupArray[0].position.z = this.zPosSpawn - this.zSpawnDistInterval*26 //Loops around again
 			}		 
        }
	}
*/


}

//Scenario of 1 of each primary colour and maybe 1 mixed colour
function scenario1(){

	var checkBlue = -1;
	var checkRed = -1;
	var checkYellow = -1;
	var checkMixed = -1;
	var randNum = Math.floor((Math.random() * 5));
	//console.log("RandNum Generated: "+randNum);
	checkBlue = randNum;
	while (randNum == checkBlue) {
		 randNum = Math.floor((Math.random() * 5));
	}
	//console.log("RandNum Generated: "+randNum);
	checkRed = randNum;
	while (randNum == checkBlue || randNum == checkRed) {
		 randNum = Math.floor((Math.random() * 5));
	}
	//console.log("RandNum Generated: "+randNum);
	checkYellow = randNum;
	randNum = Math.floor((Math.random() * 2));
	//console.log("RandNum Generated: "+randNum);
	if (randNum == 1) {
		while (randNum == checkBlue || randNum == checkRed || randNum == checkYellow) {
			 randNum = Math.floor((Math.random() * 5));
		}
		checkMixed = randNum;
	}

	var tempBlock;

	for (var loop = 0; loop < 5; loop++) {
		
		if(loop == checkBlue){
			tempBlock = new BlockObstacle("blue",loop,"standard");
		}
		else if (loop == checkRed){
			tempBlock = new BlockObstacle("red",loop,"standard");
		}
		else if(loop == checkYellow){
			tempBlock = new BlockObstacle("yellow",loop,"standard");
		}
		else if(loop == checkMixed){
			randNum = Math.floor((Math.random() * 3)+1);
			switch (randNum) {
			case 1: //Green
				tempBlock = new BlockObstacle("green",loop,"standard");
				break;
			case 2: //Orange
				tempBlock = new BlockObstacle("orange",loop,"standard");
				break;
			case 3: //Purple
				tempBlock = new BlockObstacle("purple",loop,"standard");
				break;
			default:
				break;
			}
		}
		else{
			tempBlock = new BlockObstacle("grey",loop,"standard");
		}
		rowGroup.add(tempBlock.get_mesh());
		rowObjGroup.push(tempBlock);
	}
	
}

//spawn 1 mixed and 1 primary
function scenario2(){

	var checkPrimary = -1;
	var checkMixed = -1;

	var randNum = Math.floor((Math.random() * 5));

	checkPrimary = randNum;
	while (randNum == checkPrimary) {
		 randNum = Math.floor((Math.random() * 5));
	}
	checkMixed = randNum;

	var chosenPrimaryColour = Math.floor((Math.random() * 3) +1);
	//1 = Blue
	//2 = Red
	//3 = Yellow

	var tempBlock;

	for (var loop = 0; loop < 5; loop++) {
		
		if(loop == checkPrimary){
			switch(chosenPrimaryColour){
				case 1: //Blue
					tempBlock = new BlockObstacle("blue",loop,"standard");
					break;
				case 2: //Red
					tempBlock = new BlockObstacle("red",loop,"standard");
					break;
				case 3: //Yellow
					tempBlock = new BlockObstacle("yellow",loop,"standard");
					break;
				default:
					break;
			}
		}
		else if(loop == checkMixed){
			switch (chosenPrimaryColour) {
			case 1: //if primary blue then make mixed orange 
				tempBlock = new BlockObstacle("orange",loop,"standard");
				break;
			case 2: //if primary red then make mixed green 
				tempBlock = new BlockObstacle("green",loop,"standard");
				break;
			case 3: //if primary yellow then make mixed purple 
				tempBlock = new BlockObstacle("purple",loop,"standard");
				break;
			default:
				break;
			}
		}
		else{
			tempBlock = new BlockObstacle("grey",loop,"standard");
		}
		rowGroup.add(tempBlock.get_mesh());
		rowObjGroup.push(tempBlock);
	}
}

//spawn a combination of colours that is guarunteed a white block
function scenario3(){
	var checkWhite = Math.floor((Math.random() * 5));
	var randNum;

	var tempBlock;

	for (var loop = 0; loop < 5; loop++) {
		
		if(loop == checkWhite){
			tempBlock = new BlockObstacle("white",loop,"standard");
		}
		else{
			randNum = Math.floor((Math.random() * 3));
			if(randNum == 1){ //1 in 3 chance to spawn a block of random colour else make a grey block
				randNum = Math.floor((Math.random() * 7)+1);

				switch(randNum){
					case 1: 
						tempBlock = new BlockObstacle("blue",loop,"standard");
						break;
					case 2: 
						tempBlock = new BlockObstacle("red",loop,"standard");
						break;
					case 3: 
						tempBlock = new BlockObstacle("yellow",loop,"standard");
						break;
					case 4:
						tempBlock = new BlockObstacle("purple",loop,"standard");
						break;
					case 5:
						tempBlock = new BlockObstacle("green",loop,"standard");
						break;
					case 6:
						tempBlock = new BlockObstacle("orange",loop,"standard");
						break;
					case 7:
						tempBlock = new BlockObstacle("white",loop,"standard");
						break;
					default:
						break;
				}
			}
			else{
				tempBlock = new BlockObstacle("grey",loop,"standard");
			}
			
		}
		rowGroup.add(tempBlock.get_mesh());
		rowObjGroup.push(tempBlock);
	}

}

//2 mixed colours and 1 primary colour
function scenario4(){
	var checkMixedColour1 = -1;
	var checkMixedColour2 = -1;
	var checkPrimaryColour = -1;
	var randNum = Math.floor((Math.random() * 5));
	var chosenPrimarycolour = -1;

	checkPrimaryColour = randNum;
	while (randNum == checkPrimaryColour) {
		randNum = Math.floor((Math.random() * 5));
	}
	checkMixedColour1 = randNum;
	while (randNum == checkPrimaryColour || randNum == checkMixedColour1) {
		randNum = Math.floor((Math.random() * 5));
	}
	checkMixedColour2 = randNum;

	chosenPrimarycolour = Math.floor((Math.random() * 3)+1);
	//1 = Blue
	//2 = Red
	//3 = Yellow

	var tempBlock;

	for (var loop = 0; loop < 5; loop++) {

		if (loop == checkPrimaryColour) {

			switch (chosenPrimarycolour) {
			case 1: 
				tempBlock = new BlockObstacle("blue",loop,"standard");
				break;
			case 2: 
				tempBlock = new BlockObstacle("red",loop,"standard");
				break;
			case 3: 
				tempBlock = new BlockObstacle("yellow",loop,"standard");
				break;
			default:
				break;
			}
		} else if (loop == checkMixedColour1) {
			switch (chosenPrimarycolour) {
			case 1: //if blue
				tempBlock = new BlockObstacle("orange",loop,"standard");
				break;
			case 2: //if red
				tempBlock = new BlockObstacle("green",loop,"standard");
				break;
			case 3: //if yellow
				tempBlock = new BlockObstacle("purple",loop,"standard");
				break;
			default:
				break;
			}

		} else if (loop == checkMixedColour2) {
			randNum = Math.floor((Math.random() * 3)+1);
			switch (randNum) {
			case 1: 
				tempBlock = new BlockObstacle("orange",loop,"standard");
				break;
			case 2: 
				tempBlock = new BlockObstacle("green",loop,"standard");
				break;
			case 3: 
				tempBlock = new BlockObstacle("purple",loop,"standard");
				break;
			default:
				tempBlock = new BlockObstacle("purple",loop,"standard");
				break;
			}	
		} else {
			tempBlock = new BlockObstacle("grey",loop,"standard");
		}
		rowGroup.add(tempBlock.get_mesh());
		rowObjGroup.push(tempBlock);
	}	
}

function scenarioMovingBlock(){
	var tempBlock;

	var randNum = Math.floor((Math.random() * 6)+1);
	switch (randNum) {
	case 1: 
		tempBlock = new BlockObstacle("blue",2,"moving");
		break;
	case 2: 
		tempBlock = new BlockObstacle("red",2,"moving");
		break;
	case 3: 
		tempBlock = new BlockObstacle("yellow",2,"moving");
		break;
	case 4:
		tempBlock = new BlockObstacle("orange",2,"moving");
		break;
	case 5:
		tempBlock = new BlockObstacle("purple",2,"moving");

		break;
	case 6:
		tempBlock = new BlockObstacle("green",2,"moving");
		break;
	}
	movingBlockArray.push(tempBlock);
	rowGroup.add(tempBlock.get_mesh());
	rowObjGroup.push(tempBlock);
}

