import { isHTMLButtonElement } from '../guards/isHTMLButtonElement';
import { isHTMLElement } from '../guards/isHTMLElement';
import { Subscriber } from '../Types/subscriber';

/** ResultData. */
export class ResultData {
	public constructor(public readonly diceResult: number[], public readonly totalScore: number) {}
}

/** This is foo comment . */
export class ResultDisplayer implements Subscriber<ResultData> {
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
			wrapper?.appendChild(resultDisplayerElement);
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
	 * Function to create new HTML elements .
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
	public update(resultArray: ResultData): void {
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

/** Winner displayer.*/
export class WinnerDisplayer implements Subscriber<boolean> {

	private readonly containerElement: HTMLElement | null = null;

	public constructor(name: string) {
		this.containerElement = document.getElementById(name);
	}

	/** Update winStatus.
	 *  @param winStatus From the Player.*/
	public update(winStatus: boolean): void {
		if (winStatus) {
			this.containerElement?.classList.add('win');
			const buttonElement = document.getElementById('button-roll');
			if (isHTMLButtonElement(buttonElement)) {
				buttonElement.disabled = true;
			}
		}
	}
}