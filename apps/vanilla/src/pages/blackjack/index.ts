/* eslint-disable jsdoc/require-param */
/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-console */
import { Subscriber } from './Subscriber';

/** Publisher class . */
class Publisher<T> {
	/** Array of subscribers . */
	private subscribers: Subscriber<T>[] = [];

	/** Method to add subscriber . */
	public subscribe(subscriber: Subscriber<T>): void {
		this.subscribers.push(subscriber);
	}

	/** Method to remove subscriber . */
	public unsubscribe(subscriber: Subscriber<T>): void {
		this.subscribers = this.subscribers.filter((sub) => sub !== subscriber);
	}

	/** Method to notify . */
	public notify(message: T): void {
		this.subscribers.forEach((sub) => sub.update(message));
	}
}

/** This is foo comment . */
class TurnGenerator extends Publisher<number> {
	private playerCount;

	public currentPlayerIndex = 0;

	public constructor(private plCount: number) {
		super();
		this.playerCount = this.plCount;
	}

	/** Next . */
	public next(): void {
		const playerIndex = this.currentPlayerIndex;
		this.currentPlayerIndex = (playerIndex + 1) % this.playerCount;
		this.notify();
	}

	public override notify(): void {
		super.notify(this.currentPlayerIndex);
	}
}

/** This is foo comment . */
class DiceGenerator extends Publisher<PlayerTurnResult> implements Subscriber<number> {
	/** */
	public sideCount = 6;

	public roll(): number {
		return Math.floor(Math.random() * this.sideCount) + 1;
	}

	public update(playerIndex: number) {
		const diceResult = this.roll();
		const turnResult = new PlayerTurnResult(playerIndex, diceResult);
		this.notify(turnResult);
	}
}

/** This is foo comment . */
class PlayerTurnResult {
	/** This is foo comment . */
	public constructor(public playerIndex: number, public diceResult: number) {}
}

/** This is foo comment . */
class Player implements Subscriber<PlayerTurnResult> {
	private readonly diceResults: number[] = [];

	public results: Publisher<number[]> = new Publisher<number[]>();

	public winStatus: Publisher<boolean> = new Publisher<boolean>();

	public constructor(private playerIndex: number) {}

	private getTotalScore(): number {
		return this.diceResults.reduce((sum, result) => sum + result, 0);
	}

	/** This is foo comment . */
	public update(message: PlayerTurnResult): void {
		if (message.playerIndex === this.playerIndex) {
			this.diceResults.push(message.diceResult);
			this.results.notify(this.diceResults);
			if (this.getTotalScore() > 21) {
				this.winStatus.notify(true);
			}
		}
	}
}

/** This is foo comment . */
class ResultDisplayer implements Subscriber<number[]> {
	/** This is foo comment . */
	private diceResult: number[] = [];

	private totalScores = 0;

	private getTotalScore(): number {
		return this.diceResult.reduce((sum, result) => sum + result, 0);
	}

	public constructor(private resultElement: HTMLElement | null, private totalElement: HTMLElement | null) {}

	public update(message: number[]): void {
		this.diceResult = message;
		this.totalScores = this.getTotalScore();
		if (this.resultElement) {
			this.resultElement.innerText = `${this.diceResult.join(', ')}`;
		}
		if (this.totalElement) {
			this.totalElement.innerText = `${this.totalScores}`;
		}
	}
}

class WinnerDisplayer implements Subscriber<boolean> {
	public constructor(private winnerElement: HTMLElement | null) {}

	public update(message: boolean): void {
		console.log(message);
		if (message && this.winnerElement) {
			this.winnerElement.classList.add('won');
		}
	}
}

const player1DiceResult = document.getElementById('0');
const player2DiceResult = document.getElementById('1');
const player1TotalResult = document.getElementById('player1');
const player2TotalResult = document.getElementById('player2');
const player1WinerDisplayer = document.getElementById('score1');
const player2WinerDisplayer = document.getElementById('score2');

const turn = new TurnGenerator(2);
const diceGenerator = new DiceGenerator();
turn.subscribe(diceGenerator);
const player1 = new Player(0);
const player2 = new Player(1);
diceGenerator.subscribe(player1);
diceGenerator.subscribe(player2);
const displayer1 = new ResultDisplayer(player1DiceResult, player1TotalResult);
const displayer2 = new ResultDisplayer(player2DiceResult, player2TotalResult);
player1.results.subscribe(displayer1);
player2.results.subscribe(displayer2);
const winnerDisplayer1 = new WinnerDisplayer(player1WinerDisplayer);
const winnerDisplayer2 = new WinnerDisplayer(player2WinerDisplayer);
player1.winStatus.subscribe(winnerDisplayer1);
player2.winStatus.subscribe(winnerDisplayer2);

// const resultDisplayer2 = new ResultDisplayer(document.getElementById('2') as HTMLElement);
// diceGenerator.subscribe(resultDisplayer2);

const rollDice = document.getElementById?.('rollDice');
rollDice?.addEventListener('click', () => {
	turn.next();
});
