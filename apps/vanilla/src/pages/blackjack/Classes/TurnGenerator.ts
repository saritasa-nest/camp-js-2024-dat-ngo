/** This is foo comment . */
import { Publisher } from './Publisher';

/** TurnGenerator .*/
export class TurnGenerator extends Publisher<number> {
	private playerCount;

	/** Default player index = 0 .*/
	public currentPlayerIndex = 0;

	public constructor(private plCount: number) {
		super();
		this.playerCount = this.plCount;
	}

	/** Next . */
	public next(): void {
		const playerIndex = this.currentPlayerIndex;
		this.notify();
		this.currentPlayerIndex = (playerIndex + 1) % this.playerCount;
	}

	/** Notify current player index .*/
	public override notify(): void {
		super.notify(this.currentPlayerIndex);
	}
}
