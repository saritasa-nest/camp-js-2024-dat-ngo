import { Subscriber } from '../types/subscriber';

import { PlayerTurnResult } from '../types/player-turn-result';

import { Inspector } from './inspector';
import { ResultData } from './result-displayer';

/** Debugger.*/
export class Debugger extends Inspector implements Subscriber<PlayerTurnResult> {

	/**
	 * Debugger update the dice result base on the DiceGenerator.
	 * @param playerDiceResult PlayerDuceResult is the dice result of current player.
	 */
	public update(playerDiceResult: PlayerTurnResult): void {
		const diceResults = this.updateDiceList(playerDiceResult);
		this.result.notify(new ResultData(diceResults, this.getTotalScore));
	}
}
