import { Publisher } from '../types/publisher';

import { PlayerTurnResult } from '../types/player-turn-result';

import { ResultData } from './result-displayer';

/** Inspector is the class illustrate the member that subscribe to the game. */
export class Inspector {

	/** The number array of dice results. */
	private readonly diceResults: number[] = [];

	/** Create a publisher for Result Data.*/
	public readonly result: Publisher<ResultData> = new Publisher<ResultData>();

	/** Function to get total score of dice result array. */
	protected get getTotalScore(): number {
		return this.diceResults.reduce((result, current) => result + current, 0);
	}

	/**
	 * Function to update the current diceResults array using PlayerTurnResult.
	 * @param turnResult Player and Debugger will extends this class and they are subscriber of
	 * DiceGenerator which is a Publisher<PlayerTurnResult>.
	 */
	protected updateDiceList(turnResult: PlayerTurnResult): number[] {
		this.diceResults.push(turnResult.diceResult);
		return [...this.diceResults];
	}
}
