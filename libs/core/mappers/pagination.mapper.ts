import { PaginationDto } from '../../core/dtos/pagination.dto';

import { Pagination } from '../models/pagination';

import { TMapperFunction } from './mapper';

/** Pagination mapper. */
export namespace PaginationMapper {

	/** @inheritdoc */
	export function fromDto<TDto, TDomain>(
		paginationDto: PaginationDto<TDto>,
		mapperFn: TMapperFunction<TDto, TDomain>,
	): Pagination<TDomain> {
		return new Pagination<TDomain>({
			totalCount: paginationDto.count,
			hasNext: Boolean(paginationDto.next),
			hasPrevious: Boolean(paginationDto.previous),
			items: paginationDto.results.map(item => mapperFn(item)),
		});
	}
}
