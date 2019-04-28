var rowGroup = new THREE.Group();

class LevelManager{

	constructor(difficulty, zPosSpawn){
		this.difficulty = difficulty;
		this.zPosSpawn = zPosSpawn;
		this.row = rowGroup;
	}

	instantiateRow(){
		rowGroup = new THREE.Group();
		scenario1();
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
	console.log("RandNum Generated: "+randNum);
	checkBlue = randNum;
	while (randNum == checkBlue) {
		 randNum = Math.floor((Math.random() * 5));
	}
	console.log("RandNum Generated: "+randNum);
	checkRed = randNum;
	while (randNum == checkBlue || randNum == checkRed) {
		 randNum = Math.floor((Math.random() * 5));
	}
	console.log("RandNum Generated: "+randNum);
	checkYellow = randNum;
	randNum = Math.floor((Math.random() * 2));
	console.log("RandNum Generated: "+randNum);
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
			randNum = Math.floor((Math.random() * 4)+1);
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

function scenerio2(){
	
}



