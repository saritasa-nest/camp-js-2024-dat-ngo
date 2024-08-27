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
	 * patch query params.
	 * @param params Anime filter params.
	 */
	public patch(params: Partial<AnimeFilterParams.Combined>, resetPageNumber = false): void {
		const queryParams = this.animeQueryParams.toDto(params);
		const pageNumber = resetPageNumber ? DEFAULT_PAGINATION.pageNumber : queryParams.pageNumber;
		this.queryParamsService.patch({
		  ...queryParams,
		  pageNumber,
		});
	}
}
