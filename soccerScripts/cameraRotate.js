#pragma strict
/*Simple script to make the camera rotate around the pitch 
at the start of the game*/
//Variables 
//Empty object at the center of the pitch
public var target: Transform;
//Rotation Speed
public var speed: int;

function Start () {
	speed = 20;
}

function Update () {
	//Object that script is attached to looks at the target
	transform.LookAt(target);
	//Object rotates 360 degrees 
	transform.RotateAround(target.transform.position,Vector3.up,Time.deltaTime * speed);
}