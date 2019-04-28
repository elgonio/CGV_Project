class LevelManager{

	constructor(difficulty){
		this.difficulty = difficulty;
	}

	instantiateRow(){
		var row = new Three.Group();


		scene.add(row);
	}
}

//Scenario of 1 of each primary colour and maybe 1 mixed colour
function scenario1(){
	var checkBlue = -1;
	var checkRed = -1;
	var checkYellow = -1;
	var checkMixed = -1;
	var randNum = Math.floor((Math.random() * 5));

	checkBlue = randNum;
	while (randNum == checkBlue) {
		 randNum = Math.floor((Math.random() * 5));
	}
	checkRed = randNum;
	while (randNum == checkBlue || randNum == checkRed) {
		 randNum = Math.floor((Math.random() * 5));
	}
	checkYellow = randNum;
	randNum = Math.floor((Math.random() * 2));;
	if (randNum == 1) {
		while (randNum == checkBlue || randNum == checkRed || randNum == checkYellow) {
			 randNum = Math.floor((Math.random() * 5));
		}
		checkMixed = randNum;
	}

	var xPos = -10;
}