/** Anime query params dto. */
export namespace BasedQueryParamsDto {
	/** Search. */
	export type Search = {
		/** Search filter. */
		readonly search?: string;
	};

	/** Pagination. */
	export type Pagination = {
		/** Offset. */
		readonly offset?: number;

		/** Page size. */
		readonly limit?: number;
	};

	/** Anime query params dto. */
	export type Combined = Search & Pagination;
}
