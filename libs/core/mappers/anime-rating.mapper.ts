import { AnimeRatingDto } from '../dtos/anime-rating.dto';
import { AnimeRating } from '../models/anime-rating';

export namespace AnimeRatingMapper {

	/** Map DTO to model. */
	const MAP_ANIME_RATING_FROM_DTO: Record<AnimeRatingDto, AnimeRating> = {
		[AnimeRatingDto.G]: AnimeRating.G,
		[AnimeRatingDto.Pg]: AnimeRating.Pg,
		[AnimeRatingDto.Pg13]: AnimeRating.Pg13,
		[AnimeRatingDto.R17]: AnimeRating.R17,
		[AnimeRatingDto.RPlus]: AnimeRating.RPlus,
		[AnimeRatingDto.Rx]: AnimeRating.Rx,
		[AnimeRatingDto.Unknown]: AnimeRating.Unknown,
	};

	/** Map model to DTO. */
	const MAP_ANIME_RATING_TO_DTO: Record<AnimeRating, AnimeRatingDto> = {
		[AnimeRating.G]: AnimeRatingDto.G,
		[AnimeRating.Pg]: AnimeRatingDto.Pg,
		[AnimeRating.Pg13]: AnimeRatingDto.Pg13,
		[AnimeRating.R17]: AnimeRatingDto.R17,
		[AnimeRating.RPlus]: AnimeRatingDto.RPlus,
		[AnimeRating.Rx]: AnimeRatingDto.Rx,
		[AnimeRating.Unknown]: AnimeRatingDto.Unknown,
	};

	/**
	 * Function to convert anime rating DTO to internal model.
	 * @param dtoRating Anime rating DTO.
	 */
	export function fromDto(dtoRating: AnimeRatingDto): AnimeRating {
		return MAP_ANIME_RATING_FROM_DTO[dtoRating];
	}

	/**
	 * Function to convert internal model to anime rating DTO.
	 * @param rating Internal anime rating.
	 */
	export function toDto(rating: AnimeRating): AnimeRatingDto {
		return MAP_ANIME_RATING_TO_DTO[rating];
	}
}
