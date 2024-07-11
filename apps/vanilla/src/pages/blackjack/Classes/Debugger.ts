import { Subscriber } from '../Types/Subscriber';

import { PlayerTurnResult } from './PlayerTurnResult';

/** ToDo .*/
export class Debugger implements Subscriber<PlayerTurnResult> {
	private debuggerArray: number[] = [];

	private debuggerElement: HTMLElement | null = null;

	private totalElement: HTMLElement | null = null;

	private totalScores = 0;

	private getTotalScore(): number {
		return this.debuggerArray.reduce((sum, result) => sum + result, 0);
	}

	public constructor() {
		const wrapper = document.getElementById('wrapper');
		this.debuggerElement = document.createElement('div');
		wrapper?.appendChild(this.debuggerElement);
		this.totalElement = document.createElement('span');
		wrapper?.appendChild(this.totalElement);
	}

	/** Append new value in the Debugger .
	 * @param diceResult Dice result of current turn.
	 */
	public update(diceResult: PlayerTurnResult): void {
		this.debuggerArray.push(diceResult.diceResult);
		console.log(this.debuggerArray);
		this.totalScores = this.getTotalScore();
		console.log(this.totalScores);
		if (this.debuggerElement) {
			this.debuggerElement.innerText += ` ${diceResult.diceResult}`;
		}
		if (this.totalElement) {
			this.totalElement.innerText = this.totalScores.toString();
		}
	}
}
