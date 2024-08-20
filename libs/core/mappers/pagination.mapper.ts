import { Injectable } from '@angular/core';

import { PaginationDto } from '../../core/dtos/pagination.dto';

import { Pagination } from '../models/pagination';

import { MapperFunction } from '../types/mapper';

/** Pagination mapper. */
@Injectable({
	providedIn: 'root',
})
export class PaginationMapper {

	/** @inheritdoc */
	public fromDto<TDto, TDomain>(
		paginationDto: PaginationDto<TDto>,
		mapperFn: MapperFunction<TDto, TDomain>,
	): Pagination<TDomain> {
		return new Pagination<TDomain>({
			totalCount: paginationDto.count,
			hasNext: Boolean(paginationDto.next),
			hasPrevious: Boolean(paginationDto.previous),
			items: paginationDto.results.map(item => mapperFn(item)),
		});
	}
}
