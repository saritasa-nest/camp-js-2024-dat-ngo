import { Subscriber } from "./Subscriber";

/** This is foo comment . */
export class ResultDisplayer implements Subscriber<number[]> {
	/** This is foo comment . */
	private diceResult: number[] = [];

	private totalScores = 0;

	private getTotalScore(): number {
		return this.diceResult.reduce((sum, result) => sum + result, 0);
	}

	public constructor(private resultElement: HTMLElement | null, private totalElement: HTMLElement | null) {}

	public update(message: number[]): void {
		this.diceResult = message;
		this.totalScores = this.getTotalScore();
		if (this.resultElement) {
			this.resultElement.innerText = `${this.diceResult.join(', ')}`;
		}
		if (this.totalElement) {
			this.totalElement.innerText = `${this.totalScores}`;
		}
	}
}
