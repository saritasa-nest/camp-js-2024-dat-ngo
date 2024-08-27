import { BasedFilterParams } from '../models/based-filter-params';
import { BasedQueryParamsDto } from '../dtos/based-filter-params.dto';

/** Mapper for filter params. */
export namespace BasedFiltersParamsMapper {

	/**
	 * Mapper for pagination option.
	 * @param model Base filter params.
	 */
	export function mapPaginationOptionsToDto(
		model: BasedFilterParams.Pagination,
	): BasedQueryParamsDto.Pagination | null {
		if (model.pageNumber !== null && model.pageSize !== null) {
			return {
				offset: model.pageNumber * model.pageSize,
				limit: model.pageSize,
			};
		}
		return null;
	}

	/**
	 * Mapper for pagination search.
	 * @param model Base search params.
	 */
	export function mapSearchOptionsToDto(model: BasedFilterParams.Search): BasedQueryParamsDto.Search | null {
		if (model.search) {
			return {
				search: model.search,
			};
		}
		return null;
	}

	/**
	 * Mapper for pagination combine.
	 * @param model Base combine params.
	 */
	export function mapCombinedOptionsToDto(model: BasedFilterParams.Combined): BasedQueryParamsDto.Combined {
		return {
			...mapPaginationOptionsToDto(model),
			...mapSearchOptionsToDto(model),
		};
	}
}
