using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class ScoreColliderScript : MonoBehaviour {

	//public Text scoreText, highscoreText;
	public TMP_Text scoreText;
	private int score = 0;
	public string highscoreKey;
	private int highscore = 0;
	protected bool isGameOver = false;

	public GameObject panels;
	public TMP_Text panelTitleText, panelScoreText, highscoreText;
	public GameObject normalCamera, blurCamera;
	public GameObject resumeButton;

	private AudioSource source;
	public AudioClip scoreSound;

	private bool gamePaused = false;

	public RectTransform panelT;
	private float startGameOverTime;
	public float menuSlideDownTime = 0.5f;

	// Use this for initialization
	void Start () {
		score = 0;
		scoreText.text = "" + score.ToString ();
		highscore = PlayerPrefs.GetInt (highscoreKey, 0);
		highscoreText.text = "Highscore: " + highscore.ToString ();
		source = this.gameObject.GetComponent<AudioSource> ();
		panels.SetActive (false);
		gamePaused = false;
		blurCamera.SetActive (false);
		normalCamera.SetActive (true);
		Cursor.visible = false;
	}
	
	// Update is called once per frame
	void Update () {
		
		if ((Input.GetKeyDown (KeyCode.P) || Input.GetKeyDown(KeyCode.Escape)) && (isGameOver == false)) {
			if (gamePaused == false) {
				pauseGame ();
			} else if(gamePaused == true) {
				unpauseGame ();
			}
		}

		if (isGameOver == true) {
			float t = (Time.time - startGameOverTime) / menuSlideDownTime;
			panelT.localPosition = Vector3.Lerp (new Vector3 (0f, 1000f, 0f), Vector3.zero, t);
		}
	}

	void pauseGame(){
		Time.timeScale = 0f;
		gamePaused = true;
		panels.SetActive (true);
		blurCamera.SetActive (true);
		normalCamera.SetActive (false);
		updateHighscore ();
		panelTitleText.text = "Game Paused";
		panelScoreText.text = "Your Score: " + score.ToString ();
		Cursor.visible = true;
	}

	public void unpauseGame(){
		Time.timeScale = 1f;
		gamePaused = false;
		panels.SetActive (false);
		blurCamera.SetActive (false);
		normalCamera.SetActive (true);
		Cursor.visible = false;
	}

	void OnTriggerEnter(Collider other){
		if (other.gameObject.tag == "ScoreBlock") {
			Destroy (other.gameObject);
			if (isGameOver == false) {
				source.PlayOneShot (scoreSound, 1f);
				score += 1;
				scoreText.text = "" + score.ToString ();
			}

		} else if (other.gameObject.tag == "Block") {
			Destroy (other.gameObject,1f);
		}
	}

	public void GameOver (){
		//If the score is greater than the highscore then set and save new highscore.
		Cursor.visible = true;
		updateHighscore();
		panels.SetActive (true);
		panelTitleText.text = "Game Over !";
		panelScoreText.text = "Your Score: " + score.ToString ();
		resumeButton.SetActive (false);
		if (isGameOver == false) {
			startGameOverTime = Time.time;
		}
		isGameOver = true;
		//panelT.localPosition = new Vector3 (0f, 400f, 0f);

	
	}

	void updateHighscore(){
		if(score>highscore){
			PlayerPrefs.SetInt(highscoreKey, score);
			PlayerPrefs.Save();
			highscore = score;
			highscoreText.text = "Highscore: " + highscore.ToString ();
		}


	}
}
