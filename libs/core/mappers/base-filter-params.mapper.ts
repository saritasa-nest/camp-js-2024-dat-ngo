import { Injectable } from '@angular/core';

import { BasedFilterParams } from '../models/based-filter-params';
import { BasedQueryParamsDto } from '../dtos/based-filter-params.dto';

// TODO (Dat Ngo): Why Angular classes are in libs/core, other frameworks cannot use the Injectable.
/** Mapper for filter params. */
@Injectable({ providedIn: 'root' })
export class BasedFiltersParamsMapper {
	/** @inheritdoc */
	public mapPaginationOptionsToDto(model: BasedFilterParams.Pagination): BasedQueryParamsDto.Pagination | null {
		if (model.pageNumber !== null && model.pageSize !== null) {
			return {
				offset: model.pageNumber * model.pageSize,
				limit: model.pageSize,
			};
		}
		return null;
	}

	/** @inheritdoc */
	public mapSearchOptionsToDto(model: BasedFilterParams.Search): BasedQueryParamsDto.Search | null {
		if (model.search) {
			return {
				search: model.search,
			};
		}
		return null;
	}

	/** @inheritdoc */
	public mapCombinedOptionsToDto(model: BasedFilterParams.Combined): BasedQueryParamsDto.Combined {
		return {
			...this.mapPaginationOptionsToDto(model),
			...this.mapSearchOptionsToDto(model),
		};
	}
}
