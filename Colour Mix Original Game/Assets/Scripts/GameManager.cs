using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using TMPro;

public class GameManager : MonoBehaviour
{

	public class Position
	{
		bool blue;
		bool red;
		bool yellow;

		public Position (bool b, bool r, bool y)
		{
			blue = b;
			red = r;
			yellow = y;
		}

		public Position ()
		{
			blue = false;
			red = false;
			yellow = false;
		}

		public void setBlue (bool state)
		{
			blue = state;
		}

		public void setRed (bool state)
		{
			red = state;
		}

		public void setYellow (bool state)
		{
			yellow = state;
		}

		public void clearAll ()
		{
			blue = false;
			red = false;
			yellow = false;
		}

		public Color getColour ()
		{
			if (blue == true && red == false && yellow == false) { 
				return Color.blue;
			} else if (blue == false && red == true && yellow == false) {
				return Color.red;
			} else if (blue == false && red == false && yellow == true) {
				return Color.yellow;
			} else if (blue == true && red == true && yellow == false) {
				return (new Color (0.85f, 0, 1, 1)); //purple
			} else if (blue == true && red == false && yellow == true) {
				return Color.green;
			} else if (blue == false && red == true && yellow == true) {
				return (new Color (1f, 0.45f, 0f, 1f)); //orange
			} else if (blue == true && red == true && yellow == true) {
				return Color.white;
			} else {
				return Color.white;
			}
		}



	}

	enum Colour {Blue, Red, Yellow, Purple, Green, Orange, White};

	public Position[] positionArray = new Position[10];

	public GameObject normalBlock;
	public GameObject movingBlock;
	public GameObject scoreBlock;
	private GameObject blockClone;
	public GameObject fastBlockParticles;
	private Rigidbody cloneRB;
	public float fallSpeed = 10f;
	private float originalFallSpeed = 10f;
	public float fastBlockFallSpeedFactor = 3.5f;
	public float zPosBlockSpawn = 30f;

	private Renderer blockRend;

	private float startTime;
	public float blockSpawnDelay = 2f;
	private float originalBlockSpawnDelay = 2f;
	private bool fastRowSpawned = true;
	//private float sceneStartTime;

	//public GameObject p1, p2, p3;

	protected bool isGameOver = false;
	//public GameObject gameOverText;
	private Scene thisScene;


	public AudioSource source;
	public AudioClip fbSpawnSound;

	public enum LevelType {Easy, Normal, Hard, Tutorial}
	public LevelType level;

	///////////////////////////////Tutorial Variables////////////////////////////////////

	private int progressNum = 1;
	private int rowCount = 0;
	public TMP_Text whatToDoText;
	private float sceneStartTime;
	/////////////////////////////////////////////////////////////////////////////////////


	// Use this for initialization
	void Start ()
	{
		source = this.GetComponent<AudioSource> ();
		//startTime = Time.time;
		//gameOverText.SetActive (false);
		initialisePositionArray ();
		positionArray [5].setBlue (true);
		positionArray [7].setRed (true);
		positionArray [9].setYellow (true);
		sceneStartTime = Time.time;
		originalFallSpeed = fallSpeed;
		originalBlockSpawnDelay = blockSpawnDelay;
		instantiateRow ();
		GameObject.Find ("SceneDataPasser").GetComponent<AudioSource> ().Stop ();
		progressNum = 1;

	}

	// Update is called once per frame
	void Update ()
	{
				
		if (isGameOver == false) {
			if (Time.time >= startTime + blockSpawnDelay) {
				instantiateRow ();
				//Debug.Log ("Scene Start Time: " + Time.time);
			}
		} else {
			if (Input.GetKeyDown (KeyCode.R)) {
				thisScene = SceneManager.GetActiveScene ();
				SceneManager.LoadScene (thisScene.name);
			}
		}
		if (level == LevelType.Tutorial && (Time.time >= sceneStartTime + 42.5f)) {
			whatToDoText.text = "Listen out for these charging blocks";
		}
		else if (level == LevelType.Tutorial && (Time.time >= sceneStartTime + 34.5f)) {
			whatToDoText.text = "Remember you can move forward and backward as well";
		}
		else if (level == LevelType.Tutorial && (Time.time >= sceneStartTime + 23f)) {
			whatToDoText.text = "All 3 players must mix to form white";
		}
		else if (level == LevelType.Tutorial && (Time.time >= sceneStartTime + 11.3f)) {
			whatToDoText.text = "Mix colours to form new colours";
		} 


	}
	void initialisePositionArray(){
		for (int i = 0; i < 10; i++) {
			positionArray [i] = new Position ();
		}
	}
		

	void instantiateRow ()
	{
		blockClone = Instantiate (scoreBlock, new Vector3 (0f, 1f, zPosBlockSpawn), Quaternion.identity); //spawn score collider
		cloneRB = blockClone.GetComponent<Rigidbody> ();
		cloneRB.velocity = Vector3.back * fallSpeed;

		if (level == LevelType.Tutorial) {

			switch (progressNum) {
			case 1: //primary 3 colours
				scenario1();
				break;
			case 2: //one mixed colour and 1 primary 
				if (rowCount == 0) {
					scenarioSpecifiedMixedColour (1);
				} else if (rowCount == 1) {
					scenarioSpecifiedMixedColour (2);
				} else if (rowCount == 2) {
					scenarioSpecifiedMixedColour (3);
				}
				break;
			case 3: //white colour
				scenario4();
				break;
			case 4: //moving blocks
				ScenarioMovingBlocks();
				break;
			case 5: //fast blocks
				ScenarioFastBlock();
				break;
			case 6:
			default: //Finished Tutorial
				whatToDoText.enabled = false;
				GameOver ();
				GameObject.Find ("ScoreCollider").SendMessage ("GameOver");
				TMP_Text tempText = GameObject.Find ("txt_PanelTitle").GetComponent<TMP_Text>();
				tempText.text = "Tutorial Finished!";
				break;
			}
			rowCount++;
			if (rowCount == 3) {
				progressNum++;
				rowCount = 0;
			}

		} else if (level == LevelType.Easy) {
			
			if (Time.time >= sceneStartTime + 50f) {
				blockSpawnDelay = 2.8f;
			}
			else if (Time.time >= sceneStartTime + 30f) {
				blockSpawnDelay = 3f;
			}
			else if (Time.time >= sceneStartTime + 15f) {
				blockSpawnDelay = 3.25f;
			}

			int randNum = Random.Range (1, 100);
			if (randNum < 50) {
				scenario1 ();
			} else if (randNum < 70) {
				scenario2 ();
			} else if (randNum < 80) {
				scenario3 ();
			} else if (randNum < 100) {
				scenario4 ();
			} else {
				scenario1 ();
			}


		} else if (level == LevelType.Normal) {
			Debug.Log (Time.time);
			if (Time.time >= sceneStartTime + 45f) {
				blockSpawnDelay = 2.5f;
				fastBlockFallSpeedFactor = 2.2f;
			}
			else if (Time.time >= sceneStartTime + 30f) {
				blockSpawnDelay = 2.8f;
			}
			else if (Time.time >= sceneStartTime + 15f) {
				blockSpawnDelay = 3f;
			}

			int randNum = Random.Range (1, 151);
			if (randNum < 30) {
				scenario1 ();
			} else if (randNum < 55) {
				scenario2 ();
			} else if (randNum < 85) {
				scenario3 ();
			} else if (randNum < 105) {
				scenario4 ();
			} else if (randNum < 130) {
				ScenarioFastBlock ();

				blockClone = Instantiate (scoreBlock, new Vector3 (0f, 1f, zPosBlockSpawn), Quaternion.identity); //spawn score collider
				cloneRB = blockClone.GetComponent<Rigidbody> ();
				cloneRB.velocity = Vector3.back * fallSpeed*fastBlockFallSpeedFactor;

				int randNum2 = Random.Range (1, 100);
				if (randNum < 30) {
					scenario1 ();
				} else if (randNum2 < 60) {
					scenario2 ();
				} else if (randNum2 < 70) {
					scenario3 ();
				} else if (randNum2 < 90) {
					scenario4 ();
				} else if (randNum2 < 100) {
					ScenarioMovingBlocks ();
				} else {
					ScenarioMovingBlocks ();
				}
			} else {
				ScenarioMovingBlocks ();
			}

		} else if (level == LevelType.Hard) {
			Debug.Log (Time.time);

			if (Time.time >= sceneStartTime + 40f) {
				blockSpawnDelay = 2.5f;
				fastBlockFallSpeedFactor = 2.2f;
			}
			else if (Time.time >= sceneStartTime + 30f) {
				blockSpawnDelay = 2.7f;
			}
			else if (Time.time >= sceneStartTime + 15f) {
				blockSpawnDelay = 2.9f;
			}

			int randNum = Random.Range (1, 151);
			if (randNum < 25) {
				scenario1 ();
			} else if (randNum < 55) {
				scenario2 ();
			} else if (randNum < 80) {
				scenario3 ();
			} else if (randNum < 95) {
				scenario4 ();
			} else if (randNum < 130) {
				ScenarioFastBlock ();

				blockClone = Instantiate (scoreBlock, new Vector3 (0f, 1f, zPosBlockSpawn), Quaternion.identity); //spawn score collider
				cloneRB = blockClone.GetComponent<Rigidbody> ();
				cloneRB.velocity = Vector3.back * fallSpeed*fastBlockFallSpeedFactor;

				int randNum2 = Random.Range (1, 120);
				if (randNum < 35) {
					scenario1 ();
				} else if (randNum2 < 55) {
					scenario2 ();
				} else if (randNum2 < 65) {
					scenario3 ();
				} else if (randNum2 < 85) {
					scenario4 ();
				} else if (randNum2 < 95) {
					ScenarioMovingBlocks ();
				} else {
					ScenarioFastBlock ();
					scenario4 ();
				}
			} else {
				ScenarioMovingBlocks ();
			}
		}
		startTime = Time.time;
///////////////////////////////////////////////////////////////////////////////////////////////

		/*
		blockClone = Instantiate (scoreBlock, new Vector3 (0f, 1f, zPosBlockSpawn), Quaternion.identity); //spawn score collider
		cloneRB = blockClone.GetComponent<Rigidbody> ();
		cloneRB.velocity = Vector3.back * fallSpeed;

		int randNum = Random.Range (1, 151);
		if (randNum < 25) {
			scenario1 ();
		} else if (randNum < 50) {
			scenario2 ();
		} else if (randNum < 75) {
			scenario3 ();
		} else if (randNum < 100) {
			scenario4 ();
		} else if (randNum < 125) {
			ScenarioFastBlock ();

			blockClone = Instantiate (scoreBlock, new Vector3 (0f, 1f, zPosBlockSpawn), Quaternion.identity); //spawn score collider
			cloneRB = blockClone.GetComponent<Rigidbody> ();
			cloneRB.velocity = Vector3.back * fallSpeed*fastBlockFallSpeedFactor;

			int randNum2 = Random.Range (1, 125);
			if (randNum < 25) {
				scenario1 ();
			} else if (randNum2 < 50) {
				scenario2 ();
			} else if (randNum2 < 75) {
				scenario3 ();
			} else if (randNum2 < 100) {
				scenario4 ();
			} else if (randNum2 < 125) {
				ScenarioMovingBlocks ();
			} else {
				ScenarioMovingBlocks ();
			}
		} else {
			ScenarioMovingBlocks ();
		}
		startTime = Time.time;
		*/
	}

	void scenario1 ()
	{ //spawn 1 of each colour block and maybe 1 extra mixed colour
		int checkBlue = -1;
		int checkRed = -1;
		int checkYellow = -1;
		int checkAddColour = -1;
		int randNum = Random.Range (0, 5);
		checkBlue = randNum;
		while (randNum == checkBlue) {
			randNum = Random.Range (0, 5);
		}
		checkRed = randNum;
		while (randNum == checkBlue || randNum == checkRed) {
			randNum = Random.Range (0, 5);
		}
		checkYellow = randNum;


		randNum = Random.Range (0, 2);
		if (randNum == 1) {
			while (randNum == checkBlue || randNum == checkRed || randNum == checkYellow) {
				randNum = Random.Range (0, 5);
			}
			checkAddColour = randNum;
		}

		float xPos = -4f;
		for (int loop = 0; loop < 5; loop++) {
			blockClone = Instantiate (normalBlock, new Vector3 (xPos, 1, zPosBlockSpawn), Quaternion.identity);
			cloneRB = blockClone.GetComponent<Rigidbody> ();
			cloneRB.velocity = Vector3.back * fallSpeed;
			blockRend = blockClone.GetComponent<Renderer> ();

			if (loop == checkBlue) {
				blockRend.material.color = Color.blue;
				blockClone.SendMessage ("SetColourState", 1);
			} else if (loop == checkRed) {
				blockRend.material.color = Color.red;
				blockClone.SendMessage ("SetColourState", 2);
			} else if (loop == checkYellow) {
				blockRend.material.color = Color.yellow;
				blockClone.SendMessage ("SetColourState", 3);
			} else if (loop == checkAddColour && level != LevelType.Tutorial) {
				randNum = Random.Range (1, 4);
				switch (randNum) {
				case 1: //Green
					blockRend.material.color = Color.green;
					blockClone.SendMessage ("SetColourState", 5);
					break;
				case 2: //Orange
					blockRend.material.color = new Color (1f, 0.45f, 0f, 1f); 
					blockClone.SendMessage ("SetColourState", 6);
					break;
				case 3: //Purple
					blockRend.material.color = new Color (0.85f, 0f, 1f, 1f);
					blockClone.SendMessage ("SetColourState", 4);
					break;
				default:
					break;
				}
			}
			xPos += 2f;
		}

	}

	void scenario2 ()
	{ //spawn 1 mixed and 1 primary
		int checkMixedColour = -1;
		int checkPrimaryColour = -1;

		int randNum = Random.Range (0, 5);
		checkPrimaryColour = randNum;

		while (randNum == checkPrimaryColour) {
			randNum = Random.Range (0, 5);
		}
		checkMixedColour = randNum;

		int chosenPrimarycolour = Random.Range (1, 4);
		//1 = Blue
		//2 = Red
		//3 = Yellow

		float xPos = -4f;
		for (int loop = 0; loop < 5; loop++) {
			blockClone = Instantiate (normalBlock, new Vector3 (xPos, 1, zPosBlockSpawn), Quaternion.identity);
			cloneRB = blockClone.GetComponent<Rigidbody> ();
			cloneRB.velocity = Vector3.back * fallSpeed;
			blockRend = blockClone.GetComponent<Renderer> ();

			if (loop == checkPrimaryColour) {

				switch (chosenPrimarycolour) {
				case 1: 
					blockRend.material.color = Color.blue;
					blockClone.SendMessage ("SetColourState", 1);
					break;
				case 2: 
					blockRend.material.color = Color.red;
					blockClone.SendMessage ("SetColourState", 2);
					break;
				case 3: 
					blockRend.material.color = Color.yellow; //yellow
					blockClone.SendMessage ("SetColourState", 3);
					break;
				default:
					break;
				}
			} else if (loop == checkMixedColour) {
				switch (chosenPrimarycolour) {
				case 1: //if blue
					blockRend.material.color = new Color (1f, 0.45f, 0f, 1f); //orange
					blockClone.SendMessage ("SetColourState", 6);
					break;
				case 2: //if red
					blockRend.material.color = Color.green;
					blockClone.SendMessage ("SetColourState", 5);
					break;
				case 3: //if yellow
					blockRend.material.color = new Color (0.85f, 0f, 1f, 1f); //purple
					blockClone.SendMessage ("SetColourState", 4);
					break;
				default:
					break;
				}

			} 
			xPos += 2f;
		}

	}

	void scenario3 ()
	{ //two mixed colours and 1 
		int checkMixedColour1 = -1;
		int checkMixedColour2 = -1;
		int checkPrimaryColour = -1;
		int checkAddPColour = -1;
		int randNum = Random.Range (0, 5);
		int chosenPrimarycolour = -1;

		checkPrimaryColour = randNum;
		while (randNum == checkPrimaryColour) {
			randNum = Random.Range (0, 5);
		}
		checkMixedColour1 = randNum;
		while (randNum == checkPrimaryColour || randNum == checkMixedColour1) {
			randNum = Random.Range (0, 5);
		}
		checkMixedColour2 = randNum;


		chosenPrimarycolour = Random.Range (1, 4);
		//1 = Blue
		//2 = Red
		//3 = Yellow

		float xPos = -4f;
		for (int loop = 0; loop < 5; loop++) {
			blockClone = Instantiate (normalBlock, new Vector3 (xPos, 1, zPosBlockSpawn), Quaternion.identity);
			cloneRB = blockClone.GetComponent<Rigidbody> ();
			cloneRB.velocity = Vector3.back * fallSpeed;
			blockRend = blockClone.GetComponent<Renderer> ();

			if (loop == checkPrimaryColour) {

				switch (chosenPrimarycolour) {
				case 1: 
					blockRend.material.color = Color.blue;
					blockClone.SendMessage ("SetColourState", 1);
					break;
				case 2: 
					blockRend.material.color = Color.red;
					blockClone.SendMessage ("SetColourState", 2);
					break;
				case 3: 
					blockRend.material.color = Color.yellow; //yellow
					blockClone.SendMessage ("SetColourState", 3);
					break;
				default:
					break;
				}
			} else if (loop == checkMixedColour1) {
				switch (chosenPrimarycolour) {
				case 1: //if blue
					blockRend.material.color = new Color (1f, 0.45f, 0f, 1f); //orange
					blockClone.SendMessage ("SetColourState", 6);
					break;
				case 2: //if red
					blockRend.material.color = Color.green;
					blockClone.SendMessage ("SetColourState", 5);
					break;
				case 3: //if yellow
					blockRend.material.color = new Color (0.85f, 0f, 1f, 1f); //purple
					blockClone.SendMessage ("SetColourState", 4);
					break;
				default:
					break;
				}

			} else if (loop == checkMixedColour2) {
				randNum = Random.Range (1, 4);
				switch (randNum) {
				case 1: 
					blockRend.material.color = new Color (1f, 0.45f, 0f, 1f); //orange
					blockClone.SendMessage ("SetColourState", 6);
					break;
				case 2: 
					blockRend.material.color = Color.green;
					blockClone.SendMessage ("SetColourState", 5);
					break;
				case 3: 
					blockRend.material.color = new Color (0.85f, 0f, 1f, 1f); //purple
					blockClone.SendMessage ("SetColourState", 4);
					break;
				default:
					break;
				}	
			} else if (loop == checkAddPColour) {
				randNum = Random.Range (1, 4);
				switch (randNum) {
				case 1: 
					blockRend.material.color = Color.blue;
					blockClone.SendMessage ("SetColourState", 1);
					break;
				case 2: 
					blockRend.material.color = Color.red;
					blockClone.SendMessage ("SetColourState", 2);
					break;
				case 3: 
					blockRend.material.color = Color.yellow; //yellow
					blockClone.SendMessage ("SetColourState", 3);
					break;
				default:
					break;
				}
			}
			xPos += 2f;
		}
	}

	void scenario4 ()
	{ //spawn white block
		int checkWhite = Random.Range (0, 5);
		int randNum;

		float xPos = -4f;
		for (int loop = 0; loop < 5; loop++) {
			blockClone = Instantiate (normalBlock, new Vector3 (xPos, 1, zPosBlockSpawn), Quaternion.identity);
			cloneRB = blockClone.GetComponent<Rigidbody> ();
			cloneRB.velocity = Vector3.back * fallSpeed;
			blockRend = blockClone.GetComponent<Renderer> ();

			if (loop == checkWhite) {
				blockRend.material.color = Color.white;
				blockClone.SendMessage ("SetColourState", 7);
			} else if(level != LevelType.Tutorial) {
				randNum = Random.Range (1, 5);
				if (randNum == 1) {
					randNum = Random.Range (1, 7);
					switch (randNum) {
					case 1: 
						blockRend.material.color = Color.blue;
						blockClone.SendMessage ("SetColourState", 1);
						break;
					case 2: 
						blockRend.material.color = Color.red;
						blockClone.SendMessage ("SetColourState", 2);
						break;
					case 3: 
						blockRend.material.color = Color.yellow; //yellow
						blockClone.SendMessage ("SetColourState", 3);
						break;
					case 4:
						blockRend.material.color = new Color (1f, 0.45f, 0f, 1f); //orange
						blockClone.SendMessage ("SetColourState", 6);
						break;
					case 5:
						blockRend.material.color = Color.green;
						blockClone.SendMessage ("SetColourState", 5);
						break;
					case 6:
						blockRend.material.color = new Color (0.85f, 0f, 1f, 1f); //purple
						blockClone.SendMessage ("SetColourState", 4);
						break;
					}
				}
			}
			xPos += 2f;
		}
	}

	void ScenarioMovingBlocks(){
		blockClone = Instantiate (movingBlock, new Vector3 (0, 1, zPosBlockSpawn), Quaternion.identity);
		cloneRB = blockClone.GetComponent<Rigidbody> ();
		cloneRB.velocity = Vector3.back * fallSpeed;
		blockRend = blockClone.GetComponent<Renderer> ();
		int randNum = Random.Range (1, 7);
		switch (randNum) {
		case 1: 
			blockRend.material.color = Color.blue;
			blockClone.SendMessage ("SetColourState", 1);
			break;
		case 2: 
			blockRend.material.color = Color.red;
			blockClone.SendMessage ("SetColourState", 2);
			break;
		case 3: 
			blockRend.material.color = Color.yellow; //yellow
			blockClone.SendMessage ("SetColourState", 3);
			break;
		case 4:
			blockRend.material.color = new Color (1f, 0.45f, 0f, 1f); //orange
			blockClone.SendMessage ("SetColourState", 6);
			break;
		case 5:
			blockRend.material.color = Color.green;
			blockClone.SendMessage ("SetColourState", 5);
			break;
		case 6:
			blockRend.material.color = new Color (0.85f, 0f, 1f, 1f); //purple
			blockClone.SendMessage ("SetColourState", 4);
			break;
		}
	}
	void ScenarioFastBlock(){
		Vector3 pos = Vector3.zero;
		int randNum = Random.Range (1, 6);
		switch (randNum) {
		case 1: 
			 pos = new Vector3 (-4f, 1f, zPosBlockSpawn);
			break;
		case 2: 
			 pos = new Vector3 (-2f, 1f, zPosBlockSpawn);
			break;
		case 3: 
			 pos = new Vector3 (0f, 1f, zPosBlockSpawn);
			break;
		case 4:
			 pos = new Vector3 (2f, 1f, zPosBlockSpawn);
			break;
		case 5:
			 pos = new Vector3 (4f, 1f, zPosBlockSpawn);
			break;
		}
		blockClone = Instantiate (normalBlock, pos, Quaternion.identity);
		cloneRB = blockClone.GetComponent<Rigidbody> ();
		cloneRB.velocity = Vector3.back * fallSpeed*fastBlockFallSpeedFactor;
		blockRend = blockClone.GetComponent<Renderer> ();
		blockRend.material.color = Color.white;
		blockClone.SendMessage ("SetColourState", 7);
		blockClone.GetComponent<TrailRenderer> ().enabled = true;
		Destroy (Instantiate (fastBlockParticles, new Vector3 (pos.x, pos.y + 10f, pos.z), Quaternion.identity), 2f);
		source.PlayOneShot (fbSpawnSound, 0.8f);
	}

	void scenarioSpecifiedMixedColour(int colourNum){ 

		int checkMixedColour = -1;
		int checkPrimaryColour = -1;

		int randNum = Random.Range (0, 5);
		checkPrimaryColour = randNum;

		while (randNum == checkPrimaryColour) {
			randNum = Random.Range (0, 5);
		}
		checkMixedColour = randNum;

		int chosenPrimarycolour = colourNum;
		//1 = Blue
		//2 = Red
		//3 = Yellow

		float xPos = -4f;
		for (int loop = 0; loop < 5; loop++) {
			blockClone = Instantiate (normalBlock, new Vector3 (xPos, 1, zPosBlockSpawn), Quaternion.identity);
			cloneRB = blockClone.GetComponent<Rigidbody> ();
			cloneRB.velocity = Vector3.back * fallSpeed;
			blockRend = blockClone.GetComponent<Renderer> ();

			if (loop == checkPrimaryColour) {

				switch (chosenPrimarycolour) {
				case 1: 
					blockRend.material.color = Color.blue;
					blockClone.SendMessage ("SetColourState", 1);
					break;
				case 2: 
					blockRend.material.color = Color.red;
					blockClone.SendMessage ("SetColourState", 2);
					break;
				case 3: 
					blockRend.material.color = Color.yellow; //yellow
					blockClone.SendMessage ("SetColourState", 3);
					break;
				default:
					break;
				}
			} else if (loop == checkMixedColour) {
				switch (chosenPrimarycolour) {
				case 1: //if blue
					blockRend.material.color = new Color (1f, 0.45f, 0f, 1f); //orange
					blockClone.SendMessage ("SetColourState", 6);
					break;
				case 2: //if red
					blockRend.material.color = Color.green;
					blockClone.SendMessage ("SetColourState", 5);
					break;
				case 3: //if yellow
					blockRend.material.color = new Color (0.85f, 0f, 1f, 1f); //purple
					blockClone.SendMessage ("SetColourState", 4);
					break;
				default:
					break;
				}

			} 
			xPos += 2f;
		}

	}


	void GameOver ()
	{
		if (isGameOver == false) {
			isGameOver = true;
			//GameObject.Find ("BluePlayer").SendMessage ("TurnControlsOff");
			//GameObject.Find ("RedPlayer").SendMessage ("TurnControlsOff");
			//GameObject.Find ("YellowPlayer").SendMessage ("TurnControlsOff");
		}
	}
}
