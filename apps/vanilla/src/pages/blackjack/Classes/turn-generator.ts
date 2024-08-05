/** This is foo comment. */
import { Publisher } from '../Types/publisher';

/** TurnGenerator.*/
export class TurnGenerator extends Publisher<number> {
	private readonly playerCount;

	/** Default player index = 0. */
	public currentPlayerIndex = 0;

	/** @param players Number of Player. */
	public constructor(private readonly players: number) {
		super();
		this.playerCount = this.players;
	}

	/** Function next() to inform the dice it's next turn to do a dice .*/
	public next(): void {
		this.notify(this.currentPlayerIndex);
		this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.playerCount;
	}
}
