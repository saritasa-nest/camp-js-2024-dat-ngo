import { Subscriber } from '../Types/subscriber';
import { PlayerTurnResult } from '../Types/player-turn-result';

import { Inspector } from './inspector';

/** Class illustrate a player in a game.*/
export class Player extends Inspector implements Subscriber<PlayerTurnResult> {
	public constructor(private readonly playerIndex: number) {
		super();
	}

	/** @inheritdoc */
	public update(turnResult: PlayerTurnResult): void {
		if (turnResult.playerIndex === this.playerIndex) {
			const diceResults = this.updateDiceList(turnResult);
			this.result.notify({
				diceResult: diceResults,
				totalScore: this.getTotalScore,
			});
		}
	}
}
