#pragma strict
//Script to add random behavior when the player is taking a shot

//Variables 
//Player and ball spawn point
public var fpController: GameObject;
public var spawnPoint: GameObject;

/*Instantiates a ball and applys force to it 
using ping pong function*/
public static var shotTaken: boolean;
public static var shotsTaken: int = 0;
//set the maximum width of the bar to be used for the maths function below
var fullWidth : float = 256;

//create a boolean flag we can use to stop and start the choosing of power
var choosing : boolean = false;

//create a private variable (not shown in inspector) to store the current set power
private var thePower : float;

//create a slot to assign my ball prefab to.
var ball : Rigidbody;

//create a slot to assign an empty game object as the point to spawn from
var spawnPos : Transform;

// create a number to multiply the force by as the value of up to 256 may not be enough to
// effectively shoot a ball forward
var shotForce : float = 5;

public var powerBar :Scrollbar;
public var crosshair : GameObject;

//public var goalKeeper : GameObject;

function Start() {
	choosing = false;
	shotTaken = false;
}

function Update () {
	if(!choosing){
	// detect if key is released and then call the Shoot function, passing the current
	// value of 'thePower' variable into it's 'power' argument
	if(Input.GetMouseButtonUp(0)){
		shotTaken = true;
		Shoot(thePower);
	}

	//create a power variable and set it to ping pong function
	//from current time to 1, and multiply that by a number (or variable holding a number)
	thePower = Mathf.PingPong(Time.time, 1) * fullWidth * 2.3;

	// set the width of the power bar gui
	var force = Mathf.PingPong(Time.time, 1) * fullWidth; 
	//set the width of the GUI Texture equal to that power value
	//guiTexture.pixelInset.width = thePower;
	powerBar.size = force / 250f;
	}
}

// start the 'Shoot' custom function, establish a
// float variable to be fed with a number when function is called
function Shoot(power : float){
	crosshair.SetActive(false);
	//Plays audio when a shot is taken
	gameObject.GetComponent(playAudio).SendMessage("playAudio",4);
	//Increments the number of shots taken
	shotsTaken++;
	print(shotsTaken + "shots taken");
	//stop the power being changed whilst we shoot a ball by setting choosing boolean to true
	choosing = true;

	//create a ball, assign the newly created ball to a var called pFab
	var pFab : Rigidbody = Instantiate(ball, spawnPos.position, spawnPos.rotation);
	pFab.name = "Ball";

	//find the forward direction of the object assigned to the spawnPos variable
	//var fwd : Vector3 = spawnPos.forward;
	var fwd : Vector3 = crosshair.transform.position - transform.position;
	fwd = fwd.normalized;
	pFab.AddForce(fwd * power*shotForce / 55, ForceMode.Impulse);

	//Tells the goal keeper dive 
	if (Setup.currentLevel > 1) {
		GameObject.Find("GoalKeeper").GetComponent(diveDirection).SendMessage("Dive");
	}
	//pause before resuming the power bar motion
	yield WaitForSeconds(3);
	
	//Move the player to a random location
	var randomLocation = Random.Range(15,44);
	fpController.transform.position = Vector3(18.06,0.94,randomLocation);
	spawnPoint.transform.position = Vector3(16.32,0.94,randomLocation);
	//reset choosing to restart the power bar motion
	choosing = false;
	shotTaken = false;
}