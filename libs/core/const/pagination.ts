type Pagination = {

	/** Page number. */
	pageNumber: number;

	/** Page size. */
	pageSize: number;
};

/** Default pagination params. */
export const DEFAULT_PAGINATION: Pagination = {
	pageNumber: 0,
	pageSize: 10,
};
