import { inject, Injectable } from '@angular/core';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { map, Observable } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '@js-camp/angular/environments/environment';

import { Anime } from '../models/anime.model';
import { AnimeDto } from '../dtos/anime.dto';
import { PaginationMapper } from '../mappers/pagination.mapper';

@Injectable({ providedIn: 'root' })
export class AnimeService {
	private readonly baseUrl = new URL('anime/', environment.apiURL);

	private httpClient = inject(HttpClient);

	private paginationMapper = inject(PaginationMapper);

	private readonly param = new HttpParams().set('offset', 25)
		.set('limit', 25);

	public getAllAnime(): Observable<PaginationDto<Anime>> {
		const url = new URL(`anime/`, this.baseUrl);
		return this.httpClient
			.get<PaginationDto<AnimeDto>>(url.toString(), { params: this.param })
			.pipe(map(value => this.paginationMapper.fromDto(value)));
	}

}
