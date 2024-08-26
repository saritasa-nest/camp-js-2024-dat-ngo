import { AnimeSeasonDto } from '../dtos/anime-season.dto';
import { AnimeSeason } from '../models/anime-season';

export namespace AnimeSeasonMapper {

	/** Map DTO to model. */
	const MAP_ANIME_SEASON_FROM_DTO: Record<AnimeSeasonDto, AnimeSeason> = {
		[AnimeSeasonDto.Spring]: AnimeSeason.Spring,
		[AnimeSeasonDto.Summer]: AnimeSeason.Summer,
		[AnimeSeasonDto.Fall]: AnimeSeason.Fall,
		[AnimeSeasonDto.Winter]: AnimeSeason.Winter,
		[AnimeSeasonDto.NonSeasonal]: AnimeSeason.NonSeasonal,
	};

	/** Map model to DTO. */
	const MAP_ANIME_SEASON_TO_DTO: Record<AnimeSeason, AnimeSeasonDto> = {
		[AnimeSeason.Spring]: AnimeSeasonDto.Spring,
		[AnimeSeason.Summer]: AnimeSeasonDto.Summer,
		[AnimeSeason.Fall]: AnimeSeasonDto.Fall,
		[AnimeSeason.Winter]: AnimeSeasonDto.Winter,
		[AnimeSeason.NonSeasonal]: AnimeSeasonDto.NonSeasonal,
	};

	/**
	 * Function to convert anime season DTO to internal model.
	 * @param dtoSeason Anime season DTO.
	 */
	export function fromDto(dtoSeason: AnimeSeasonDto): AnimeSeason {
		return MAP_ANIME_SEASON_FROM_DTO[dtoSeason];
	}

	/**
	 * Function to convert internal model to anime season DTO.
	 * @param season Internal anime season.
	 */
	export function toDto(season: AnimeSeason): AnimeSeasonDto {
		return MAP_ANIME_SEASON_TO_DTO[season];
	}
}
