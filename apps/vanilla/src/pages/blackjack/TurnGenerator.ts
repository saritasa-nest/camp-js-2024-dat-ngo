/** This is foo comment . */
import { Publisher } from './Pubshiers';

export class TurnGenerator extends Publisher<number> {
	private playerCount;

	public currentPlayerIndex = 0;

	public constructor(private plCount: number) {
		super();
		this.playerCount = this.plCount;
	}

	/** Next . */
	public next(): void {
		const playerIndex = this.currentPlayerIndex;
		this.currentPlayerIndex = (playerIndex + 1) % this.playerCount;
		this.notify();
	}

	public override notify(): void {
		super.notify(this.currentPlayerIndex);
	}
}
