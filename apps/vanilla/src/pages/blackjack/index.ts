import { Debugger } from './Classes/Debugger';
import { DiceGenerator } from './Classes/DiceGenerator';
import { Player } from './Classes/Player';
import { ResultDisplayer, WinnerDisplayer } from './Classes/ResultDisplayer';
import { TurnGenerator } from './Classes/TurnGenerator';
class App {
	// Create number of Player
	private playerCount = 3;

	// Create a Turn Generator
	private turnGenerator: TurnGenerator;

	// Create a Dice Generator
	private diceGenerator = new DiceGenerator();

	//
	public constructor() {
		this.turnGenerator = new TurnGenerator(this.playerCount);
		this.turnGenerator.subscribe(this.diceGenerator);
		const debugger1 = document.getElementById('dice-cap');
		const debuggerTool = new Debugger(debugger1);
		this.diceGenerator.subscribe(debuggerTool);
		const players = this.createPlayers();
		players.forEach((player) => {
			this.diceGenerator.subscribe(player);
		});
	}

	private createPlayers(): Player[] {
		return Array(this.playerCount)
			.fill(null)
			.map((_, index) => {
				const player = new Player(index);
				const playerDisplayer = new ResultDisplayer(`player${index + 1}`);
				const playerWinStatusDisplayer = new WinnerDisplayer(`player${index + 1}`);

				player.results.subscribe(playerDisplayer);
				player.winStatus.subscribe(playerWinStatusDisplayer);

				return player;
			});
	}

	public roll(): void {
		this.turnGenerator.next();
	}
}

const app = new App();

window.onload = function() {
	const rollButton = document.getElementById('button-roll');
	if (rollButton) {
		rollButton.onclick = function() {
			app.roll();
		};
	}
};
