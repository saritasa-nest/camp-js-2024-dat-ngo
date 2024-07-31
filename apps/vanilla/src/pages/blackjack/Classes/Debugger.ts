import { Publisher } from '../Types/publisher';
import { Subscriber } from '../Types/subscriber';

import { PlayerTurnResult } from '../Types/player-turn-result';
import { NUMBER_OF_PLAYER, WIN_SCORE } from '../constants';

import { Inspector } from './inspector';
import { Result } from './result-displayer';

/** ResultHistory update the dice result base on the DiceGenerator.*/
export class ResultHistory extends Inspector implements Subscriber<PlayerTurnResult> {
	/** Winning player index.*/
	public readonly winnerIndex: Publisher<number> = new Publisher<number>();

	private readonly playersResult: number[] = new Array(NUMBER_OF_PLAYER).fill(0);

	/** @inheritdoc */
	public update(playerDiceResult: PlayerTurnResult): void {
		const diceResults = this.updateDiceList(playerDiceResult);
		const newResult: Result = {
			diceResult: diceResults,
			totalScore: this.getTotalScore,
		};
		this.result.notify(newResult);
		this.playersResult[playerDiceResult.playerIndex] += playerDiceResult.diceResult;
		if (this.playersResult[playerDiceResult.playerIndex] > WIN_SCORE) {
			this.winnerIndex.notify(playerDiceResult.playerIndex);
		}
	}
}
