#pragma strict
/*Displays a messge that states if 
the player had missed their shot or scored*/

public var penaltyMessage: GameObject;
public var penaltyScoredSprite: Sprite;
public var penaltyMissedSprite: Sprite;
//public var missedImg: UI.Image;

function goalScoredMessage( num:int ) {
	if (num == 1) {
		//Displays a gui image if a goal is scored
		penaltyMessage.SetActive(true);
		penaltyMessage.GetComponent(Image).sprite = penaltyScoredSprite;
		yield WaitForSeconds(1.2);
		penaltyMessage.SetActive(false);
	} else {
		//Displays a gui image if a a shot is missed
		penaltyMessage.SetActive(true);
		penaltyMessage.GetComponent(Image).sprite = penaltyMissedSprite;
		yield WaitForSeconds(1.2);
		penaltyMessage.SetActive(false);
	}
}