import { Injectable } from '@angular/core';

import { BasedFilterParams } from '../models/based-filter-params';
import { BasedQueryParamsDto } from '../dtos/based-filter-params.dto';

/** Mapper for filter params. */
@Injectable({ providedIn: 'root' })
export class BasedFiltersParamsMapper {
	/**
	 * Map pagination option to DTO.
	 * @param model Based filter params.
	 */
	public mapPaginationOptionsToDto(model: BasedFilterParams.Pagination): BasedQueryParamsDto.Pagination | null {
		if (model.pageNumber !== null && model.pageSize !== null) {
			return {
				offset: model.pageNumber * model.pageSize,
				limit: model.pageSize,
			};
		}
		return null;
	}

	/**
	 * Map search to DTO.
	 * @param model Based filter params.
	 */
	public mapSearchOptionsToDto(model: BasedFilterParams.Search): BasedQueryParamsDto.Search | null {
		if (model.search) {
			return {
				search: model.search,
			};
		}
		return null;
	}

	/**
	 * Map combined option to DTO.
	 * @param model Based filter params.
	 */
	public mapCombinedOptionsToDto(model: BasedFilterParams.Combined): BasedQueryParamsDto.Combined {
		return {
			...this.mapPaginationOptionsToDto(model),
			...this.mapSearchOptionsToDto(model),
		};
	}
}
