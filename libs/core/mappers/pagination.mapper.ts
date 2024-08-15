import { Injectable } from '@angular/core';

import { PaginationDto } from '../../core/dtos/pagination.dto';

import { Pagination } from '../models/pagination';

import { TMapperFromDto, TMapperFunction } from './mapper';

/** Pagination mapper. */
@Injectable({
	providedIn: 'root',
})
export class PaginationMapper {
	/** @inheritdoc */
	public fromDto<TDto, TDomain>(
		paginationDto: PaginationDto<TDto>,
		mapper: TMapperFromDto<TDto, TDomain> | TMapperFunction<TDto, TDomain>,
	): Pagination<TDomain> {
		const mapperFn = typeof mapper === 'function' ? mapper : mapper.fromDto;
		return new Pagination<TDomain>({
			totalCount: paginationDto.count,
			hasNext: Boolean(paginationDto.next),
			hasPrevious: Boolean(paginationDto.previous),
			items: paginationDto.results.map(item => mapperFn(item)),
		});
	}
}
