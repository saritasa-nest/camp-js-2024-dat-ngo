import { Immerable, OmitImmerable } from './immerable';

/** User. */
export class User extends Immerable {
	/** User email. */
	public readonly email: string;

	/** User first name. */
	public readonly firstName: string;

	/** User last name. */
	public readonly lastName: string;

	/** User avatar. */
	public readonly avatar: string | null;

	public constructor(data: UserConstructorData) {
		super();
		this.email = data.email;
		this.avatar = data.avatar;
		this.firstName = data.firstName;
		this.lastName = data.lastName;
	}
}

type UserConstructorData = OmitImmerable<User>;
