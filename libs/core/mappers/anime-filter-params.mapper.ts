import { inject, Injectable } from '@angular/core';

import { AnimeFilterParams } from '../models/anime-filter-params';
import { AnimeQueryParamsDto } from '../dtos/anime-query-params.dto';
import { AnimeType } from '../models/anime-type';
import { AnimeTypeDto } from '../dtos/amime-type.dto';
import { AnimeSortField } from '../models/anime-sort-field';
import { AnimeSortFieldDto } from '../dtos/anime-sort-field.dto';
import { SortsDirection } from '../models/sort-direction';

import { BasedFiltersParamsMapper } from './base-filter-params.mapper';

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

const MAP_ANIME_SORT_TO_DTO: Record<AnimeSortField, AnimeSortFieldDto> = {
	[AnimeSortField.TitleJpn]: AnimeSortFieldDto.TitleJpn,
	[AnimeSortField.StartDate]: AnimeSortFieldDto.StartDate,
	[AnimeSortField.Status]: AnimeSortFieldDto.Status,
	[AnimeSortField.TitleEng]: AnimeSortFieldDto.TitleEng,
};

// TODO (Dat Ngo): Why Angular classes are in libs/core, other frameworks cannot use the Injectable.
/** Mapper for filter params. */
@Injectable({ providedIn: 'root' })
export class AnimeFiltersParamsMapper {
	private readonly basedFilterParamsMapper = inject(BasedFiltersParamsMapper);

	/** @inheritdoc */
	public mapOrderingOptionToDto(model: AnimeFilterParams.Sort): AnimeQueryParamsDto.Sort | null {
		if (model.sortField && model.sortDirection) {
			const dto = MAP_ANIME_SORT_TO_DTO[model.sortField];
			return {
				ordering: model.sortDirection === SortsDirection.Ascending ? dto : `-${dto}`,
			};
		}
		return null;
	}

	/** @inheritdoc */
	public mapTypeOptionToDto(model: AnimeFilterParams.Type): AnimeQueryParamsDto.Type | null {
		if (model.type) {
			return {
				type: MAP_ANIME_TYPE_TO_DTO[model.type],
			};
		}
		return null;
	}

	/** @inheritdoc */
	public mapCombinedOptionsToDto(model: AnimeFilterParams.Combined): AnimeQueryParamsDto.Combined {
		return {
			...this.basedFilterParamsMapper.mapCombinedOptionsToDto(model),
			...this.mapOrderingOptionToDto(model),
			...this.mapTypeOptionToDto(model),
		};
	}
}
