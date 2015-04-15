#pragma strict
/*Allows the player to cycle between cameras. Each camera represent 
a different view of the pitch */
import UnityEngine.UI;

//Variables 
//Current camera 
private var activeCam: int;
// Total cameras
private var numCams: int;
//Text area to display current camera
public var actCamText: Text;

function Start () {
	//Sets the current camera to 1 upon loading of the script 
	changeCamera(1);
	numCams = 3;
	actCamText.text = "Active camera: " + activeCam;
}

function Update () {
	//When the space key is pressed change camera 
	if (Input.GetKeyUp("space")) {
		activeCam++;
		changeCamera(activeCam);
		actCamText.text = "Active camera: " + activeCam;
	}
	//When H is pressed activate camera 2
	if (Input.GetKeyUp(KeyCode.H)) {
		print("pressed h");
		activeCam = 2;
		changeCamera(2);
	}
}

/*Method that closeses that display port of the none active cameras */
function changeCamera(setCamera: int) {
	if(activeCam >= numCams) {
		activeCam = 0;
	}
	if (gameObject.name=="camera" + setCamera) {
		camera.rect = Rect(0,0,1,1);
		print("camera" + setCamera);
	} else {
		camera.rect = Rect(0,0,0,0);
		print("camera" + setCamera);
	}
}

