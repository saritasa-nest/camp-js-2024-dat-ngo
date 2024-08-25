import { Anime } from '../models/anime';
import { AnimeDto } from '../dtos/anime.dto';

import { AnimeStatusMapper } from './anime-status.mapper';
import { AnimeTypeMapper } from './anime-type.mapper';
import { DateRangeMapper } from './date-range.mapper';

/** Mapper for mapping AnimeDto and Anime. */
export namespace AnimeMapper {

	/**
	 * Mapper for dto to model.
	 * @param dto AnimeDto .
	 */
	export function fromDto(dto: AnimeDto): Anime {
		return new Anime({
			id: dto.id,
			englishTitle: dto.title_eng,
			japaneseTitle: dto.title_jpn,
			coverImageUrl: dto.image,
			broadcasted: DateRangeMapper.fromDto(dto.aired),
			animeType: AnimeTypeMapper.fromDto(dto.type),
			animeStatus: AnimeStatusMapper.fromDto(dto.status),
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
			title_eng: anime.englishTitle,
			title_jpn: anime.japaneseTitle,
			image: anime.coverImageUrl,
			aired: DateRangeMapper.toDto(anime.broadcasted),
			type: AnimeTypeMapper.toDto(anime.animeType),
			status: AnimeStatusMapper.toDto(anime.animeStatus),
			score: anime.score,
			user_score: anime.userScore,
			studios: anime.studios,
			genres: anime.genres,
		};
	}
}
