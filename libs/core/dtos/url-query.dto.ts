/** Anime query params dto. */
export namespace AnimeQueryParamsDto {
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

	/** Sort. */
	export type Sort = {
		/** Order. */
		readonly ordering?: string;
	};

	/** Anime Type. */
	export type Type = {
		/** Order. */
		readonly type?: string;
	};

	/** Anime query params dto. */
	export type Combined = Search & Pagination & Sort & Type;
}
