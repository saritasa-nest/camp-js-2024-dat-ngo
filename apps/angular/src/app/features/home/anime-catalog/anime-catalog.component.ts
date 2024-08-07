import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { BehaviorSubject, debounceTime, finalize, ignoreElements, Observable, switchMap, tap } from 'rxjs';
import { Pagination } from '@js-camp/core/models/pagination';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { PageEvent } from '@angular/material/paginator';
import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AnimeType } from '@js-camp/core/models/anime-type';

import {
	ANIME_FILTER_PARAMS_PROVIDERS,
	ANIME_FILTER_PARAMS_TOKEN,
} from '@js-camp/angular/core/provider/anime-filter-params';
import { AnimeQueryParamsService } from '@js-camp/angular/core/services/anime-query-params.service';
import { Sort } from '@angular/material/sort';

import { SortMapper } from '@js-camp/core/mappers/sort-mapper';

import { SearchFilterFormComponent } from './components/search-filter-form/search-filter-form.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { AnimeTableComponent } from './components/anime-table/anime-table.component';

/** Anime catalog. */
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

	private readonly destroyRef = inject(DestroyRef);

	/** Anime response observable.  */
	protected readonly animePage$: Observable<Pagination<Anime>>;

	private readonly filter$ = inject(ANIME_FILTER_PARAMS_TOKEN);

	private readonly animeService = inject(AnimeService);

	private readonly animeQueryParamsService = inject(AnimeQueryParamsService);

	private readonly sortMapper = inject(SortMapper);

	/** Loading state. */
	protected readonly isLoading$ = new BehaviorSubject(true);

	/** Filter params. */
	protected readonly filterParams$ = new BehaviorSubject<AnimeFilterParams.Combined | null>(null);

	/** Sort params. */
	protected readonly sortParams$ = new BehaviorSubject<Sort>({
		direction: '',
		active: '',
	});

	public constructor() {
		this.animePage$ = this.filter$.pipe(
			debounceTime(1000),
			tap(() => {
				this.isLoading$.next(true);
			}),
			switchMap(queryParams =>
				this.animeService.getAnime(queryParams).pipe(
					finalize(() => {
						this.isLoading$.next(false);
					}),
				)),
		);
	}

	/** Subscribe the filter params and pass them to the filter form and paginator. */
	public ngOnInit(): void {
		this.initializeFilterParamsSideEffect()
			.pipe(
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe();
	}

	private initializeFilterParamsSideEffect(): Observable<void> {
		return this.filter$
			.pipe(
				tap(params => {
					this.filterParams$.next(params);
					this.sortParams$.next(this.sortMapper.toDto({
						sortField: params.sortField,
						sortDirection: params.sortDirection,
					}));
				}),
				ignoreElements(),
			);
	}

	/**
	 * Event handler for page changing .
	 * @param event Page event.
	 */
	protected onPageChange(event: PageEvent): void {
		this.animeQueryParamsService.append({ pageNumber: event.pageIndex, pageSize: event.pageSize });
	}

	/**
	 * Event handler for anime type selection changing .
	 * @param event Anime type.
	 */
	protected onSelectionChange(event: AnimeType | null): void {
		this.animeQueryParamsService.appendParamsAndResetPageNumber({ type: event });
	}

	/**
	 * Event handler for anime search by japanese or english changing .
	 * @param event Search input.
	 */
	protected onSearchChange(event: string | null): void {
		this.animeQueryParamsService.appendParamsAndResetPageNumber({ search: event });
	}

	/**
	 * Event handler for anime sort changing .
	 * @param event Sorting event value.
	 */
	protected onSortChange(event: Sort): void {
		const param = this.sortMapper.fromDto(event);
		this.animeQueryParamsService.appendParamsAndResetPageNumber(param);
	}
}
