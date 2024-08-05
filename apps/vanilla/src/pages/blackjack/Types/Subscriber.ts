/** Subscriber Interface. */
export type Subscriber<T> = {

	/** Update the message. */
	update(message: T): void;
};
