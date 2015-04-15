#pragma strict
/*Plays audio queue  after certain events have been triggered from 
other scripts*/
//Variables 
//Crowed cheering, applause, booing, kicking ball sound & hit crossbar 
public var crowdAudio: AudioClip;
public var applause: AudioClip;
public var booing: AudioClip;
public var kickBall: AudioClip;
public var offThePost: AudioClip;

//A different sound plays depending on the received number
function playAudio(index: int) {
	if (index == 1) {
		audio.PlayOneShot(crowdAudio);
	} 
	if(index == 2) {
		audio.Stop();
		audio.PlayOneShot(booing);
	}
	if(index == 3) {
		audio.PlayOneShot(applause);
	}
	if(index == 4) {
		audio.PlayOneShot(kickBall);
	}
	if(index == 5) {
		audio.PlayOneShot(offThePost);
	}
}