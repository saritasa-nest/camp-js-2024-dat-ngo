import { inject, Injectable } from '@angular/core';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@js-camp/angular/environments/environment';
import { Anime } from '@js-camp/core/models/anime.model';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { Pagination } from '@js-camp/core/models/pagination';

type AnimeResponseDto = PaginationDto<AnimeDto>;

export type AnimeResponse = Pagination<Anime>;

@Injectable({ providedIn: 'root' })
export class AnimeService {
	private readonly baseUrl = new URL('anime/', environment.apiURL);

	private httpClient = inject(HttpClient);

	private paginationMapper = inject(PaginationMapper);

	private animeMapper = inject(AnimeMapper);

	private readonly param = new HttpParams().set('offset', 25)
		.set('limit', 25);

	public getAllAnime(): Observable<AnimeResponse> {
		const url = new URL(`anime/`, this.baseUrl);
		return this.httpClient
			.get<AnimeResponseDto>(url.toString(), { params: this.param })
			.pipe(map(value => this.paginationMapper.fromDto(value, this.animeMapper.fromDto)));
	}
}
