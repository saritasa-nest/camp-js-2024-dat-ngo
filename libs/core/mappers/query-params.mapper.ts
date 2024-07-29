import { Injectable } from '@angular/core';

import { AnimeQueryParams } from '../models/url-query';
import { AnimeQueryParamsDto } from '../dtos/url-query.dto';
import { AnimeType } from '../models/anime-type';
import { AnimeTypeDto } from '../dtos/amime-type.dto';

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

/** Mapper for filter params. */
@Injectable({ providedIn: 'root' })
export class AnimeQueryParamsMapper {
	/** @inheritdoc */
	public mapPaginationOptionsToDto(model: AnimeQueryParams.Pagination): AnimeQueryParamsDto.Pagination | null {
		if (model.pageNumber !== null && model.pageSize !== null) {
			return {
				offset: model.pageNumber * model.pageSize,
				limit: model.pageSize,
			};
		}
		return null;
	}

	/** @inheritdoc */
	public mapSearchOptionsToDto(model: AnimeQueryParams.Search): AnimeQueryParamsDto.Search | null {
		if (model.search) {
			return {
				search: model.search,
			};
		}
		return null;
	}

	/** @inheritdoc */
	public mapOrderingOptionToDto(model: AnimeQueryParams.Sort): AnimeQueryParamsDto.Sort | null {
		if (model.sortFields) {
			return {
				ordering: model.sortFields.join(','),
			};
		}
		return null;
	}

	/** @inheritdoc */
	public mapTypeOptionToDto(model: AnimeQueryParams.Type): AnimeQueryParamsDto.Type | null {
		if (model.type) {
			return {
				type: MAP_ANIME_TYPE_TO_DTO[model.type],
			};
		}
		return null;
	}

	/** @inheritdoc */
	public mapCombinedOptionsToDto(model: AnimeQueryParams.Combined): AnimeQueryParamsDto.Combined {
		return {
			...this.mapPaginationOptionsToDto(model),
			...this.mapSearchOptionsToDto(model),
			...this.mapOrderingOptionToDto(model),
			...this.mapTypeOptionToDto(model),
		};
	}
}
