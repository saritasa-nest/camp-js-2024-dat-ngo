import { Subscriber } from '../Types/Subscriber';

import { Inspector } from './inspector';

import { PlayerTurnResult } from './playerTurnResult';

import { Publisher } from './Publisher';

import { ResultData } from './resultDisplayer';

/** This is foo comment . */
export class Player extends Inspector implements Subscriber<PlayerTurnResult> {
	/** Win status of each player .*/
	public winStatus: Publisher<boolean> = new Publisher<boolean>();

	public constructor(private playerIndex: number) {
		super();
	}

	/** @param turnResult The result of current dice turn which has result and index of player . */
	public update(turnResult: PlayerTurnResult): void {
		if (turnResult.playerIndex === this.playerIndex) {
			this.updateDiceList(turnResult);
			this.result.notify(new ResultData(this.diceResults, this.getTotalScore()));
		}
		if (this.getTotalScore() > 21) {
			this.winStatus.notify(true);
		}
	}
}
