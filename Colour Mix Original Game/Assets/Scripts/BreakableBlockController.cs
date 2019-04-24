using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BreakableBlockController : MonoBehaviour {

	private Renderer currRend;
	private Color thisColour, otherColour;
	private AudioSource source;
	public AudioClip popSound;

	private float startTime;
	private bool popped = false;


	// Use this for initialization
	void Start () {
		currRend = this.gameObject.GetComponent<Renderer> ();
		thisColour = currRend.material.color;
		source = this.gameObject.GetComponent<AudioSource> ();
	}

	// Update is called once per frame
	void Update () {
		if (popped == true && Time.time >= startTime + 1f) {
			source.Stop ();
		}
	}

	void OnTriggerEnter(Collider other){
		if (other.gameObject.tag == "BlueBall" || other.gameObject.tag == "RedBall" || other.gameObject.tag == "YellowBall") {
			currRend = other.gameObject.GetComponent<Renderer> ();
			otherColour = currRend.material.color;
			if (thisColour == otherColour) {
				Destroy (this.gameObject);
			} else  {
				//GameObject.Find ("BluePlayer").GetComponent<PlayerController> ().enabled = false;
				//GameObject.Find ("RedPlayer").GetComponent<PlayerController> ().enabled = false;
				//GameObject.Find ("YellowPlayer").GetComponent<PlayerController> ().enabled = false;
				GameObject.Find ("GameManager").SendMessage ("GameOver");
				GameObject.Find ("ScoreCollider").SendMessage ("GameOver");
				other.gameObject.SendMessage ("SpawnDeathParticles");
				other.gameObject.SetActive (false);
				GameObject.Find ("GameManager").SendMessage ("ShakeScreen", 1f);
				source.PlayOneShot (popSound, 1f);
				popped = true;
				startTime = Time.time;
			}
		}
	}
}
