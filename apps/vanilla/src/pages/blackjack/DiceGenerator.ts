/** This is foo comment . */
import { Publisher } from './Pubshiers';
import { Subscriber } from './Subscriber';
import { PlayerTurnResult } from './PlayerTurnResult';

export class DiceGenerator extends Publisher<PlayerTurnResult> implements Subscriber<number> {
	/** */
	public sideCount = 6;

	public roll(): number {
		return Math.floor(Math.random() * this.sideCount) + 1;
	}

	public update(playerIndex: number) {
		const diceResult = this.roll();
		const turnResult = new PlayerTurnResult(playerIndex, diceResult);
		this.notify(turnResult);
	}
}
