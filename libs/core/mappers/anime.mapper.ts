import { Injectable } from '@angular/core';

import { Anime } from '../models/anime.model';
import { AnimeDto } from '../dtos/anime.dto';
import { AnimeTypeDto } from '../dtos/amime-type.dto';
import { AnimeType } from '../models/amime-type';
import { AnimeStatusDto } from '../dtos/anime-status.dto';
import { AnimeStatus } from '../models/anime-status';

const MAP_ANIME_STATUS_FROM_DTO: Record<AnimeStatusDto, AnimeStatus> = {
	[AnimeStatusDto.CurrentlyAiring]: AnimeStatus.CurrentlyAiring,
	[AnimeStatusDto.FinishedAiring]: AnimeStatus.FinishedAiring,
	[AnimeStatusDto.NotYetAired]: AnimeStatus.NotYetAired,
};
const MAP_ANIME_STATUS_TO_DTO: Record<AnimeStatus, AnimeStatusDto> = {
	[AnimeStatus.CurrentlyAiring]: AnimeStatusDto.CurrentlyAiring,
	[AnimeStatus.FinishedAiring]: AnimeStatusDto.FinishedAiring,
	[AnimeStatus.NotYetAired]: AnimeStatusDto.NotYetAired,
};
const MAP_ANIME_TYPE_FROM_DTO: Record<AnimeTypeDto, AnimeType> = {
	[AnimeTypeDto.Movie]: AnimeType.Movie,
	[AnimeTypeDto.Music]: AnimeType.Music,
	[AnimeTypeDto.ONA]: AnimeType.ONA,
	[AnimeTypeDto.OVA]: AnimeType.OVA,
	[AnimeTypeDto.PromotionalVideos]: AnimeType.PromotionalVideos,
	[AnimeTypeDto.Special]: AnimeType.Special,
	[AnimeTypeDto.TV]: AnimeType.TV,
	[AnimeTypeDto.Unknown]: AnimeType.Unknown,
};
const MAP_ANIME_TYPE_TO_DTO: Record<AnimeType, AnimeTypeDto> = {
	[AnimeType.Movie]: AnimeTypeDto.Movie,
	[AnimeType.Music]: AnimeTypeDto.Music,
	[AnimeType.ONA]: AnimeTypeDto.ONA,
	[AnimeType.OVA]: AnimeTypeDto.OVA,
	[AnimeType.PromotionalVideos]: AnimeTypeDto.PromotionalVideos,
	[AnimeType.Special]: AnimeTypeDto.Special,
	[AnimeType.TV]: AnimeTypeDto.TV,
	[AnimeType.Unknown]: AnimeTypeDto.Unknown,
};

/** Mapper for mapping AnimeDto and Anime. */
@Injectable({
	providedIn: 'root',
})
export class AnimeMapper {
	/**
	 * Mapper for dto to model.
	 * @param dto AnimeDto .
	 */
	public fromDto(dto: AnimeDto): Anime {
		return new Anime({
			id: dto.id,
			createdDate: new Date(dto.created),
			modifiedDate: new Date(dto.modified),
			englishTitle: dto.title_eng,
			japaneseTitle: dto.title_jpn,
			coverImageUrl: dto.image,
			broadcasted: {
				startDate: dto.aired.start ? new Date(dto.aired.start) : null,
				endDate: dto.aired.end ? new Date(dto.aired.end) : null,
			},
			animeType: MAP_ANIME_TYPE_FROM_DTO[dto.type],
			animeStatus: MAP_ANIME_STATUS_FROM_DTO[dto.status],
			score: dto.score,
			userScore: dto.user_score,
			studios: dto.studios,
			genres: dto.genres,
		});
	}

	/**
	 *  Mapper for model to dto.
	 * @param anime Anime model .
	 */
	public toDto(anime: Anime): AnimeDto {
		return {
			id: anime.id,
			created: anime.createdDate.toISOString(),
			modified: anime.modifiedDate.toISOString(),
			title_eng: anime.englishTitle,
			title_jpn: anime.japaneseTitle,
			image: anime.coverImageUrl,
			aired: {
				start: anime.broadcasted.startDate ? anime.broadcasted.startDate.toISOString() : null,
				end: anime.broadcasted.endDate ? anime.broadcasted.endDate.toISOString() : null,
			},
			type: MAP_ANIME_TYPE_TO_DTO[anime.animeType],
			status: MAP_ANIME_STATUS_TO_DTO[anime.animeStatus],
			score: anime.score,
			user_score: anime.userScore,
			studios: anime.studios,
			genres: anime.genres,
		};
	}
}
