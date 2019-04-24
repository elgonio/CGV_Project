using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using TMPro;

public class SceneController : MonoBehaviour {

	private AudioSource source;
	public AudioClip buttonClick;

	public bool isDifficultySelectScene = false;

	void Start(){
		source = this.gameObject.GetComponent<AudioSource>();
		if (isDifficultySelectScene == true) {
			GameObject.Find("txt_EasyHs").GetComponent<TMP_Text>().text = "Highscore: " + PlayerPrefs.GetInt ("EasyScene", 0);
			GameObject.Find("txt_NormalHs").GetComponent<TMP_Text>().text = "Highscore: " + PlayerPrefs.GetInt ("NormalScene", 0);
			GameObject.Find("txt_HardHs").GetComponent<TMP_Text>().text = "Highscore: " + PlayerPrefs.GetInt ("HardScene", 0);
		}
	}

	public string nextScene;

	public void onClickMainMenuScreen(){
		GameObject.Find ("SceneDataPasser").SendMessage("PlayBackButtonClick");
		Time.timeScale = 1f;
		SceneManager.LoadScene ("Main Menu Scene");

	}
	public void onClickMainMenuRestartMusic(){
		GameObject.Find ("SceneDataPasser").SendMessage("PlayMenuItemClick");
		Time.timeScale = 1f;
		GameObject.Find ("SceneDataPasser").GetComponent<AudioSource> ().Play ();
		GameObject.Find ("EasyGameMusicObj").GetComponent<AudioSource>().Stop ();
		GameObject.Find ("NormalGameMusicObj").GetComponent<AudioSource>().Stop ();
		GameObject.Find ("HardGameMusicObj").GetComponent<AudioSource>().Stop ();
		SceneManager.LoadScene ("Main Menu Scene");

	}
	public void onClickDifficultySelectScene(){
		GameObject.Find ("SceneDataPasser").SendMessage("PlayMenuItemClick");
		SceneManager.LoadScene ("Difficulty Select Scene");
	}
	public void onClickQuit(){
		GameObject.Find ("SceneDataPasser").SendMessage("PlayMenuItemClick");
		Application.Quit ();
	}
	public void onClickEndlessModeScreen(){
		SceneManager.LoadScene ("Endless Scene");
	}
	public void onClickTestMechanicsScreen(){
		SceneManager.LoadScene ("Test Mechanics Scene");
	}
	public void onClickTestFastRowMechanicScreen(){
		SceneManager.LoadScene ("Test Fast Row Scene");
	}
	public void onClickNextLevel(){
		SceneManager.LoadScene (nextScene);
	}
	public void onClickTestMovingBlockMechanicScreen(){
		SceneManager.LoadScene ("Test Moving Mechanic");
	}
	public void onClickReloadActiveScene(){
		GameObject.Find ("SceneDataPasser").SendMessage("PlayBackButtonClick");
		Scene thisScene = SceneManager.GetActiveScene ();
		Time.timeScale = 1f;
		SceneManager.LoadScene (thisScene.name);

	}
	public void onClickEasyScene(){
		GameObject.Find ("SceneDataPasser").SendMessage("PlayMenuItemClick");
		GameObject.Find ("SceneDataPasser").GetComponent<SceneDataPasserScript> ().diffcultyChoice = 1;
		SceneManager.LoadScene ("Ready Up Scene");
	}
	public void onClickNormalScene(){
		GameObject.Find ("SceneDataPasser").SendMessage("PlayMenuItemClick");
		GameObject.Find ("SceneDataPasser").GetComponent<SceneDataPasserScript> ().diffcultyChoice = 2;
		SceneManager.LoadScene ("Ready Up Scene");
	}
	public void onClickHardScene(){
		GameObject.Find ("SceneDataPasser").SendMessage("PlayMenuItemClick");
		GameObject.Find ("SceneDataPasser").GetComponent<SceneDataPasserScript> ().diffcultyChoice = 3;
		SceneManager.LoadScene ("Ready Up Scene");
	}
	public void onClickTutorialScene(){
		GameObject.Find ("SceneDataPasser").SendMessage("PlayMenuItemClick");
		GameObject.Find ("SceneDataPasser").GetComponent<SceneDataPasserScript> ().diffcultyChoice = 0;
		SceneManager.LoadScene ("Ready Up Scene");
	}

		

	void Update(){

	}
}
