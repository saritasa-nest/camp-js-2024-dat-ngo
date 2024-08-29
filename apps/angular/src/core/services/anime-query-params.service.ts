import { inject, Injectable } from '@angular/core';
import { AnimeQueryParamsMapper } from '@js-camp/core/mappers/anime-query-params.mapper';

import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';
import { DEFAULT_PAGINATION } from '@js-camp/core/const/pagination';

import { UrlParamsService } from './url-param.service';

/** Anime query params service. */
@Injectable({ providedIn: 'root' })
export class AnimeQueryParamsService {
	private animeQueryParams = inject(AnimeQueryParamsMapper);

	private queryParamsService = inject(UrlParamsService);

	/**
	 * Patch query params.
	 * @param params Anime filter params.
	 * @param resetPageNumber Whether to reset the page number to the default. Defaults to false.
	 */
	public patch(params: Partial<AnimeFilterParams.Combined>, resetPageNumber: boolean): void {
		const queryParams = this.animeQueryParams.toDto(params);
		const pageNumber = resetPageNumber ? DEFAULT_PAGINATION.pageNumber : queryParams.pageNumber;
		this.queryParamsService.patch({
			...queryParams,
			pageNumber,
		});
	}
}
