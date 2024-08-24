import { Immerable, OmitImmerable } from './immerable';

/** Date range time for anime broadcasted. */
export class DateRange extends Immerable {
	/**
	 *An anime can have a started date of date or null if it's not decide yet.
	 * @example Fri Jul 07 2023 07:00:00 GMT+0700 (Indochina Time).
	 */
	public readonly startDate: Date | null;

	/**
	 * An anime can have a end date if it ends already or null if it not end yet.
	 * @example Fri Jul 07 2023 07:00:00 GMT+0700 (Indochina Time)
	 * */
	public readonly endDate: Date | null;

	public constructor(data: DateRangeConstructorData) {
		super();
		this.startDate = data.startDate;
		this.endDate = data.endDate;
	}
}

type DateRangeConstructorData = OmitImmerable<DateRange>;
