using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public enum Colour {Blue, Red, Yellow, Purple, Green, Orange, White}

public class PlayerController : MonoBehaviour
{
	
	Colour playerColour;

	public string left, right, up, down;
	public int currPos, prevPos;
	private Vector3[] posVectArray = new Vector3[10];

	private Renderer currRend;
	private Color initialColour;
	private Color startColour;
	private Color endColour;
	public float colourTransitionTime = 0.5f;
	private float startTime;
	private int colourID = 0;
	// 1 = Blue
	// 2 = Red
	// 3 = Yellow


	public float moveSpeed = 5f;

	public GameObject deathParticles;
	private bool controlsOn = true; 



	// Use this for initialization
	void Start ()
	{
		initialisePositions ();
		this.transform.position = posVectArray [currPos];
		currRend = this.gameObject.GetComponent<Renderer> ();
		if (this.gameObject.tag == "BlueBall") {
			colourID = 1;
			currRend.material.color = Color.blue;
			playerColour = Colour.Blue;
		} else if (this.gameObject.tag == "RedBall") {
			colourID = 2;
			currRend.material.color = Color.red;
			playerColour = Colour.Red;
		} else if (this.gameObject.tag == "YellowBall") {
			colourID = 3;
			currRend.material.color = Color.yellow;
			playerColour = Colour.Yellow;
		}
		initialColour = currRend.material.color;
		startColour = initialColour;
		endColour = initialColour;
		startTime = Time.time;
		prevPos = currPos;
		controlsOn = true;
	}
	
	// Update is called once per frame
	void Update ()
	{
		//float t = (Time.time - startTime) / colourTransitionTime;
		//currRend.material.color = Color.Lerp (startColour, endColour, t);
		inputs ();
		if (controlsOn == true) {
			movement ();
		}
		changeToNewColour ();
		checkPlayerColourState ();
	}

	void updatePositionArray (int newPos)
	{
		switch (colourID) {
		case 1:
			GameObject.Find ("GameManager").GetComponent<GameManager> ().positionArray [currPos].setBlue (true);
			GameObject.Find ("GameManager").GetComponent<GameManager> ().positionArray [prevPos].setBlue (false);
			prevPos = currPos;
			break;
		case 2:
			GameObject.Find ("GameManager").GetComponent<GameManager> ().positionArray [currPos].setRed (true);
			GameObject.Find ("GameManager").GetComponent<GameManager> ().positionArray [prevPos].setRed (false);
			prevPos = currPos;
			break;
		case 3:
			GameObject.Find ("GameManager").GetComponent<GameManager> ().positionArray [currPos].setYellow (true);
			GameObject.Find ("GameManager").GetComponent<GameManager> ().positionArray [prevPos].setYellow (false);
			prevPos = currPos;
			break;
		default:
			break;
		}
	}

	void initialisePositions ()
	{
		float xpos = -4;
		float zpos = -8f;
		int pos = 0;
		for (int loop1 = 0; loop1 < 2; loop1++) {
			for (int loop2 = 0; loop2 < 5; loop2++) {
				posVectArray [pos] = new Vector3 (xpos, 0.5f, zpos);
				//Debug.Log ("[" + pos + "] : " + posVectArray [pos].x + " ; " + posVectArray [pos].y + "\n");
				pos++;
				xpos = xpos + 2f;
			}
			xpos = -4f;
			zpos = zpos - 2f;
		}
	}

	void inputs ()
	{
		
		if (Input.GetKeyDown (left)) {
			if (currPos != 0 && currPos != 5) {
				currPos = currPos - 1;
				updatePositionArray (currPos);
			}

		} else if (Input.GetKeyDown (right)) {
			if (currPos != 4 && currPos != 9) {

				currPos = currPos + 1;
				updatePositionArray (currPos);
			}
		} else if (Input.GetKeyDown (down)) {
			if (currPos <= 4) {
					
				currPos = currPos + 5;
				updatePositionArray (currPos);
			}

		} else if (Input.GetKeyDown (up)) {
			if (currPos >= 5) {
					
				currPos = currPos - 5;
				updatePositionArray (currPos);
			}

		}


	}

	void movement ()
	{
		
		float t = moveSpeed * Time.deltaTime;
		transform.position = Vector3.MoveTowards (transform.position, posVectArray [currPos], t);

	}


	void changeToNewColour ()
	{
		startColour = currRend.material.color;
		float t = (Time.time - startTime) / colourTransitionTime;
		currRend.material.color = Color.Lerp (startColour, endColour, t);
	}

	void SpawnDeathParticles ()
	{
		Destroy (Instantiate (deathParticles, this.transform.position, Quaternion.identity), 2f);
	}

	void TurnControlsOff ()
	{
		controlsOn = false;
	}

	void checkPlayerColourState(){
		//Color purple = new Color (0.85f, 0f, 1f, 1f);

		if (endColour == Color.white) {
			playerColour = Colour.White;
		} else if (endColour == Color.blue) {
			playerColour = Colour.Blue;
		} else if (endColour == Color.red) {
			playerColour = Colour.Red;
		} else if (endColour == Color.yellow) {
			playerColour = Colour.Yellow;
		} else if (endColour == new Color (0.85f, 0f, 1f, 1f)) { //if equal to purple
			playerColour = Colour.Purple;
		} else if (endColour == Color.green) {
			playerColour = Colour.Green;
		} else if (endColour == new Color (1f, 0.45f, 0f, 1f)) { //if equal to orange
			playerColour = Colour.Orange;
		}
			
	}

	public Colour GetColourState(){
		return playerColour;
	}

	void OnTriggerEnter (Collider other)
	{
		if (other.gameObject.tag == "BlueBall" || other.gameObject.tag == "RedBall" || other.gameObject.tag == "YellowBall") {
			endColour = GameObject.Find ("GameManager").GetComponent<GameManager> ().positionArray [currPos].getColour ();
			startTime = Time.time;
			checkPlayerColourState ();
		}
	}

	void OnTriggerExit (Collider other)
	{
		if (other.gameObject.tag == "BlueBall" || other.gameObject.tag == "RedBall" || other.gameObject.tag == "YellowBall") {
			endColour = GameObject.Find ("GameManager").GetComponent<GameManager> ().positionArray [currPos].getColour ();
			startTime = Time.time;
			checkPlayerColourState ();
		}
	}
}
