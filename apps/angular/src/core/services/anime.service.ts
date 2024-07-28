import { inject, Injectable } from '@angular/core';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { map, Observable, switchMap } from 'rxjs';
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

	private appApiConfig = inject(AppUrlsConfig);

	private httpParamsService = inject(HttpParamsService);

	private appUrlsConfig = inject(AppUrlsConfig);

	private urlParamsService = inject(UrlParamsService);

	// TODO (Dat Ngo): Create filter params model and dto instead of using this while doing next task
	private readonly param = new HttpParams().set('offset', 25).set('limit', 25);

	private fetchAnimeWithParams(queryParams: AnimeQueryParams.Combined): Observable<Pagination<Anime>> {
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
	// /** Observable to get all anime and map from pagination dto to pagination.*/
	// public getAllAnime(): Observable<Pagination<Anime>> {
	// 	const url = new URL(this.appApiConfig.anime.list);
	// 	return this.httpClient
	// 		.get<PaginationDto<AnimeDto>>(url.toString(), { params: this.param })
	// 		.pipe(map((value) => this.paginationMapper.fromDto(value, this.animeMapper.fromDto)));
	// }
}
