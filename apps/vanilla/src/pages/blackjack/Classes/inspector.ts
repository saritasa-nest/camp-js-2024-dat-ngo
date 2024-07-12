import { PlayerTurnResult } from './playerTurnResult';
import { Publisher } from './Publisher';
import { ResultData } from './resultDisplayer';

/** Inspector is the class illustrate the member that subscribe to the game?? . */
export class Inspector {

	/** The number array of dice results. */
	protected readonly diceResults: number[] = [];

	/** Create a publisher for Result Data.*/
	public readonly result: Publisher<ResultData> = new Publisher<ResultData>();

	/** Function to get total score of dice result array. */
	protected getTotalScore(): number {
		return this.diceResults.reduce((result, current) => result + current, 0);
	}

	/** Function to update the current diceResults array using PlayerTurnResult.
	 * @param turnResult Player and Debugger will extends this class and they are subscriber of
	 * DiceGenerator which is a Publisher<PlayerTurnResult> .*/
	protected updateDiceList(turnResult: PlayerTurnResult): void {
		this.diceResults.push(turnResult.diceResult);
	}
}
