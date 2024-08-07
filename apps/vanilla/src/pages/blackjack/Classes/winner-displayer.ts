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
		const buttonElement =
			winnerIndex != null ? document.getElementById('button-roll') : document.getElementById('button-reset');
		if (winnerIndex != null) {
			this.containerElement = document.getElementById(`Player-${winnerIndex + 1}`);
			this.containerElement?.classList.add('win');
		}

		if (isHTMLButtonElement(buttonElement)) {
			buttonElement.disabled = true;
		}
	}
}
