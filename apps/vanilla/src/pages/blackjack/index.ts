/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-console */
type Subscriber<T> = {
	/** Update the message . */
	update(message: T): void;
};

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

	public constructor(private playerCount: number) {
		super();
		this.playerCount = playerCount;
	}

	/** Next . */
	public next(): void {
		const playerIndex = this.currentPlayerIndex;
		this.currentPlayerIndex = (playerIndex + 1) % this.playerCount;
	}

	public override notify(): void {
		super.notify(this.currentPlayerIndex);
		this.next();
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

	public results: Publisher<number[]> = [];

	public winStatus: Publisher<boolean> = false;

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

	private totalScores: number = 0;

	public constructor(private resultElement: HTMLElement|null, private totalScoreElement: HTMLElement|null){}

}

class WinnerDisplayer implements Subscriber<boolean>{
	public constructor(private winnerElement: HTMLElement|null ){}
}

// const turn = new TurnGenerator(2, 0);
// const diceGenerator = new DiceGenerator(6);
// turn.subscribe(diceGenerator);
// const player1 = new Player(0);
// const player2 = new Player(1);

// const resultDisplayer1 = new ResultDisplayer(document.getElementById('1') as HTMLElement);
// diceGenerator.subscribe(resultDisplayer1);
// const resultDisplayer2 = new ResultDisplayer(document.getElementById('2') as HTMLElement);
// diceGenerator.subscribe(resultDisplayer2);

// const roll = document.getElementById('rollDice')?.addEventListener('click', () => {
// 	turn.next();
// });
