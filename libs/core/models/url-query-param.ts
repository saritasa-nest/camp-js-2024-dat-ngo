import { AnimeType } from './anime-type';

// TODO (Dat Ngo): We should add readonly.

/** Url Query Params. */
export type UrlQueryParams = {

	/** Search string. */
	search?: string;

	/** Page number. */
	pageNumber?: string;

	/** Page size. */
	pageSize?: string;

	/** Anime sort field. */
	sortField?: string | null;

	/** Anime type number. */
	type?: AnimeType | null;
};
