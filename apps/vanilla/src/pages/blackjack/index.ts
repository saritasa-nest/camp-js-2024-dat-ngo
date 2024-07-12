import { Debugger } from './Classes/debugger';
import { DiceGenerator } from './Classes/diceGenerator';
import { Player } from './Classes/player';
import { ResultDisplayer, WinnerDisplayer } from './Classes/resultDisplayer';
import { TurnGenerator } from './Classes/turnGenerator';

/** Initialize Game . */
class App {
	// Create number of Player
	private playerCount = 10;

	// Create a Turn Generator
	private turnGenerator: TurnGenerator;

	// Create a Dice Generator
	private diceGenerator = new DiceGenerator();

	//
	public constructor() {
		this.turnGenerator = new TurnGenerator(this.playerCount);
		this.turnGenerator.subscribe(this.diceGenerator);
		const debbugerTool = new Debugger();
		const debuggerDisplayer = new ResultDisplayer('debugger');
		debbugerTool.result.subscribe(debuggerDisplayer);
		this.diceGenerator.subscribe(debbugerTool);

		const players = this.createPlayers();
		players.forEach(player => {
			this.diceGenerator.subscribe(player);
		});
	}

	private createPlayers(): Player[] {
		return Array(this.playerCount)
			.fill(null)
			.map((_, index) => {
				const player = new Player(index);
				const playerDisplayer = new ResultDisplayer(`player ${index + 1}`);
				const playerWinStatusDisplayer = new WinnerDisplayer(`player ${index + 1}`);

				player.result.subscribe(playerDisplayer);
				player.winStatus.subscribe(playerWinStatusDisplayer);

				return player;
			});
	}

	/** Function to generate next turn . */
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
