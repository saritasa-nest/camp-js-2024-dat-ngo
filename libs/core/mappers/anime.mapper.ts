import { Anime } from '../models/anime.model';
import { AnimeDto } from '../dtos/anime.dto';

import { AnimeStatusMapper } from './anime-status.mapper';
import { AnimeTypeMapper } from './anime-type.mapper';
import { broadCastedTimeMapper } from './broadcasted-time.mapper';

/** Mapper for mapping AnimeDto and Anime. */
export namespace AnimeMapper {
	const animeStatusMapper = new AnimeStatusMapper();

	const animeTypeMapper = new AnimeTypeMapper();

	/**
	 * Mapper for dto to model.
	 * @param dto AnimeDto .
	 */
	export function fromDto(dto: AnimeDto): Anime {
		return new Anime({
			id: dto.id,
			createdDate: new Date(dto.created),
			modifiedDate: new Date(dto.modified),
			englishTitle: dto.title_eng,
			japaneseTitle: dto.title_jpn,
			coverImageUrl: dto.image,
			broadcasted: broadCastedTimeMapper.fromDto(dto.aired),
			animeType: animeTypeMapper.MAP_ANIME_TYPE_FROM_DTO[dto.type],
			animeStatus: animeStatusMapper.MAP_ANIME_STATUS_FROM_DTO[dto.status],
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
	export function toDto(anime: Anime): AnimeDto {
		return {
			id: anime.id,
			created: anime.createdDate.toISOString(),
			modified: anime.modifiedDate.toISOString(),
			title_eng: anime.englishTitle,
			title_jpn: anime.japaneseTitle,
			image: anime.coverImageUrl,
			aired: broadCastedTimeMapper.toDto(anime.broadcasted),
			type: animeTypeMapper.MAP_ANIME_TYPE_TO_DTO[anime.animeType],
			status: animeStatusMapper.MAP_ANIME_STATUS_TO_DTO[anime.animeStatus],
			score: anime.score,
			user_score: anime.userScore,
			studios: anime.studios,
			genres: anime.genres,
		};
	}
}
