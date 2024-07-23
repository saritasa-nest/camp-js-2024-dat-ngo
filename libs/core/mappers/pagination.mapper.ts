import { inject, Injectable } from '@angular/core';

import { PaginationDto } from '../../core/dtos/pagination.dto';

import { Pagination } from '../models/pagination';

import { TMapperFromDto, TMapperFunction } from '../types/mapper';

import { AnimeMapper } from './anime.mapper';

/** Auth mapper. */
@Injectable({
	providedIn: 'root',
})
export class PaginationMapper {
	private readonly animeMapper = inject(AnimeMapper);

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
