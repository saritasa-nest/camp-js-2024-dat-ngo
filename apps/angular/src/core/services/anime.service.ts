import { inject, Injectable } from '@angular/core';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Anime } from '@js-camp/core/models/anime.model';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { Pagination } from '@js-camp/core/models/pagination';
import { AppUrlsConfig } from '@js-camp/angular/shared/app-url';
import { AnimeQueryParams } from '@js-camp/core/models/url-query';
import { HttpParamsService } from './http-param.service';
import { UrlParamsService } from './url-param.service';

/** Anime services. */
@Injectable({ providedIn: 'root' })
export class AnimeService {
	// Them readonly
	private readonly httpClient = inject(HttpClient);

	private paginationMapper = inject(PaginationMapper);

	private animeMapper = inject(AnimeMapper);

	private httpParamsService = inject(HttpParamsService);

	private appUrlsConfig = inject(AppUrlsConfig);

	private urlParamsService = inject(UrlParamsService);

	public readonly pageNumberSubject$ = new BehaviorSubject<number | null>(1);

	public readonly pageSizeSubject$ = new BehaviorSubject<number | null>(10);

	private fetchAnimeWithParams(queryParams: AnimeQueryParams.Combined): Observable<Pagination<Anime>> {
		this.pageNumberSubject$.next(queryParams.pageNumber);
		this.pageSizeSubject$.next(queryParams.pageSize);
		const params = this.httpParamsService.getHttpParams(queryParams);
		return this.httpClient
			.get<PaginationDto<AnimeDto>>(this.appUrlsConfig.anime.list, { params })
			.pipe(map((responseDto) => this.paginationMapper.fromDto(responseDto, this.animeMapper)));
	}

	/**
	 * Get the anime page.
	 * @returns The anime page.
	 */
	public getAllAnime(): Observable<Pagination<Anime>> {
		return this.urlParamsService
			.getCombinedQueryParams()
			.pipe(switchMap((queryParams) => this.fetchAnimeWithParams(queryParams)));
	}

	/** Update new params for types. */
	public updateTypesParams(param: AnimeQueryParams.Type): void {
		const newParams: AnimeQueryParams.Combined = {
			...this.urlParamsService.getCurrentParams(),
			pageNumber: 0,
			...param,
		};
		this.urlParamsService.setCombinedQueryParams(newParams);
	}

	/** Update new params for types. */
	public updateSearchParams(param: AnimeQueryParams.Search): void {
		const newParams: AnimeQueryParams.Combined = {
			...this.urlParamsService.getCurrentParams(),
			pageNumber: 0,
			...param,
		};
		this.urlParamsService.setCombinedQueryParams(newParams);
	}
}
