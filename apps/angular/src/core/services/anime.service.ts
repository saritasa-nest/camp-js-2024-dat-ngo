import { inject, Injectable } from '@angular/core';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { Pagination } from '@js-camp/core/models/pagination';
import { AppUrlsConfig } from '@js-camp/angular/shared/app-url';
import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';

import { AnimeFiltersParamsMapper } from '@js-camp/core/mappers/anime-filter-params.mapper';

import { map, Observable } from 'rxjs';

import { HttpParamsService } from './http-param.service';

/** Anime services. */
@Injectable({ providedIn: 'root' })
export class AnimeService {
	private readonly httpClient = inject(HttpClient);

	private readonly httpParamsService = inject(HttpParamsService);

	private readonly appUrlsConfig = inject(AppUrlsConfig);

	private readonly animeQueryMapper = inject(AnimeFiltersParamsMapper);

	/**
	 * Build HttpParams from URL query params.
	 * @param params URL query params.
	 * @returns Http params.
	 */
	private getHttpParams(params: AnimeFilterParams.Combined): HttpParams {
		const dtoQueryParams = this.animeQueryMapper.mapCombinedOptionsToDto(params);
		return this.httpParamsService.buildHttpParamsFromDto(dtoQueryParams);
	}

	/** Get Anime.
	 * @param queryParams URL filter query params.
	 * @returns An Observable of anime Pagination.
	 */
	public getAnime(queryParams: AnimeFilterParams.Combined): Observable<Pagination<Anime>> {
		/** Set isLoading to true at the start of the fetch. */
		const params = this.getHttpParams(queryParams);
		return this.httpClient
			.get<PaginationDto<AnimeDto>>(this.appUrlsConfig.anime.list, { params })
			.pipe(map(responseDto => PaginationMapper.fromDto(responseDto, AnimeMapper.fromDto)));
	}
}
