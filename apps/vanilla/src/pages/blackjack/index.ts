interface Subscriber<T> {
	update(message: T): void;
};

class Publisher<T> {
	private subscribers: Subscriber<T>[] = [];
	public subscribe(s: Subscriber<T>): void{

	}
	public unsubscribe(s: Subscriber<T>): void{

	}
	public notify(message: T): void {

	}
}

class TurnGenerator<T> extends Publisher<T> {

}

class DiceGenerator<T> extends Publisher<T> implements Subscriber<T> {
	// private sidesCount :number
	public update(message: T) :void {

	}
}

class PlayerTurnResult {
	public playerIndex: number;
	public diceResult: number;
}

class Player<T> implements Subscriber<T> {
	public update(message: T) :void {

	}
}

class ResultDisplayer<HTMLElement> implements Subscriber<HTMLElement> {
	private listElement: HTMLElement;
	public update(message: HTMLElement) :void {

	}
}
