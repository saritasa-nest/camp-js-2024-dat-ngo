import { Subscriber } from '../Types/Subscriber';

import { Inspector } from './inspector';

import { PlayerTurnResult } from './playerTurnResult';

import { ResultData } from './resultDisplayer';

/** ToDo .*/
export class Debugger extends Inspector implements Subscriber<PlayerTurnResult> {

	/** Debugger update the dice result base on the DiceGenerator.
	 * @param playerDiceResult PlayerDuceResult is the dice result of current player.
	 */
	public update(playerDiceResult: PlayerTurnResult): void {
		this.updateDiceList(playerDiceResult);
		this.result.notify(new ResultData(this.diceResults, this.getTotalScore()));
	}
}
