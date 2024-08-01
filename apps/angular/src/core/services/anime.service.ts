import { inject, Injectable } from '@angular/core';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { map, Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Anime } from '@js-camp/core/models/anime.model';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { Pagination } from '@js-camp/core/models/pagination';
import { AppUrlsConfig } from '@js-camp/angular/shared/app-url';
import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';
import { HttpParamsService } from './http-param.service';

/** Anime services. */
@Injectable({ providedIn: 'root' })
export class AnimeService {
	// Them readonly
	private readonly httpClient = inject(HttpClient);

	private paginationMapper = inject(PaginationMapper);

	private animeMapper = inject(AnimeMapper);

	private httpParamsService = inject(HttpParamsService);

	private appUrlsConfig = inject(AppUrlsConfig);

	private fetchAnimeWithParams(queryParams: AnimeFilterParams.Combined): Observable<Pagination<Anime>> {
		const params = this.httpParamsService.getHttpParams(queryParams);
		return this.httpClient
			.get<PaginationDto<AnimeDto>>(this.appUrlsConfig.anime.list, { params })
			.pipe(map((responseDto) => this.paginationMapper.fromDto(responseDto, this.animeMapper)));
	}

	/**
	 * Get the anime page.
	 * @returns The anime page.
	 */
	public getAllAnime(filters$: Observable<AnimeFilterParams.Combined>): Observable<Pagination<Anime>> {
		return filters$.pipe(switchMap((queryParams) => this.fetchAnimeWithParams(queryParams)));
	}
}
