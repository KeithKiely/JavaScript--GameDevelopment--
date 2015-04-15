#pragma strict
/*Script is used to make the goalkeeper dive in a random direction
when the ball is kicked*/
//Variables 
//Animator variable 
var anim: Animator;

function setKeeperPosition(){
	var keeper = gameObject.FindWithTag("GoalKeeper");
	keeper.transform.position = Vector3(3.38,0.08,32.173);
}

//Triggers a left or right dive
function Dive() {
	var dive: int;
	//Choose a random number between 1 - 3 to set dive state
	dive = Random.Range(1, 3);
	switch(dive) {
		case 1:
		//Tells the animator which animation to play
		anim.SetTrigger("Left");
		//Waits for 3 seconds then resets the goalkeeper 
		yield WaitForSeconds(3);
		setKeeperPosition();
		break;
		case 2: 
		anim.SetTrigger("Right");
		yield WaitForSeconds(3);
		setKeeperPosition();
		break;
		case 3:
		break;
	}
}