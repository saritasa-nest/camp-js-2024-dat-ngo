import { inject, Injectable } from '@angular/core';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { map, Observable } from 'rxjs';
import { Anime } from '../models/anime.model';
import { AnimeDto } from '../dtos/anime.dto';
import { HttpClient } from '@angular/common/http';
import { PaginationMapper } from '../mappers/pagination.mapper';

@Injectable({ providedIn: 'root' })
export class AnimeService {
	// }
	private httpClient = inject(HttpClient);
	private paginationMapper = inject(PaginationMapper);
	public getAllAnime(): Observable<PaginationDto<Anime>> {
		return this.httpClient
			.get<PaginationDto<AnimeDto>>(`https://api.camp-js.saritasa.rocks/api/v1/anime/anime/`)
			.pipe(map((value) => this.paginationMapper.fromDto(value)));
	}
}
