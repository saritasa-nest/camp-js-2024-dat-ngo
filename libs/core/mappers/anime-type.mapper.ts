import { AnimeTypeDto } from '../dtos/amime-type.dto';
import { AnimeType } from '../models/anime-type';

/** Mapper for mapping Anime types. */
export namespace AnimeTypeMapper {

	/** Anime Type from DTO. */

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

	/** Anime Type to DTO. */
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

	/**
	 * Function to convert anime type DTO to internal model.
	 * @param dtoType Anime type DTO.
	 **/
	export function fromDto(dtoType: AnimeTypeDto): AnimeType {
		return MAP_ANIME_TYPE_FROM_DTO[dtoType];
	}

	/**
	 * Function to convert internal model to anime type DTO.
	 * @param type Internal anime type.
	 * */
	export function toDto(type: AnimeType): AnimeTypeDto {
		return MAP_ANIME_TYPE_TO_DTO[type];
	}
}
