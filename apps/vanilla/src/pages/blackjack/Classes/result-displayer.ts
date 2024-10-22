import { isHTMLElement } from '../guards/isHTMLElement';
import { Subscriber } from '../types/subscriber';

/** Result. */
export type Result = {

	/** Dice Result of current turn. */
	readonly diceResult: number[];

	/** Total score of current player. */
	readonly totalScore: number;
};

/** ResultDisplayer is the displayer of the result and history . */
export class ResultDisplayer implements Subscriber<Result> {
	private diceResult: number[] = [];

	private totalScores = 0;

	private resultElement: HTMLElement | null = null;

	private totalElement: HTMLElement | null = null;

	private getTotalScore(): number {
		return this.diceResult.reduce((sum, result) => sum + result, 0);
	}

	public constructor(name: string) {
		const resultDisplayerElement = this.createResultDisplayerElement(name);

		const wrapper = document.getElementById('game-screen');
		if (resultDisplayerElement) {
			wrapper?.patchChild(resultDisplayerElement);
		}
		this.resultElement = document.getElementById(`${name}-dice-results`);
		this.totalElement = document.getElementById(`${name}-score`);
	}

	private createResultDisplayerElement(name: string): HTMLElement | null {
		return this.createElement(`<article id="${name}" class="game-screen__displayer displayer">
				<h2 class="displayer__heading">${name}
					<span id="${name}-score"><span/>
				</h2>
				<div id="${name}-dice-results" class="displayer__dice-results"></div>
			</article>`);
	}

	/**
	 * Create new HTML elements .
	 * @param htmlString String of HTML elements.
	 */
	private createElement(htmlString: string): HTMLElement | null {
		const div = document.createElement('div');
		div.innerHTML = htmlString.trim();
		if (isHTMLElement(div.firstChild)) {
			return div.firstChild;
		}
		return null;
	}

	/**
	 * Add docs here.
	 * @param resultArray Result Array from Player.
	 */
	public update(resultArray: Result): void {
		this.diceResult = resultArray.diceResult;
		this.totalScores = this.getTotalScore();
		if (this.resultElement) {
			this.resultElement.innerText = `${this.diceResult.join(', ')}`;
		}
		if (this.totalElement) {
			this.totalElement.innerText = ` - ${this.totalScores}`;
		}
	}
}
