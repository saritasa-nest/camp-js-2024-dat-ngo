import { Immerable, OmitImmerable } from './immerable';

/** User Secret. */
export class UserSecret extends Immerable {
	/** Access Token. */
	public readonly accessToken: string;

	/** Refresh Token. */
	public readonly refreshToken: string;

	public constructor(data: TokenConstructorData) {
		super();
		this.accessToken = data.accessToken;
		this.refreshToken = data.refreshToken;
	}
}

type TokenConstructorData = OmitImmerable<UserSecret>;
