import { Subscriber } from '../Types/subscriber';
import { PlayerTurnResult } from '../types/player-turn-result';

import { Inspector } from './inspector';
import { Result } from './result-displayer';

/** Class illustrate a player in a game.*/
export class Player extends Inspector implements Subscriber<PlayerTurnResult> {
	public constructor(private readonly playerIndex: number) {
		super();
	}

	/**
	 * Update turn.
	 * @param turnResult The result of current dice turn which has result and index of player.
	 */
	public update(turnResult: PlayerTurnResult): void {
		if (turnResult.playerIndex === this.playerIndex) {
			const diceResults = this.updateDiceList(turnResult);
			const newResult: Result = {
				diceResult: diceResults,
				totalScore: this.getTotalScore,
			};
			this.result.notify(newResult);
		}
	}
}
