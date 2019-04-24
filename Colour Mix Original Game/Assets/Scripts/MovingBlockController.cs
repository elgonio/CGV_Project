using System.Collections;
using System.Collections.Generic;
using UnityEngine;

//public enum Colour {Blue, Red, Yellow, Purple, Green, Orange, White}

public class MovingBlockController : MonoBehaviour {

	private float swayDistance = 4f;
	public float swayDuration = 0.65f;
	private float startSwayTime;
	private float randomDir;

	private Renderer currRend;
	private Color thisColour, noColour;
	private AudioSource source;
	public AudioClip popSound;

	private float startTime;
	private bool popped = false;
	private float startFadeInTime;
	public float fadeInTime = 1.5f;

	Colour blockColour;

	public AnimationCurve increaseFactor;


	// Use this for initialization
	void Start () {
		currRend = this.gameObject.GetComponent<Renderer> ();
		thisColour = currRend.material.color;
		source = this.gameObject.GetComponent<AudioSource> ();
		startSwayTime = Time.time;
		randomDir = Mathf.Sign (Random.Range (-1f, 1f));
		swayDuration = Random.Range (0.3f, 0.6f);

		noColour = new Color (thisColour.r, thisColour.g, thisColour.b, 0f);
		startFadeInTime = Time.time;
		currRend.material.color = noColour;
	}

	// Update is called once per frame
	void Update () {
		if (popped == true && Time.time >= startTime + 0.8f) {
			source.Stop ();
		}
		float t = (Time.time - startSwayTime) / swayDuration;
		this.transform.position = new Vector3 (Mathf.Sin(t) * swayDistance * randomDir , this.transform.position.y, this.transform.position.z);

		if (thisColour != currRend.material.color) {
			float t2 = (Time.time - startFadeInTime) / fadeInTime;
			float alphaAmount = 1 * increaseFactor.Evaluate (t2);
			currRend.material.color = new Color (thisColour.r, thisColour.g, thisColour.b, alphaAmount);
		}
	}

	void SetColourState(int choice){
		switch (choice) {
		case 1:
			blockColour = Colour.Blue;
			break;
		case 2:
			blockColour = Colour.Red;
			break;
		case 3:
			blockColour = Colour.Yellow;
			break;
		case 4:
			blockColour = Colour.Purple;
			break;
		case 5:
			blockColour = Colour.Green;
			break;
		case 6:
			blockColour = Colour.Orange;
			break;
		case 7:
			blockColour = Colour.White;
			break;
		default:
			break;
		}
	}

	void OnTriggerEnter(Collider other){
		if (other.gameObject.tag == "BlueBall" || other.gameObject.tag == "RedBall" || other.gameObject.tag == "YellowBall") {
			Colour playerColour = other.gameObject.GetComponent<PlayerController> ().GetColourState();

			if (blockColour != playerColour) {
				source.PlayOneShot (popSound, 1f);
				GameObject.Find ("GameManager").SendMessage ("GameOver");
				GameObject.Find ("ScoreCollider").SendMessage ("GameOver");
				other.gameObject.SendMessage ("SpawnDeathParticles");
				other.gameObject.SetActive (false);
				GameObject.Find ("GameManager").SendMessage ("ShakeScreen", 1f);

				popped = true;
				startTime = Time.time;
			}
		}
	}
}
