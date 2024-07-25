import { Game } from './game';

/** Initialize Game.*/
window.onload = function() {
	const game = new Game();
	const rollButton = document.getElementById('button-roll');
	if (rollButton) {
		rollButton.onclick = function() {
			game.roll();
		};
	}
};
