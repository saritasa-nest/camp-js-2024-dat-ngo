import { PlayerTurnResult } from "./PlayerTurnResult";
import { Publisher } from "./Pubshiers";
import { Subscriber } from "./Subscriber";

/** This is foo comment . */
export class Player implements Subscriber<PlayerTurnResult> {
	private readonly diceResults: number[] = [];

	public results: Publisher<number[]> = new Publisher<number[]>();

	public winStatus: Publisher<boolean> = new Publisher<boolean>();

	public constructor(private playerIndex: number) {}

	private getTotalScore(): number {
		return this.diceResults.reduce((sum, result) => sum + result, 0);
	}

	/** This is foo comment . */
	public update(message: PlayerTurnResult): void {
		if (message.playerIndex === this.playerIndex) {
			this.diceResults.push(message.diceResult);
			this.results.notify(this.diceResults);
			if (this.getTotalScore() > 21) {
				this.winStatus.notify(true);
			}
		}
	}
}
