// TODO (Dat Ngo): We should add readonly for property or Readonly for type
export namespace BasedFilterParams {

	/** Search. */
	export type Search = {

		/** Search filter. */
		search: string | null;
	};

	/** Pagination. */
	export type Pagination = {

		/** Offset. */
		pageNumber: number | null;

		/** Page size. */
		pageSize: number | null;
	};

	/** Search and pagination filters. */
	export type Combined = Search & Pagination;
}
