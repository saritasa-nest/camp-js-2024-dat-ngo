import { Immerable, OmitImmerable } from './immerable';

/** User Secret. */
export class Registration extends Immerable {
	public readonly email: string;
	public readonly firstName: string;
	public readonly lastName: string;
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
