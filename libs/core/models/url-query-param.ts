import { AnimeType } from './anime-type';

export type UrlQueryParams = {
	search?: string;
	pageNumber?: string;
	pageSize?: string;
	sortFields?: string | null;
	type?: AnimeType | null;
};
