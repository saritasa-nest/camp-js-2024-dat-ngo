import { Subscriber } from './subscriber';

/** Publisher class. */
export class Publisher<T> {
	/** Array of subscribers. */
	private subscribers: Subscriber<T>[] = [];

	/**
	 * Method to add subscriber.
	 * @param subscriber A subscriber to add to the subscribers array.
	 */
	public subscribe(subscriber: Subscriber<T>): void {
		this.subscribers.push(subscriber);
	}

	/**
	 * Method to remove subscriber.
	 * @param subscriber A subscriber to remove from the subscribers array.
	 */
	public unsubscribe(subscriber: Subscriber<T>): void {
		this.subscribers = this.subscribers.filter(sub => sub !== subscriber);
	}

	/**
	 * Method to notify.
	 * @param message Data for notification to subscriber.
	 */
	public notify(message: T): void {
		this.subscribers.forEach(sub => sub.update(message));
	}
}
