import { Injectable } from '@angular/core';

import { AnimeFilterParams } from '../models/anime-filter-params';
import { AnimeQueryParamsDto } from '../dtos/url-query.dto';
import { AnimeType } from '../models/anime-type';
import { AnimeTypeDto } from '../dtos/amime-type.dto';
import { AnimeSortField } from '../models/anime-sort-field';
import { AnimeSortFieldDto } from '../dtos/anime-sort-field.dto';
import { SortsDirection } from '../models/sort-direction';

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
	[AnimeSortField.StartDate]: AnimeSortFieldDto.StartDate,
	[AnimeSortField.Status]: AnimeSortFieldDto.Status,
	[AnimeSortField.TitleEng]: AnimeSortFieldDto.TitleEng,
};

/** Mapper for filter params. */
@Injectable({ providedIn: 'root' })
export class AnimeFiltersParamsMapper {
	/** @inheritdoc */
	public mapPaginationOptionsToDto(model: AnimeFilterParams.Pagination): AnimeQueryParamsDto.Pagination | null {
		if (model.pageNumber !== null && model.pageSize !== null) {
			return {
				offset: model.pageNumber * model.pageSize,
				limit: model.pageSize,
			};
		}
		return null;
	}

	/** @inheritdoc */
	public mapSearchOptionsToDto(model: AnimeFilterParams.Search): AnimeQueryParamsDto.Search | null {
		if (model.search) {
			return {
				search: model.search,
			};
		}
		return null;
	}

	/** @inheritdoc */
	public mapOrderingOptionToDto(model: AnimeFilterParams.Sort): AnimeQueryParamsDto.Sort | null {
		if (model.sortField && model.sortDirection) {
			const dto = MAP_ANIME_SORT_TO_DTO[model.sortField];
			return {
				ordering: model.sortDirection === SortsDirection.Ascending ? dto : `-${dto}`,
			}
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
			...this.mapPaginationOptionsToDto(model),
			...this.mapSearchOptionsToDto(model),
			...this.mapOrderingOptionToDto(model),
			...this.mapTypeOptionToDto(model),
		};
	}
}
