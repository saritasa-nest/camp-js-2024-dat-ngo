import { ResultHistory } from './Classes/Debugger';
import { DiceGenerator } from './Classes/dice-generator';
import { Player } from './Classes/Player';
import { ResultDisplayer } from './Classes/result-displayer';
import { WinnerDisplayer } from './Classes/winner-displayer';
import { TurnGenerator } from './Classes/turn-generator';
import { NUMBER_OF_PLAYER } from './constants';

/** Initialize Game.*/
export class Game {
	/** Create number of Player.*/
	private readonly playerCount = NUMBER_OF_PLAYER;

	/** Turn generator.*/
	private readonly turnGenerator: TurnGenerator;

	/** Create a Dice Generator.*/
	private readonly diceGenerator: DiceGenerator;

	private readonly gameResults: ResultHistory;

	private historyDisplayer: ResultDisplayer;

	private players: Player[];

	public constructor() {
		this.diceGenerator = new DiceGenerator();

		this.turnGenerator = new TurnGenerator(this.playerCount);
		this.turnGenerator.subscribe(this.diceGenerator);

		this.gameResults = new ResultHistory();
		this.historyDisplayer = new ResultDisplayer('ResultHistory');
		this.gameResults.result.subscribe(this.historyDisplayer);
		this.diceGenerator.subscribe(this.gameResults);

		this.players = this.createPlayers();
		this.players.forEach(player => {
			this.diceGenerator.subscribe(player);
		});
	}

	/** Create players and subscribes the displayer and winner status wrapper .*/
	public createPlayers(): Player[] {
		return Array(this.playerCount)
			.fill(null)
			.map((_, index) => {
				const player = new Player(index);
				const playerDisplayer = new ResultDisplayer(`Player-${index + 1}`);
				const playerWinStatusDisplayer = new WinnerDisplayer(`Player-${index + 1}`);
				player.result.subscribe(playerDisplayer);
				this.gameResults.winnerIndex.subscribe(playerWinStatusDisplayer);
				return player;
			});
	}

	/** Generate next turn.*/
	public roll(): void {
		this.turnGenerator.next();
	}
}
