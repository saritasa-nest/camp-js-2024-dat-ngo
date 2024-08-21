import { Immerable, OmitImmerable } from './immerable';

/** User Secret. */
export class Registration extends Immerable {
	// TODO (Dat Ngo): We should add readonly.
	public readonly email: string;
	// TODO (Dat Ngo): We should add readonly.
	public readonly firstName: string;
	// TODO (Dat Ngo): We should add readonly.
	public readonly lastName: string;
	// TODO (Dat Ngo): We should add readonly.
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
