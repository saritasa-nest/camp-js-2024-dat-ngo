import { WIN_SCORE } from '../constants';
import { Subscriber } from '../Types/subscriber';
import { Publisher } from '../Types/publisher';
import { PlayerTurnResult } from '../Types/player-turn-result';

import { Inspector } from './inspector';
import { ResultData } from './result-displayer';

/** Player . */
export class Player extends Inspector implements Subscriber<PlayerTurnResult> {
	/** Win status of each player .*/
	public readonly winStatus: Publisher<boolean> = new Publisher<boolean>();

	public constructor(private readonly playerIndex: number) {
		super();
	}

	/** @param turnResult The result of current dice turn which has result and index of player . */
	public update(turnResult: PlayerTurnResult): void {
		if (turnResult.playerIndex === this.playerIndex) {
			const diceResults = this.updateDiceList(turnResult);
			this.result.notify(new ResultData(diceResults, this.getTotalScore));
		}
		if (this.getTotalScore > WIN_SCORE) {
			this.winStatus.notify(true);
		}
	}
}
