using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
using UnityEngine.SceneManagement;

public class ReadyUpScript : MonoBehaviour {

	public GameObject blueReadyUpParticles, redReadyUpParticles, yellowReadyUpParticles;
	public GameObject blueReadyUpParticles2, redReadyUpParticles2, yellowReadyUpParticles2;
	private bool p1Ready, p2Ready, p3Ready;
	public TMP_Text p1ReadyText, p2ReadyText, p3ReadyText;
	private float startReadyTime;
	private bool starting = false;

	private AudioSource source;
	public AudioClip readyUpSound;

	// Use this for initialization
	void Start () {
		source = this.GetComponent<AudioSource> ();
		blueReadyUpParticles.SetActive (false);
		redReadyUpParticles.SetActive (false);
		yellowReadyUpParticles.SetActive (false);

		p1Ready = false;
		p2Ready = false;
		p3Ready = false;
		starting = false;
	}
	
	// Update is called once per frame
	void Update () {
		if (Input.GetKeyDown (KeyCode.W)) {
			blueReadyUpParticles.SetActive(true);
			p1Ready = true;
			p1ReadyText.text = "Ready";
			source.PlayOneShot (readyUpSound, 0.8f);
			Destroy (Instantiate(blueReadyUpParticles2, new Vector3(-8.5f, 11f, 3.3f), Quaternion.identity), 2f);
		}
		if (Input.GetKeyDown (KeyCode.I)) {
			redReadyUpParticles.SetActive(true);
			p2Ready = true;
			p2ReadyText.text = "Ready";
			source.PlayOneShot (readyUpSound, 0.8f);
			Destroy (Instantiate(redReadyUpParticles2, new Vector3(0f, 11f, 3.3f), Quaternion.identity), 2f);
		}
		if (Input.GetKeyDown (KeyCode.UpArrow)) {
			yellowReadyUpParticles.SetActive(true);
			p3Ready = true;
			p3ReadyText.text = "Ready";
			source.PlayOneShot (readyUpSound, 0.8f);
			Destroy (Instantiate(yellowReadyUpParticles2, new Vector3(8.5f, 11f, 3.3f), Quaternion.identity), 2f);
		}

		if (p1Ready && p2Ready && p3Ready && starting == false) {
			startReadyTime = Time.time;
			starting = true;
		}

		if (Time.time >= startReadyTime + 2f && (starting == true)) {
			int sceneNum = GameObject.Find ("SceneDataPasser").GetComponent<SceneDataPasserScript> ().diffcultyChoice;
			switch (sceneNum) {
			case 0: 
				GameObject.Find ("EasyGameMusicObj").GetComponent<AudioSource>().Play ();
				SceneManager.LoadScene ("Tutorial Scene");
				break;
			case 1:
				GameObject.Find ("EasyGameMusicObj").GetComponent<AudioSource>().Play ();
				SceneManager.LoadScene ("Easy Scene");
				break;
			case 2:
				GameObject.Find ("NormalGameMusicObj").GetComponent<AudioSource>().Play ();
				SceneManager.LoadScene ("Normal Scene");
				break;
			case 3:
				GameObject.Find ("HardGameMusicObj").GetComponent<AudioSource>().Play ();
				SceneManager.LoadScene ("Hard Scene");
				break;
			default:
				Debug.Log ("Couldn't Load Chosen Scene");
				break;
			}
			//Destroy (GameObject.Find ("SceneDataPasser"));
		}


	}
}
