#pragma strict

/*Used to set up each level. Instantiates 
new objects at the beginning of each level*/

//First person controller
public var fpController: GameObject;
private var disableMouse: MouseLook;
//First person controller camera
public var fpCamera1: GameObject;
public var fpCamera: Camera;
private var disableMouseCamera: MouseLook;
//Ball spawn point
public var spawnPoint: GameObject;

//Goal Keeper Model
public var goalKeepModel: GameObject;
private var keeperAlive: boolean;

//Level variables
//public var Setup.currentLevel: int;
public var maxShots: int;

//Game Targets
public var target120: GameObject;
public var target30: GameObject;
public var target80: GameObject;
public var leftAniClip: AnimationClip;
public var rightAniClip: AnimationClip;

//Boolean value set to false upon reaching max score
private var levelOver: boolean;
//Pick level
public var pickCurrentLevel: int = 1;

//Checks if the ball has gone in the goal
public var goalCollider: GameObject;

//Game UI
//Start level UI panel & Camera
public var uiCamera: GameObject;
public var panel: GameObject;
//Text displaying level details & hud
public var text: UI.Text;
public var hudText: UI.Text;
//Level details UI timer
public var menu : GameObject;
public var scoredMessage: GameObject;
public var panelTime: int = 3;
public var gameOverUI: GameObject;
public var gameOverText: UI.Text;

//Launcher Object
private var launcher: GameObject;
//Activate projectile launcher
private var launcherActive: boolean;

// Timer variables
var endTime : float;
var seconds : int;
var minutes : int;

//Class that holds static variables that a referenced in other scripts 
public class Setup {
	public static var currentScore: int;
	public static var currentLevel: int;
	public static var scoreNeeded: int;
}

function Start () {
	//Timer setup
	endTime = Time.time + 40;

	//fpCamera1.SetActive(false);

	//Level variables
	scoredMessage.SetActive(false);
	keeperAlive = false;
	Setup.currentLevel = 1;
	levelOver = false;
	Setup.scoreNeeded = 4;
	maxShots = 6;
	Setup.currentScore = 0;
	powerBar.shotsTaken = 0;

	//Disable camera movement
	disableMouse = fpController.GetComponent(MouseLook);
	disableMouse.enabled = launcherActive;
	disableMouseCamera = fpCamera.GetComponent(MouseLook);
	disableMouseCamera.enabled = launcherActive;

	//Disable Ball launcher and UI camera
	launcherActive = false;
	launcher = gameObject.FindWithTag("Respawn");

	//Disable UI elements
	gameOverUI.SetActive(false);
	uiCamera.SetActive(false);
	menu.SetActive(false);

	//Level start details
	text.text ="Level " + Setup.currentLevel + "\nScore needed: " + Setup.scoreNeeded + "\nIn a maximum of " + maxShots +  " shots. ";
	//Player HUD details
	hudText.text =  "Time" + endTime + "\nShots taken: " + powerBar.shotsTaken + " / " + maxShots 
	+ "\nCurrent score: " + Setup.currentScore;
}

function Update () {
	//print("Current Level: "+Setup.currentLevel);
	//Setup.currentLevel = pickCurrentLevel;
	//Level Timer
	var timeLeft : int = endTime - Time.time;
	minutes = timeLeft / 80;
	seconds = timeLeft - (minutes * 60);
	if (timeLeft < 0) 
	{
		timeLeft = 0;
	}
	if ((timeLeft == 0) || (timeLeft < 0))
	{
		gameOverUI.SetActive(true);
		gameOverText.text = "Game Over\nOut Of Time";
		disabelFPCCamera();
	}

	//Projectile launcher on/off
	launcher.SetActive(launcherActive);

	//Level start details
	text.text = "Level " + Setup.currentLevel + "\nScore needed: " + Setup.scoreNeeded + "\nIn a maximum of " + maxShots +  " shots. ";
	
	//Player HUD
	hudText.text = "Time Left: " +/* timeLeft.ToString() +*/ 0 + "" + minutes + ":" + seconds + "\nShots taken: " + powerBar.shotsTaken + " / " + maxShots 
	+ "\nCurrent score: " + Setup.currentScore;

	//Change levels
	if (Setup.currentLevel == 1) {
		if (powerBar.shotsTaken <= maxShots && Setup.currentScore >= Setup.scoreNeeded) {
			levelOver = true;
			Setup.currentLevel++;
			if (levelOver) {
				showUIPanel();
				setupLevel2();
			}
		} 
		if(powerBar.shotsTaken >= maxShots && Setup.currentScore < 4) {
			gameOverUI.SetActive(true);
			disabelFPCCamera();
		}
	}
	if (Setup.currentLevel == 2) {
		if (powerBar.shotsTaken <= maxShots && Setup.currentScore >= Setup.scoreNeeded) {
			Setup.currentLevel++;
			levelOver = true;
			if (levelOver) {
				showUIPanel();
				setupLevel3();
			}
		}
		if(powerBar.shotsTaken >= maxShots && Setup.currentScore < 320) {
			gameOverUI.SetActive(true);
			disabelFPCCamera();
		}
	}
	if (Setup.currentLevel == 3) {
		if (powerBar.shotsTaken <= maxShots && Setup.currentScore >= Setup.scoreNeeded) {
			Setup.currentLevel++;
			levelOver = true;
			if (levelOver) {
				showUIPanel();
				setupLevel4();
			}
		}
		if(powerBar.shotsTaken >= maxShots && Setup.currentScore < 4) {
			gameOverUI.SetActive(true);
			disabelFPCCamera();
		}
	}
	if (Setup.currentLevel == 4) {
		if (powerBar.shotsTaken <= maxShots && Setup.currentScore >= Setup.scoreNeeded) {
			Setup.currentLevel++;
			levelOver = true;
			if (levelOver) {
				//showUIPanel();
				gameOverUI.SetActive(true);
				gameOverText.text = "Well Done \nYou have Finshed \nTraining Day";
				disabelFPCCamera();

			}
		}
		if(powerBar.shotsTaken >= maxShots && Setup.currentScore < 4) {
			gameOverUI.SetActive(true);
		}
	}

	//Open menu
	if(Input.GetKeyUp(KeyCode.Escape)) {
		showGameMenu();
	} 
	
}

function wait(){
	yield WaitForSeconds(5);
}

//Instantiate new objects for new level
function setupLevel2() {
	endTime = Time.time + 80;
	launcherActive = true;
	scoredMessage.SetActive(false);
	Setup.currentLevel = 2;
	powerBar.shotsTaken = 0;
	Setup.currentScore = 0;
	Setup.scoreNeeded = 320;

	goalCollider.SetActive(false);
	//Create targets within the goal
	var rightTarget = Instantiate(target120, Vector3(2.82,1.56,35), Quaternion.Euler(90,0 ,90));
	//Adds and plays animation on the target
	rightTarget.animation.AddClip(rightAniClip, rightAniClip.name);
	rightTarget.animation.Play(rightAniClip.name);

	var leftTarget = Instantiate(target120, Vector3(2.82,1.56,29), Quaternion.Euler(90,0 ,90));
	//Adds and plays animation on the target
	leftTarget.animation.AddClip(leftAniClip, leftAniClip.name);
	leftTarget.animation.Play(leftAniClip.name);

	/*Instantiate(target30, Vector3(2.82,.8,32.12),  Quaternion.Euler(90,0 ,90));*/
	Instantiate(target80, Vector3(2.82,1.78,32.12), Quaternion.Euler(90,0 ,90));
	levelOver = false;

	if (keeperAlive == false) {
		keeperAlive = true;
		var keeper = Instantiate(goalKeepModel, Vector3(3.38,0.08,32.173),Quaternion.Euler(0,90 ,0));
		keeper.name = "GoalKeeper";
	}
}

//Instantiate new objects for new level
function setupLevel3() {
	endTime = Time.time + 60;
	launcherActive = true;
	scoredMessage.SetActive(false);
	levelOver = false;
	Setup.currentLevel = 3;
	powerBar.shotsTaken = 0;
	Setup.currentScore = 0;
	Setup.scoreNeeded = 4;
	goalCollider.SetActive(true);

	if (keeperAlive == false) {
		keeperAlive = true;
		var keeper = Instantiate(goalKeepModel, Vector3(3.38,0.08,32.173),Quaternion.Euler(0,90 ,0));
		keeper.name = "GoalKeeper";
	}
}

//Instantiate new objects for new level
function setupLevel4() {
	print("Current Level: "+Setup.currentLevel);
	endTime = Time.time + 80;
	launcherActive = true;
	scoredMessage.SetActive(false);
	//Destroy(gameObject.FindWithTag("GoalKeeper"));
	levelOver = false;
	//Setup.currentLevel = 4;
	powerBar.shotsTaken = 0;
	Setup.currentScore = 0;
	Setup.scoreNeeded = 4;
	goalCollider.SetActive(true);

	//Level start details
	text.text = "Level " + Setup.currentLevel + "\nScore needed: " + Setup.scoreNeeded + "\nIn a maximum of " + maxShots +  " shots. HAHAHAHAHAHA";

	/*var defender = gameObject.FindWithTag("Defender");
		Instantiate(defender, Vector3(5.95,0.08,30.12),Quaternion.Euler(0,90 ,0));
		Instantiate(defender, Vector3(5.95,0.08,30.76),Quaternion.Euler(0,90 ,0));
		Instantiate(defender, Vector3(5.95,0.08,31.58),Quaternion.Euler(0,90 ,0));*/

	if (keeperAlive == false) {
		keeperAlive = true;
		var keeper = Instantiate(goalKeepModel, Vector3(3.38,0.08,32.173),Quaternion.Euler(0,90 ,0));
		keeper.name = "GoalKeeper";
	}
}

//Displays in game menu
function showGameMenu() {
	menu.SetActive(true);
	disabelFPCCamera();
}

//Hides in game menu
function hideGameMenu() {
	launcherActive = true;
	menu.SetActive(false);
	enableFPCCamera();
	scoredMessage.SetActive(false);
	uiCamera.SetActive(true);
	gameOverUI.SetActive(false);

	Update();
}

//Shows Start of level ui panel
function showUIPanel() {
	panel.SetActive(true);
	//launcherActive = false;
	disabelFPCCamera();
}

//Hides Start of level ui panel
function hideUIPanel() {
	//print("Is launcher: "+launcherActive);
	launcherActive = true;
	//print("Is launcher: "+launcherActive);
	panel.SetActive(false);
	//enableFPCCamera();
	disableMouse.enabled = launcherActive;
	disableMouseCamera.enabled = launcherActive;
	uiCamera.SetActive(true);

	Update();
}

//Disable FPC and launcher
function disabelFPCCamera() {
	launcherActive = false;
	disableMouse.enabled = launcherActive;
	disableMouseCamera.enabled = launcherActive;
	uiCamera.SetActive(false);
}

//Enables FPC and launcher
function enableFPCCamera() {
	disableMouse.enabled = launcherActive;
	disableMouseCamera.enabled = launcherActive;
	uiCamera.SetActive(false);
}
