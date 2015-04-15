#pragma strict
/*Adds friction to the ball when it is on the Ground
Slows the ball down whlst it's touching the ground*/
//Variables 
//Is the ball on the ground
private var onGround: boolean;

function Start () {
	onGround = false;
}

function Update () {
	if(onGround == true) {
		//Adds force in the opposite direction to movement 
		var frictionForce : Vector3 = gameObject.rigidbody.velocity*-1;
		gameObject.rigidbody.AddForce(frictionForce);
		var ballMoving = gameObject.rigidbody.velocity.magnitude;
		//Destroys the ball if it isn't moving 
		if(ballMoving <= 0.5f) {
			Destroy(gameObject);
		}
	}
}

//If the ball collides with the ground onGround is set to true
function OnCollisionEnter(col: Collision) {
	if (col.gameObject.tag == "Ground") {
		onGround = true;
	}
}