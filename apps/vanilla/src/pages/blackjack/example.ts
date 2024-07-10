// /* eslint-disable jsdoc/require-jsdoc */
// /* eslint-disable @typescript-eslint/explicit-function-return-type */
// /* eslint-disable no-console */
// type Subscriber<T> = {
// 	/** Update the message . */
// 	update(message: T): void;
// };

// /** Publisher class . */
// class Publisher<T> {
// 	/** Array of subscribers . */
// 	private subscribers: Subscriber<T>[] = [];

// 	/** Method to add subscriber . */
// 	public subscribe(subscriber: Subscriber<T>): void {
// 		this.subscribers.push(subscriber);
// 	}

// 	/** Method to remove subscriber . */
// 	public unsubscribe(subscriber: Subscriber<T>): void {
// 		this.subscribers = this.subscribers.filter((sub) => sub !== subscriber);
// 	}

// 	/** Method to notify . */
// 	public notify(message: T): void {
// 		this.subscribers.forEach((sub) => sub.update(message));
// 	}
// }

// /** This is foo comment . */
// class TurnGenerator extends Publisher<number> {
// 	public constructor(private playerCount: number, public currentPlayerIndex: number) {
// 		super();
// 		this.currentPlayerIndex = 0;
// 	}

// 	/** Next . */
// 	public next(): void {
// 		const playerIndex = this.currentPlayerIndex;
// 		this.currentPlayerIndex = (playerIndex + 1) % this.playerCount;
// 		this.notify(this.currentPlayerIndex);
// 	}
// }

// /** This is foo comment . */
// class DiceGenerator extends Publisher<PlayerTurnResult> implements Subscriber<number> {
// 	/** */
// 	public sideCount: number;

// 	public constructor(count: number) {
// 		super();
// 		this.sideCount = count;
// 	}

// 	public roll(): number {
// 		return Math.floor(Math.random() * this.sideCount) + 1;
// 	}

// 	update(playerIndex: number) {
// 		const roll = this.roll();
// 		const obj = new PlayerTurnResult(playerIndex, roll);
// 		this.notify(obj);
// 	}
// }

// /** This is foo comment . */
// class PlayerTurnResult {
// 	/** This is foo comment . */
// 	public constructor(public playerIndex: number, public diceResult: number) {}
// }

// /** This is foo comment . */
// class Player implements Subscriber<PlayerTurnResult> {
// 	private readonly diceResults: number[] = [];

// 	public results: Publisher<number[]>;

// 	public winStatus: Publisher<boolean>;

// 	public constructor(private playerIndex: number) {}

// 	private getTotalScore(): number {
// 		return this.diceResults.reduce((sum, result) => sum + result, 0);
// 	}

// 	/** This is foo comment . */
// 	public update(message: PlayerTurnResult): void {
// 		if (message.playerIndex === this.playerIndex) {
// 			this.diceResults.push(message.diceResult);
// 			this.results.notify(this.diceResults);
// 			if (this.getTotalScore() > 21) {
// 				this.winStatus.notify(true);
// 			}
// 		}
// 	}
// }

// /** This is foo comment . */
// class ResultDisplayer implements Subscriber<PlayerTurnResult> {
// 	/** This is foo comment . */
// 	private listElement: HTMLElement;

// 	public constructor(element: HTMLElement) {
// 		this.listElement = element;
// 	}

// 	/** This is foo comment . */
// 	public update(message: PlayerTurnResult): void {}
// }

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
