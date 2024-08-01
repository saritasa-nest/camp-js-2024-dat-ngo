import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { Pagination } from '@js-camp/core/models/pagination';
import { Anime } from '@js-camp/core/models/anime.model';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { PageEvent } from '@angular/material/paginator';
import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';
import { AnimeTableComponent } from './components/anime-table/anime-table.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { AnimeType } from '@js-camp/core/models/anime-type';
import { SearchFilterFormComponent } from './components/search-filter-form/search-filter-form.component';
import {
	ANIME_FILTER_PARAMS_PROVIDERS,
	ANIME_FILTER_PARAMS_TOKEN,
} from '@js-camp/angular/core/provider/anime-filter-params';
import { AnimeQueryParamsService } from '@js-camp/angular/core/services/anime-query-params.service';
import { Sort } from '@angular/material/sort';
@Component({
	selector: 'camp-anime-catalog',
	standalone: true,
	imports: [CommonModule, MatFormField, AnimeTableComponent, PaginatorComponent, SearchFilterFormComponent],
	templateUrl: './anime-catalog.component.html',
	styleUrl: './anime-catalog.component.css',
	providers: [...ANIME_FILTER_PARAMS_PROVIDERS],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeCatalogComponent implements OnInit {
	/** Anime response observable.  */
	protected animePage$: Observable<Pagination<Anime>>;

	private readonly filter$ = inject(ANIME_FILTER_PARAMS_TOKEN);

	private readonly animeService = inject(AnimeService);

	private readonly animeQueryParamsService = inject(AnimeQueryParamsService);

	/** Filter params. */
	protected filterParams: AnimeFilterParams.Combined | null = null;

	public constructor() {
		this.animePage$ = this.animeService.getAllAnime(this.filter$);
	}

	ngOnInit(): void {
		this.filter$.subscribe((params) => {
			this.filterParams = params;
			console.log(this.filterParams);
		});
	}

	protected onPageChange(event: PageEvent): void {
		this.animeQueryParamsService.append({ pageNumber: event.pageIndex, pageSize: event.pageSize });
	}

	protected onSelectionChange(event: AnimeType): void {
		this.animeQueryParamsService.appendParamsAndResetPageNumber({ type: event });
	}

	protected onSearchChange(event: string): void {
		this.animeQueryParamsService.appendParamsAndResetPageNumber({ search: event });
	}

	protected onSortChange(event: Sort): void {
		console.log(event.active);
		this.animeQueryParamsService.appendParamsAndResetPageNumber({ sortFields: event.active });
	}
}
