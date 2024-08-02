import { AnimeSortField } from './anime-sort-field';
import { AnimeType } from './anime-type';
import { SortsDirection } from './sort-direction';

/** Anime query params . */
export namespace AnimeFilterParams {

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

		// /** Order. */
		sortField: AnimeSortField | null;

		sortDirection: SortsDirection | null;
	};

	/** Anime Type. */
	export type Type = {

		/** Order. */
		type: AnimeType | null;
	};

	/** Anime query params. */
	export type Combined = Search & Pagination & Sort & Type;
}
