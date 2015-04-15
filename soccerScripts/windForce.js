#pragma strict
/*Simulates wind friction on the ball if the 
ball is above a certain height */
//Variables 
//Ground Height 
public var groundPos: float;
//What height the wind begins to effects the ball 
private var windHeight: float;
//The wind speed
public var windSpeed: float;

function Start () {
	groundPos = transform.position.y;
	windSpeed = 60;
	windHeight = groundPos /*+ .5*/;
}

function Update () {
	if (transform.position.y >= windHeight && Setup.currentLevel > 2) {
		print(Setup.currentLevel + "In ");
		// Adding a wind effect on the z axis
		constantForce.force = Vector3(0,0,windSpeed);
	} else {
		// Removing the wind
		constantForce.force = Vector3(0,0,0);
		//print("In else wind"+Setup.currentLevel);
	}
	
}