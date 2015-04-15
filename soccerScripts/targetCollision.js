#pragma strict

/*Checks to see if the player has scored a 
goal or hit a target*/

private var respawn: GameObject ;

public var explosionEffect: GameObject;

function Start() {
	//Finds and stores the empty gameobject tagged Respawn
	respawn = gameObject.FindWithTag("Respawn");
}

//Checks ball collision with other objects
function OnCollisionEnter( collision: Collision) {
	if (collision.gameObject.tag == "30Points") {
		print("Hit target: 30");
		Setup.currentScore += 30;
		print("Total score" + Setup.currentScore);
		//Sends message to Play aduio
		//respawn.SendMessage("playAudio",1);
		respawn.GetComponent("scoredUI").SendMessage("goalScoredMessage",1);
		//Destroy target and ball
		Destroy(collision.gameObject);
		Destroy(gameObject);
	}
	if (collision.gameObject.tag == "50Points") {
		print("Hit target: 50");
		Setup.currentScore += 50;
		print("Total score" + Setup.currentScore);
		//Sends message to Play aduio
		//respawn.SendMessage("playAudio",1);
		respawn.GetComponent("scoredUI").SendMessage("goalScoredMessage",1);
		//Destroy target and ball
		Destroy(collision.gameObject);
		Destroy(gameObject);
	}
	if (collision.gameObject.tag == "80Points") {
		print("Hit target: 80");
		Setup.currentScore += 80;
		print("Total score" + Setup.currentScore);
		//Sends message to Play aduio
		//respawn.SendMessage("playAudio",1);
		respawn.GetComponent("scoredUI").SendMessage("goalScoredMessage",1);
		//Destroy target/ball & instantiate explosion
		Instantiate(explosionEffect,gameObject.transform.position,gameObject.transform.rotation);
		Destroy(collision.gameObject);
		Destroy(gameObject);
	}
	if (collision.gameObject.tag == "120Points") {
		print("Hit target: 120");
		Setup.currentScore += 120;
		print("Total score" + Setup.currentScore);
		//Sends message to Play aduio
		//respawn.SendMessage("playAudio",1);
		respawn.GetComponent("scoredUI").SendMessage("goalScoredMessage",1);
		//Destroy target/ball & instantiate explosion
		Instantiate(explosionEffect,gameObject.transform.position,gameObject.transform.rotation);
		Destroy(collision.gameObject);
		Destroy(gameObject);
	}
	if (collision.gameObject.tag == "OutOfBounds") {
		respawn.SendMessage("playAudio",2);
		respawn.GetComponent("scoredUI").SendMessage("goalScoredMessage",2);
		//Destroy ball
		Destroy(gameObject);
	}
	if (collision.gameObject.tag == "Post") {
		respawn.SendMessage("playAudio",5);
		//Destroy ball
		Destroy(gameObject);
	}
}

//Checks to see if the ball has passed the goal line
function OnTriggerEnter(other : Collider) {
	if (other.name == "goalCollider") {
		Setup.currentScore += 1;
		respawn.GetComponent("scoredUI").SendMessage("goalScoredMessage",1);
		Destroy(gameObject);
	}
}