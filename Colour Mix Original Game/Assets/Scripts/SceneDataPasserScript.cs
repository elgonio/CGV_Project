using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneDataPasserScript : MonoBehaviour {

	public int diffcultyChoice;

	private AudioSource source;
	public AudioClip menuItemClick, backButtonClick;
	private static bool created = false;

	void Awake()
	{
		source = this.GetComponent<AudioSource> ();
		if (!created) {
			DontDestroyOnLoad (this.gameObject);
			created = true;
		} else {
			Destroy (this.gameObject);
		}
	}

	// Use this for initialization
	void Start () {
		

	}
	
	// Update is called once per frame
	void Update () {
		
	}

	public void PlayMenuItemClick (){
		source.PlayOneShot (menuItemClick, 1f);
	}

	public void PlayBackButtonClick (){
		source.PlayOneShot (backButtonClick, 1f);
	}
		
}
