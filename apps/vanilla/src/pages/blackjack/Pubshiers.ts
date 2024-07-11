import { Subscriber } from "./Subscriber";
/** Publisher class . */
export class Publisher<T> {
	/** Array of subscribers . */
	private subscribers: Subscriber<T>[] = [];

	/** Method to add subscriber . */
	public subscribe(subscriber: Subscriber<T>): void {
		this.subscribers.push(subscriber);
	}

	/** Method to remove subscriber . */
	public unsubscribe(subscriber: Subscriber<T>): void {
		this.subscribers = this.subscribers.filter((sub) => sub !== subscriber);
	}

	/** Method to notify . */
	public notify(message: T): void {
		this.subscribers.forEach((sub) => sub.update(message));
	}
}
