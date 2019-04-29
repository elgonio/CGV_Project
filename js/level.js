var rowGroup = new THREE.Group();

class LevelManager{

	constructor(difficulty, zPosSpawn){
		this.difficulty = difficulty;
		this.zPosSpawn = zPosSpawn;
		this.row = rowGroup;
	}

	instantiateRow(){
		rowGroup = new THREE.Group();
		scenario3();
		this.row = rowGroup
		this.row.position.set(0, 0, this.zPosSpawn);
	}

	get_row(){
		return this.row;
	}
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
		
		if(loop == chosenPrimaryColour){
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
	}

}


