import { Subscriber } from '../Types/subscriber';
import { Publisher } from '../Types/publisher';

import { PlayerTurnResult } from '../Types/player-turn-result';
import { getRandomIntegerNumber } from '../utils/utils';
import { SIDE_COUNT } from '../constants';

/** DiceGenerator is a publisher for PlayerTurnResult to notify for inspector.*/
export class DiceGenerator extends Publisher<PlayerTurnResult> implements Subscriber<number> {
	/** Rolls the dice. */
	public roll(): number {
		return getRandomIntegerNumber(SIDE_COUNT);
	}

	/**
	 * Update turn results.
	 * @param playerIndex Index of current player.
	 */
	public update(playerIndex: number): void {
		const diceResult = this.roll();
		const turnResult = { playerIndex, diceResult };
		this.notify(turnResult);
	}
}
