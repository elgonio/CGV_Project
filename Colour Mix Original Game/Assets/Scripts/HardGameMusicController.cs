using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HardGameMusicController : MonoBehaviour {

	private static bool created3 = false;
	//public enum LevelMusic{Easy, Normal, Hard, Tutorial};

	void Awake()
	{
		if (!created3) {
			DontDestroyOnLoad (this.gameObject);
			created3 = true;
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
