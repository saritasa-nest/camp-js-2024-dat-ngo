/** This is foo comment . */
import { Publisher } from '../Types/publisher';

/** TurnGenerator .*/
export class TurnGenerator extends Publisher<number> {
	private readonly playerCount;

	/** Default player index = 0 .*/
	public currentPlayerIndex = 0;

	/** @param players Number of Player. */
	public constructor(private readonly players: number) {
		super();
		this.playerCount = this.players;
	}

	/** When the next() function execute, it notify the currentPlayer Index to Dice
	 * and currentPlayerIndex will be move to the next player, Dice will receive the
	 * index and dice a random number along with the index and notify that Player and
	 * Debugger will receive that that notify for the Result Displayer to display out
	 * the result and debugger.
	 */
	public next(): void {
		this.notify(this.currentPlayerIndex);
		this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.playerCount;
	}
}
