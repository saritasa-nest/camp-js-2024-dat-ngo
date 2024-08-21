import { Immerable, OmitImmerable } from './immerable';

/** User Secret. */
export class Registration extends Immerable {

	/** Email. */
	public readonly email: string;

	/** First name. */
	public readonly firstName: string;

	/** Last name. */
	public readonly lastName: string;

	/** Password. */
	public readonly password: string;

	public constructor(data: RegisterConstructorData) {
		super();
		this.email = data.email;
		this.firstName = data.firstName;
		this.lastName = data.lastName;
		this.password = data.password;
	}
}

type RegisterConstructorData = OmitImmerable<Registration>;
