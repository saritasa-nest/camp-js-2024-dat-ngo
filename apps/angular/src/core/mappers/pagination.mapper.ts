import { inject, Injectable } from '@angular/core';

import { Anime } from '../models/anime.model';
import { AnimeDto } from '../dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from './anime.mapper';

/** Auth mapper. */
@Injectable({
	providedIn: 'root',
})
export class PaginationMapper {
	private readonly animeMapper = inject(AnimeMapper);
	/** @inheritdoc */
	public fromDto(data: PaginationDto<AnimeDto>): PaginationDto<Anime> {
		return {
			count: data.count,
			next: data.next,
			previous: data.previous,
			results: this.animeMapper.fromDtoArray(data.results),
		};
	}
}
