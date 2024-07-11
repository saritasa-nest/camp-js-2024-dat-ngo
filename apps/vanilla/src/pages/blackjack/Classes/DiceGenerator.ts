/** This is foo comment .*/
import { Subscriber } from '../Types/Subscriber';

import { Publisher } from './Publisher';

import { PlayerTurnResult } from './PlayerTurnResult';

/** DiceGenerator .*/
export class DiceGenerator extends Publisher<PlayerTurnResult> implements Subscriber<number> {
	/** */
	public sideCount = 6;

	/** Roll dice return a random number base on side count. */
	public roll(): number {
		return Math.floor(Math.random() * this.sideCount) + 1;
	}

	/** @param playerIndex Index of current player . */
	public update(playerIndex: number): void {
		const diceResult = this.roll();
		const turnResult = new PlayerTurnResult(playerIndex, diceResult);
		this.notify(turnResult);
	}
}
