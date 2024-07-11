import { Subscriber } from "./Subscriber";

export class WinnerDisplayer implements Subscriber<boolean> {
	public constructor(private winnerElement: HTMLElement | null) {}

	public update(message: boolean): void {
		console.log(message);
		if (message && this.winnerElement) {
			this.winnerElement.classList.add('won');
		}
	}
}
