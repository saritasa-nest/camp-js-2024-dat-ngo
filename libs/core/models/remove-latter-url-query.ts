import { AnimeType } from './anime-type';

/** Anime query params . */
export namespace AnimeQueryParamsdasd {
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

	/** Sort. */
	export type Sort = {
		/** Order. */
		sortField: string | null;
	};

	/** Anime Type. */
	export type Type = {
		/** Order. */
		type: AnimeType | null;
	};

	/** Anime query params. */
	export type Combined = Search & Pagination & Sort & Type;
}