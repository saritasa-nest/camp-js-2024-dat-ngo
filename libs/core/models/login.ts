import { Immerable, OmitImmerable } from './immerable';

/** Login. */
export class Login extends Immerable {
	/** Email. */
	public readonly email: string;

	/** Password. */
	public readonly password: string;

	public constructor(data: LoginConstructorData) {
		super();
		this.email = data.email;
		this.password = data.password;
	}
}

type LoginConstructorData = OmitImmerable<Login>;
