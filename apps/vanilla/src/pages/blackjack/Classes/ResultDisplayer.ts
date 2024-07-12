import { Subscriber } from '../Types/Subscriber';

/** ResultData. */
export class ResultData {
	public constructor(public diceResult: number[], public totalScore: number) {}
}

/**  Displayer class for Result Displayer and Winner Displayer to extend .*/
class Displayer<T> implements Subscriber<T> {
	/** */
	protected containerElement: HTMLElement | null = null;

	public constructor(name: string) {
		this.containerElement = document.getElementById(name);
	}

	/** Update message. @param message Message from Publisher .*/
	public update(message: T): void {}

	/** Function to create new HTML elements .
	 * @param htmlString String of HTML elements.
	 */
	public createElement(htmlString: string): HTMLElement {
		const div = document.createElement('div');
		div.innerHTML = htmlString.trim();
		return div.firstChild as HTMLElement;
	}
}

/** This is foo comment . */
export class ResultDisplayer extends Displayer<ResultData> {
	private diceResult: number[] = [];

	private totalScores = 0;

	private resultElement: HTMLElement | null = null;

	private totalElement: HTMLElement | null = null;

	private getTotalScore(): number {
		return this.diceResult.reduce((sum, result) => sum + result, 0);
	}

	public constructor(name: string) {
		super(name);
		this.containerElement = this.createHTMLElement(name);

		const wrapper = document.getElementById('wrapper');
		if (this.containerElement) {
			wrapper?.appendChild(this.containerElement);
		}
		this.resultElement = document.getElementById(`${name}-dice-results`);
		this.totalElement = document.getElementById(`${name}-score`);
	}

	private createHTMLElement(name: string): HTMLElement {
		return this.createElement(`<article id="${name}" class="displayer">
				<h2 class="displayer__heading">${name}
					<span id="${name}-score"><span/>
				</h2>
				<div id="${name}-dice-results" class="dice-results"></div>
			</article>`);
	}

	/** @param resultArray Result Array from Player. */
	public override update(resultArray: ResultData): void {
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

/** Winner .*/
export class WinnerDisplayer extends Displayer<boolean> {
	public constructor(name: string) {
		super(name);
	}

	/** Update winStatus.
	 *  @param winStatus From the Player.*/
	public override update(winStatus: boolean): void {
		if (winStatus) {
			this.containerElement?.classList.add('win');
			(document.getElementById('button-roll') as HTMLButtonElement).disabled = true;
		}
	}
}
