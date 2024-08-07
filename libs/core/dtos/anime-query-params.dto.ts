import { BasedQueryParamsDto } from './based-filter-params.dto';

/** Anime query params dto. */
export namespace AnimeQueryParamsDto {

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
	export type Combined = BasedQueryParamsDto.Combined & Sort & Type;
}
