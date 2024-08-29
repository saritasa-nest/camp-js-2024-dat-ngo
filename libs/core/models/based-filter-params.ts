export namespace BasedFilterParams {

	/** Search. */
	export type Search = {

		/** Search filter. */
		readonly search: string | null;
	};

	/** Pagination. */
	export type Pagination = {

		/** Offset. */
		readonly pageNumber: number | null;

		/** Page size. */
		readonly pageSize: number | null;
	};

	/** Search and pagination filters. */
	export type Combined = Search & Pagination;
}
