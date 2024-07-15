import { isHTMLButtonElement } from '../guards/isHTMLButtonElement';
import { Subscriber } from '../types/subscriber';

/** Winner displayer.*/
export class WinnerDisplayer implements Subscriber<boolean> {
	private readonly containerElement: HTMLElement | null = null;

	public constructor(name: string) {
		this.containerElement = document.getElementById(name);
	}

	/**
	 * Update win Status.
	 *  @param isWin From the Player.*/
	public update(isWin: boolean): void {
		if (isWin) {
			this.containerElement?.classList.add('win');
			const buttonElement = document.getElementById('button-roll');
			if (isHTMLButtonElement(buttonElement)) {
				buttonElement.disabled = true;
			}
		}
	}
}
