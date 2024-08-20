import { Immerable, OmitImmerable } from './immerable';

/** Genre. */
export class BroadCastedTime extends Immerable {

	/** An anime can have a started date of date or null if it's not decide yet. */
	public startDate: Date | null;

	/** An anime can have a end date if it ends already or null if it not end yet. */
	public endDate: Date | null;

	public constructor(data: GenreConstructorData) {
		super();
		this.startDate = data.startDate;
		this.endDate = data.endDate;
	}
}

type GenreConstructorData = OmitImmerable<BroadCastedTime>;
