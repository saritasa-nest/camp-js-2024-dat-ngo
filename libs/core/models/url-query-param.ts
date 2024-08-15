import { AnimeType } from './anime-type';

/** Url Query Params. */
export type UrlQueryParams = {

	/** Search string. */
	readonly search?: string;

	/** Page number. */
	readonly pageNumber?: string;

	/** Page size. */
	readonly pageSize?: string;

	/** Anime sort field. */
	readonly sortField?: string | null;

	/** Anime type number. */
	readonly type?: AnimeType | null;
};
