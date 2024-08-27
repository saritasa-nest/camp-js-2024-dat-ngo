import { inject, Injectable } from '@angular/core';

import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';
import { DEFAULT_PAGINATION } from '@js-camp/core/const/pagination';

import { AnimeQueryParamsMapper } from '../mappers/anime-query-params.mapper';

import { UrlParamsService } from './url-param.service';

/** Anime query params service. */
@Injectable({ providedIn: 'root' })
export class AnimeQueryParamsService {
	private animeQueryParams = inject(AnimeQueryParamsMapper);

	private queryParamsService = inject(UrlParamsService);

	/**
	 * Append query params.
	 * @param params Anime filter params.
	 */
	public patch(params: Partial<AnimeFilterParams.Combined>): void {
		const queryParams = this.animeQueryParams.toDto(params);
		this.queryParamsService.patch(queryParams);
	}

	/**
	 * Append provide query params and reset page number params to the URL.
	 * @param params Anime filter params to append.
	 */
	public patchParamsAndResetPageNumber(params: Partial<AnimeFilterParams.Combined>): void {
		const queryParams = this.animeQueryParams.toDto(params);
		return this.queryParamsService.patchAndResetPageNumber(queryParams, DEFAULT_PAGINATION.pageNumber);
	}
}
