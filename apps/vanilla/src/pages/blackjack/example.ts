// // Subscriber interface
// interface Subscriber<T> {
// 	update(message: T): void;
// }

// // Publisher class
// class Publisher<T> {
// 	private subscribers: Subscriber<T>[] = [];

// 	subscribe(subscriber: Subscriber<T>): void {
// 		this.subscribers.push(subscriber);
// 	}

// 	unsubscribe(subscriber: Subscriber<T>): void {
// 		this.subscribers = this.subscribers.filter((sub) => sub !== subscriber);
// 	}

// 	notify(message: T): void {
// 		this.subscribers.forEach((subscriber) => subscriber.update(message));
// 	}
// }

// // PlayerTurnResult class
// class PlayerTurnResult {
// 	constructor(public playerIndex: number, public diceResult: number) {}
// }

// // TurnGenerator class
// class TurnGenerator {
// 	private currentPlayerIndex: number = 0;

// 	constructor(public playersCount: number) {}

// 	next(): number {
// 		const playerIndex = this.currentPlayerIndex;
// 		this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.playersCount;
// 		return playerIndex;
// 	}
// }

// // DiceGenerator class
// class DiceGenerator {
// 	constructor(public sidesCount: number) {}

// 	roll(): number {
// 		return Math.floor(Math.random() * this.sidesCount) + 1;
// 	}
// }

// // Player class
// class Player {
// 	private diceResults: number[] = [];
// 	results: Publisher<number[]> = new Publisher<number[]>();
// 	winStatus: Publisher<boolean> = new Publisher<boolean>();

// 	addResult(result: number): void {
// 		this.diceResults.push(result);
// 		this.results.notify(this.diceResults);
// 		if (this.getTotalScore() >= 21) {
// 			this.winStatus.notify(true);
// 		}
// 	}

// 	getTotalScore(): number {
// 		return this.diceResults.reduce((sum, result) => sum + result, 0);
// 	}
// }

// // ResultDisplayer class
// class ResultDisplayer implements Subscriber<number[]> {
// 	constructor(private listElement: HTMLElement) {}

// 	update(results: number[]): void {
// 		this.listElement.innerHTML = results.join(', ');
// 	}
// }

// // Main game logic
// class Game {
// 	private players: Player[];
// 	private turnGenerator: TurnGenerator;
// 	private diceGenerator: DiceGenerator;

// 	constructor(playersCount: number, sidesCount: number, playerElements: HTMLElement[]) {
// 		this.players = Array.from({ length: playersCount }, () => new Player());
// 		this.turnGenerator = new TurnGenerator(playersCount);
// 		this.diceGenerator = new DiceGenerator(sidesCount);

// 		this.players.forEach((player, index) => {
// 			const displayer = new ResultDisplayer(playerElements[index]);
// 			player.results.subscribe(displayer);
// 			player.winStatus.subscribe({
// 				update: (win) => {
// 					if (win) {
// 						playerElements[index].style.backgroundColor = 'red';
// 					}
// 				},
// 			});
// 		});
// 	}

// 	makeMove(): void {
// 		const playerIndex = this.turnGenerator.next();
// 		const diceResult = this.diceGenerator.roll();
// 		this.players[playerIndex].addResult(diceResult);
// 	}
// }

// // Setting up the game
// document.addEventListener('DOMContentLoaded', () => {
// 	const player1Element = document.getElementById('player1')!;
// 	const player2Element = document.getElementById('player2')!;
// 	const rollButton = document.getElementById('rollButton')!;

// 	const game = new Game(2, 6, [player1Element, player2Element]);

// 	rollButton.addEventListener('click', () => {
// 		game.makeMove();
// 	});
// });
