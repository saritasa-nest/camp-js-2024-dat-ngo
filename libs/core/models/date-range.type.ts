/** BroadCasted time frames of an anime. */
export type DateRange = {

	/** An anime can have a started date of date or null if it's not decide yet. */
	readonly startDate: Date | null;

	/** An anime can have a end date if it ends already or null if it not end yet. */
	readonly endDate: Date | null;
};
