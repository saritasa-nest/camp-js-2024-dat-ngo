import { inject, Injectable } from '@angular/core';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Anime } from '@js-camp/core/models/anime.model';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { Pagination } from '@js-camp/core/models/pagination';
import { AppUrlsConfig } from '@js-camp/angular/shared/app-url';

/** Anime services. */
@Injectable({ providedIn: 'root' })
export class AnimeService {
	// Them readonly
	private readonly httpClient = inject(HttpClient);

	private paginationMapper = inject(PaginationMapper);

	private animeMapper = inject(AnimeMapper);

	private appApiConfig = inject(AppUrlsConfig);

	// TODO (Dat Ngo): Create filter params model and dto instead of using this while doing next task
	private readonly param = new HttpParams().set('offset', 25).set('limit', 25);

	/** Observable to get all anime and map from pagination dto to pagination.*/
	public getAllAnime(): Observable<Pagination<Anime>> {
		const url = new URL(this.appApiConfig.anime.list);
		return this.httpClient
			.get<PaginationDto<AnimeDto>>(url.toString(), { params: this.param })
			.pipe(map((value) => this.paginationMapper.fromDto(value, this.animeMapper.fromDto)));
	}
}
