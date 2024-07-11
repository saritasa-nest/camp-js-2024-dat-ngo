import { Subscriber } from '../Types/Subscriber';

import { PlayerTurnResult } from './PlayerTurnResult';

import { Publisher } from './Publisher';

/** This is foo comment . */
export class Player implements Subscriber<PlayerTurnResult> {
	private readonly diceResults: number[] = [];

	/** Number array of dice result of each player .*/
	public results: Publisher<number[]> = new Publisher<number[]>();

	/** Win status of each player .*/
	public winStatus: Publisher<boolean> = new Publisher<boolean>();

	public constructor(private playerIndex: number) {}

	private getTotalScore(): number {
		return this.diceResults.reduce((sum, result) => sum + result, 0);
	}

	/** @param turnResult The result of current dice turn which has result and index of player . */
	public update(turnResult: PlayerTurnResult): void {
		if (turnResult.playerIndex === this.playerIndex) {
			this.diceResults.push(turnResult.diceResult);
			this.results.notify(this.diceResults);
			if (this.getTotalScore() > 21) {
				this.winStatus.notify(true);
			}
		}
	}
}
