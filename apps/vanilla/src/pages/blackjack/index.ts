/* eslint-disable jsdoc/require-param */
/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-console */
import { DiceGenerator } from './DiceGenerator';
import { Player } from './Player';
import { ResultDisplayer } from './ResultDisplayer';
import { TurnGenerator } from './TurnGenerator';
import { WinnerDisplayer } from './WinnerDisplayer';

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
