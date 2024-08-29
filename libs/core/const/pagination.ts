type Pagination = {

	/** Page number. */
	readonly pageNumber: number;

	/** Page size. */
	readonly pageSize: number;
};

/** Default pagination params. */
export const DEFAULT_PAGINATION: Pagination = {
	pageNumber: 0,
	pageSize: 10,
};
