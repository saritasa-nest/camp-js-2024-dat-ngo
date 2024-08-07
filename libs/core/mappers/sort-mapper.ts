import { Injectable } from '@angular/core';
import { AnimeFilterParams } from '../models/anime-filter-params';
import { AnimeSortField } from '../models/anime-sort-field';
import { SortsDirection } from '../models/sort-direction';
import { TMapper } from '../types/mapper';
import { Sort, SortDirection } from '@angular/material/sort';

@Injectable({
	providedIn: 'root',
})
export class SortMapper implements TMapper<Sort, AnimeFilterParams.Sort> {
	private fieldMapperFromDTO: Record<string, AnimeSortField> = {
		title_eng: AnimeSortField.TitleEng,
		title_jpn: AnimeSortField.TitleJpn,
		aired_start_date: AnimeSortField.StartDate,
		status: AnimeSortField.Status,
	};

	private fieldMapperToDTO: Record<AnimeSortField, string> = {
		[AnimeSortField.TitleEng]: 'title_eng',
		[AnimeSortField.TitleJpn]: 'title_jpn',
		[AnimeSortField.StartDate]: 'aired_start_date',
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
