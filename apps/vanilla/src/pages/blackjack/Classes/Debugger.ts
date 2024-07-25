import { Publisher } from '../Types/publisher';
import { Subscriber } from '../types/subscriber';

import { PlayerTurnResult } from '../Types/player-turn-result';
import { NUMBER_OF_PLAYER, WIN_SCORE } from '../constants';

import { Inspector } from './inspector';
import { Result } from './result-displayer';

/** Debugger.*/
export class Debugger extends Inspector implements Subscriber<PlayerTurnResult> {
	/** Win index of player.*/
	public readonly winnerIndex: Publisher<number> = new Publisher<number>();

	private readonly playersResult: number[] = new Array(NUMBER_OF_PLAYER).fill(0);

	/**
	 * Debugger update the dice result base on the DiceGenerator.
	 * @param playerDiceResult PlayerDuceResult is the dice result of current player.
	 */
	public update(playerDiceResult: PlayerTurnResult): void {
		const diceResults = this.updateDiceList(playerDiceResult);
		this.result.notify(new Result(diceResults, this.getTotalScore));
		this.playersResult[playerDiceResult.playerIndex] += playerDiceResult.diceResult;
		if (this.playersResult[playerDiceResult.playerIndex] > WIN_SCORE) {
			this.winnerIndex.notify(playerDiceResult.playerIndex);
		}
	}
}
