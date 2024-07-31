import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { Observable, tap } from 'rxjs';
import { Pagination } from '@js-camp/core/models/pagination';
import { Anime } from '@js-camp/core/models/anime.model';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { PageEvent } from '@angular/material/paginator';
import { UrlParamsService } from '@js-camp/angular/core/services/url-param.service';
import { AnimeQueryParams } from '@js-camp/core/models/url-query';
import { AnimeTableComponent } from './components/anime-table/anime-table.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { AnimeType } from '@js-camp/core/models/anime-type';
import { SearchFilterFormComponent } from './components/search-filter-form/search-filter-form.component';
@Component({
	selector: 'camp-anime-catalog',
	standalone: true,
	imports: [CommonModule, MatFormField, AnimeTableComponent, PaginatorComponent, SearchFilterFormComponent],
	templateUrl: './anime-catalog.component.html',
	styleUrl: './anime-catalog.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeCatalogComponent implements OnInit {
	/** Anime response observable.  */
	protected animePage$: Observable<Pagination<Anime>>;

	private readonly animeService = inject(AnimeService);

	private readonly urlService = inject(UrlParamsService);

	protected pageSize: number | null = null;

	protected pageNumber: number | null = null;

	protected params: Partial<AnimeQueryParams.Combined>;

	public constructor() {
		this.animePage$ = this.animeService.getAllAnime();
		this.params = {};
	}

	ngOnInit(): void {
		this.animeService.pageNumberSubject$.subscribe((pageNumber) => {
			this.pageNumber = pageNumber;
		});
		this.animeService.pageSizeSubject$.subscribe((pageSize) => {
			this.pageSize = pageSize;
		});
	}

	protected onPageChange(event: PageEvent): void {
		const newParams: Partial<AnimeQueryParams.Combined> = {
			...this.params,
			pageNumber: event.pageIndex,
			pageSize: event.pageSize,
		};
		this.params = newParams;
		this.urlService.updateCombinedQueryParams(this.params);
	}

	protected onSelectionChange(event: AnimeType): void {
		this.animeService.updateTypesParams({ type: event });
	}

	protected onSearchChange(event: string): void {
		this.animeService.updateSearchParams({ search: event });
	}

	protected onSortChange(event: string): void {
		console.log(event)
		this.animeService.updateSortParams({ sortFields: event });
	}
}
