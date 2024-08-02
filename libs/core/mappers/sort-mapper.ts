import { Injectable } from '@angular/core';
import { AnimeFilterParams } from '../models/anime-filter-params';
import { AnimeSortField } from '../models/anime-sort-field';
import { SortsDirection } from '../models/sort-direction';
import { TMapper, TMapperFromDto } from '../types/mapper';
import { Sort, SortDirection } from '@angular/material/sort';

@Injectable({
	providedIn: 'root',
})
export class SortMapper implements TMapper<Sort, AnimeFilterParams.Sort> {
	private fieldMapperFromDTO: Record<string, AnimeSortField> = {
		titleEng: AnimeSortField.TitleEng,
		airedStartDate: AnimeSortField.StartDate,
		status: AnimeSortField.Status,
	};
	private fieldMapperToDTO: Record<AnimeSortField, string> = {
		[AnimeSortField.TitleEng]: 'titleEng',
		[AnimeSortField.StartDate]: 'airedStartDate',
		[AnimeSortField.Status]: 'status',
	};

	fromDto(dto: Sort): AnimeFilterParams.Sort {
		let sortDirection: SortsDirection | null;
		switch (dto.direction) {
			case 'asc':
				sortDirection = SortsDirection.Ascending;
				break;
			case 'desc':
				sortDirection = SortsDirection.Descending;
				break;
			default:
				sortDirection = null;
				break;
		}
		return {
			sortField: sortDirection != null ? this.fieldMapperFromDTO[dto.active] : null,
			sortDirection,
		};
	}

	toDto(dto: AnimeFilterParams.Sort): Sort {
		let sortDirection: SortDirection;
		switch (dto.sortDirection) {
			case SortsDirection.Ascending:
				sortDirection = 'asc';
				break;
			case SortsDirection.Descending:
				sortDirection = 'desc';
				break;
			default:
				sortDirection = '';
				break;
		}
		return {
			active: sortDirection !== '' && dto.sortField !== null ? this.fieldMapperToDTO[dto.sortField] : '',
			direction: sortDirection,
		};
	}
}
