import { Subscriber } from '../Types/Subscriber';
import { PlayerTurnResult } from './PlayerTurnResult';

class Displayer<T> implements Subscriber<T> {
	protected containerElement: HTMLElement | null = null;

	public constructor(name: string) {
		this.containerElement = document.getElementById(name);
	}

	public update(message: T): void {}
}

// export class Debugger extends Displayer<PlayerTurnResult> {
// 	private resultElement: HTMLElement | null = null;

// 	private totalElement: HTMLElement | null = null;

// 	public constructor(name: string) {
// 		super(name);
// 		super(name);
// 		this.containerElement = document.createElement('div');
// 		this.containerElement.id = name;
// 		this.containerElement.classList.add('displayer');

// 		const wrapper = document.getElementById('wrapper');
// 		if (this.containerElement) {
// 			wrapper?.appendChild(this.containerElement);
// 		}

// 		this.resultElement = document.createElement('div');
// 		this.totalElement = document.createElement('span');

// 		const heading = document.createElement('h2');
// 		heading.textContent = name;
// 		heading.appendChild(this.totalElement);

// 		this.containerElement?.appendChild(heading);
// 		this.containerElement?.appendChild(this.resultElement);
// 	}

// 	/** Append new value in the Debugger .
// 	 * @param diceResult Dice result of current turn.
// 	 */
// 	public update(diceResult: PlayerTurnResult): void {
// 		if (this.resultElement) {
// 			this.debuggerElement.innerText += ` ${diceResult.diceResult}`;
// 		}
// 	}
// }

/** This is foo comment . */
export class ResultDisplayer extends Displayer<number[]> {
	private diceResult: number[] = [];

	private totalScores = 0;

	private resultElement: HTMLElement | null = null;

	private totalElement: HTMLElement | null = null;

	private getTotalScore(): number {
		return this.diceResult.reduce((sum, result) => sum + result, 0);
	}

	public constructor(name: string) {
		super(name);
		this.containerElement = document.createElement('div');
		this.containerElement.id = name;
		this.containerElement.classList.add('displayer');

		const wrapper = document.getElementById('wrapper');
		if (this.containerElement) {
			wrapper?.appendChild(this.containerElement);
		}

		this.resultElement = document.createElement('div');
		this.totalElement = document.createElement('span');

		const heading = document.createElement('h2');
		heading.textContent = name;
		heading.appendChild(this.totalElement);

		this.containerElement?.appendChild(heading);
		this.containerElement?.appendChild(this.resultElement);
	}

	/** @param resultArray Result Array from Player. */
	public override update(resultArray: number[]): void {
		this.diceResult = resultArray;
		this.totalScores = this.getTotalScore();
		if (this.resultElement) {
			this.resultElement.innerText = `${this.diceResult.join(', ')}`;
		}
		if (this.totalElement) {
			this.totalElement.innerText = ` - ${this.totalScores}`;
		}
	}
}
export class WinnerDisplayer extends Displayer<boolean> {
	public constructor(name: string) {
		super(name);
	}

	override update(winStatus: boolean): void {
		if (winStatus) {
			this.containerElement?.classList.add('win');
			(document.getElementById('button-roll') as HTMLButtonElement).disabled = true;
		}
	}
}
