import { AnimeSortField } from './anime-sort-field';
import { AnimeType } from './anime-type';
import { BasedFilterParams } from './based-filter-params';
import { SortsDirection } from './sort-direction';

/** Anime query params . */
export namespace AnimeFilterParams {

	/** Sort. */
	export type Sort = {

		/** Order. */
		readonly sortField: AnimeSortField | null;

		/** Sort Direction. */
		readonly sortDirection: SortsDirection | null;
	};

	/** Anime Type. */
	export type Type = {

		/** Order. */
		readonly type: AnimeType | null;
	};

	/** Anime query params. */
	export type Combined = Sort & Type & BasedFilterParams.Combined;
}