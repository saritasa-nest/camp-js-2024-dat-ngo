import { isHTMLButtonElement } from '../guards/isHTMLButtonElement';
import { Subscriber } from '../types/subscriber';

/** Winner displayer.*/
export class WinnerDisplayer implements Subscriber<number> {
	private containerElement: HTMLElement | null = null;

	public constructor(name: string) {
		this.containerElement = document.getElementById(name);
	}

	/**
	 * Update win Status.
	 *  @param winnerIndex From the Player.*/
	public update(winnerIndex: number): void {
		if (winnerIndex != null) {
			const buttonElement = document.getElementById('button-roll');
			if (isHTMLButtonElement(buttonElement)) {
				buttonElement.disabled = true;
			}
			this.containerElement = document.getElementById(`Player-${(winnerIndex + 1)}`);
			this.containerElement?.classList.add('win');
		} else {
			const buttonElement = document.getElementById('button-reset');
			if (isHTMLButtonElement(buttonElement)) {
				buttonElement.disabled = true;
			}
		}
	}
}
