import { Subscriber } from '../Types/Subscriber';

import { PlayerTurnResult } from './PlayerTurnResult';

/** ToDo .*/
export class Debugger implements Subscriber<PlayerTurnResult> {
	public constructor(private debuggerElement: HTMLElement | null) {}

	/** Append new value in the Debugger .
	 * @param diceResult Dice result of current turn.
	 */
	public update(diceResult: PlayerTurnResult): void {
		if (this.debuggerElement) {
			this.debuggerElement.innerText += ` ${diceResult.diceResult}`;
		}
	}
}
