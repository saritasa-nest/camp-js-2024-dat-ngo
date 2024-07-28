import { AnimeType } from './anime-type';

export type UrlQueryParams = {
	search?: string;
	pageNumber?: string;
	pageSize?: string;
	sortFields?: string[];
	type?: AnimeType;
};
