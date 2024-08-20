import { Injectable } from '@angular/core';

import { AnimeTypeDto } from '../dtos/amime-type.dto';
import { AnimeType } from '../models/amime-type';

/** Mapper for mapping Anime types. */
@Injectable({
	providedIn: 'root',
})
export class AnimeTypeMapper {
	/** Anime Type from DTO. */
	public MAP_ANIME_TYPE_FROM_DTO: Record<AnimeTypeDto, AnimeType> = {
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
	public MAP_ANIME_TYPE_TO_DTO: Record<AnimeType, AnimeTypeDto> = {
		[AnimeType.Movie]: AnimeTypeDto.Movie,
		[AnimeType.Music]: AnimeTypeDto.Music,
		[AnimeType.ONA]: AnimeTypeDto.ONA,
		[AnimeType.OVA]: AnimeTypeDto.OVA,
		[AnimeType.PromotionalVideos]: AnimeTypeDto.PromotionalVideos,
		[AnimeType.Special]: AnimeTypeDto.Special,
		[AnimeType.TV]: AnimeTypeDto.TV,
		[AnimeType.Unknown]: AnimeTypeDto.Unknown,
	};
}
