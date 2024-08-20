import { Injectable } from '@angular/core';

import { AnimeStatusDto } from '../dtos/anime-status.dto';
import { AnimeStatus } from '../models/anime-status';

/** Mapper for mapping Anime status. */
@Injectable({
	providedIn: 'root',
})
export class AnimeStatusMapper {
	/** Anime Status from DTO. */
	public readonly MAP_ANIME_STATUS_FROM_DTO: Record<AnimeStatusDto, AnimeStatus> = {
		[AnimeStatusDto.CurrentlyAiring]: AnimeStatus.CurrentlyAiring,
		[AnimeStatusDto.FinishedAiring]: AnimeStatus.FinishedAiring,
		[AnimeStatusDto.NotYetAired]: AnimeStatus.NotYetAired,
	};

	/** Anime Status to DTO. */
	public readonly MAP_ANIME_STATUS_TO_DTO: Record<AnimeStatus, AnimeStatusDto> = {
		[AnimeStatus.CurrentlyAiring]: AnimeStatusDto.CurrentlyAiring,
		[AnimeStatus.FinishedAiring]: AnimeStatusDto.FinishedAiring,
		[AnimeStatus.NotYetAired]: AnimeStatusDto.NotYetAired,
	};
}
