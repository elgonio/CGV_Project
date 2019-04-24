using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class NormalGameMusicController : MonoBehaviour {

	private static bool created4 = false;
	//public enum LevelMusic{Easy, Normal, Hard, Tutorial};

	void Awake()
	{
		if (!created4) {
			DontDestroyOnLoad (this.gameObject);
			created4 = true;
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
}
