import { Debugger } from './Classes/debugger';
import { DiceGenerator } from './Classes/dice-generator';
import { Player } from './Classes/player';
import { ResultDisplayer, WinnerDisplayer } from './Classes/result-displayer';
import { TurnGenerator } from './Classes/turn-generator';
import { NUMBER_OF_PLAYER } from './constants';

/** Initialize Game . */
class App {
	/** Create number of Player. */
	private readonly playerCount = NUMBER_OF_PLAYER;

	/** Turn generator. */
	private readonly turnGenerator: TurnGenerator;

	/** Create a Dice Generator. */
	private readonly diceGenerator: DiceGenerator;

	//
	public constructor() {
		this.diceGenerator = new DiceGenerator();

		this.turnGenerator = new TurnGenerator(this.playerCount);
		this.turnGenerator.subscribe(this.diceGenerator);

		const debbugerTool = new Debugger();
		const debuggerDisplayer = new ResultDisplayer('Debugger');
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
				const playerDisplayer = new ResultDisplayer(`Player ${index + 1}`);
				const playerWinStatusDisplayer = new WinnerDisplayer(`Player ${index + 1}`);

				player.result.subscribe(playerDisplayer);
				player.winStatus.subscribe(playerWinStatusDisplayer);

				return player;
			});
	}

	/** Generate next turn . */
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
