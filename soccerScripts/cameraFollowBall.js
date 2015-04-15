#pragma strict
/*When attached to the ball and turned on
the camera will follows the ball after it is kicked */

//Variables 
//Reference to fpc and camera
public var movingCamera : GameObject;
public var fpc: GameObject;

//Variable for balls transform
private var ball : Transform;
//screen cross-hair 
public var crosshair: GameObject;
//Turn on/off camera follow
public static var deactivateScript: boolean;

function Start () {
	//cameraStartPosition = fpc.transform.position;
	deactivateScript = false;
}

function Update () {
	if(deactivateScript == false) {
		if (powerBar.shotTaken==true) {
			//Balls transform
			ball=gameObject.FindWithTag("Ball").transform;
			powerBar.shotTaken=false;
		}
		if(ball != null) {
			//Make the cameras transform follow the ball
			movingCamera.transform.position = ball.position + Vector3(5, 1, 0);
			//powerBar.shotTaken = false;
		} 
		if(ball == null) {
			//Resets the camera once the ball is destroyed 
			movingCamera.transform.position = fpc.transform.position;
			crosshair.SetActive(true);
		}
	}
	//Turns back on the cross hair 
	if(deactivateScript) {
		crosshair.SetActive(true);
	}
}