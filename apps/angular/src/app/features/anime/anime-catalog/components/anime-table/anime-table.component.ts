import { CommonModule } from '@angular/common';
import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	inject,
	Input,
	Output,
	TrackByFunction,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { EmptyPipe } from '@js-camp/angular/core/pipes/empty.pipe';
import { Anime } from '@js-camp/core/models/anime';
import { MatSortModule, Sort } from '@angular/material/sort';
import { SkeletonCellComponent } from '@js-camp/angular/shared/components/skeleton-cell/skeleton-cell.component';
import { DEFAULT_PAGINATION } from '@js-camp/core/const/pagination';
import { MovieStatusComponent } from '@js-camp/angular/shared/components/movie-status/movie-status.component';
import { MovieTypeComponent } from '@js-camp/angular/shared/components/movie-type/movie-type.component';

import { Router } from '@angular/router';

import { MovieNotFoundComponent } from '../movie-not-found/movie-not-found.component';

const COLUMN_KEYS = {
	image: 'image',
	titleEng: 'title_eng',
	titleJpn: 'title_jpn',
	airedStartDate: 'aired_start_date',
	type: 'type',
	status: 'status',
} as const;

/** Anime table component.*/
@Component({
	selector: 'camp-anime-table',
	standalone: true,
	imports: [
		MatTableModule,
		CommonModule,
		EmptyPipe,
		MatSortModule,
		SkeletonCellComponent,
		MovieStatusComponent,
		MovieTypeComponent,
		MovieNotFoundComponent,
	],
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent {
	/** Anime list. */
	@Input()
	public set animeList(values: ReadonlyArray<Anime> | null) {
		if (values !== null) {
			this.dataSource = [...values];
		} else if (values === null) {
			this.dataSource = [];
		}
	}

	/** Loading state. */
	@Input({ transform: booleanAttribute })
	public isLoading = false;

	/** Sort params. */
	@Input({ required: true })
	public sortParams: Sort | null = null;

	/** Table data source. */
	protected dataSource: ReadonlyArray<Anime> = [];

	/** Event emitter for page changing. */
	@Output()
	public readonly sortChange = new EventEmitter<Sort>();

	private readonly router = inject(Router);

	/**
	 * Emit the page event.
	 * @param event The page event.
	 */
	public onSortChange(event: Sort): void {
		this.sortChange.emit(event);
	}

	/** Displayed columns .*/
	protected readonly displayedColumns: string[] = Object.values(COLUMN_KEYS);

	/** Generate number array for the template table data source. */
	protected get templateArray(): readonly object[] {
		return Array(DEFAULT_PAGINATION.pageSize)
			.fill(null)
			.map(_ => ({}));
	}

	/**
	 *  Track object by id.
	 *  @param key Key of Type.
	 */
	protected trackBy<T>(key: keyof T): TrackByFunction<T> {
		return function(index: number, item: T): T[keyof T] {
			return item[key];
		};
	}

	/**
	 * Navigate the selected anime to the detail page.
	 * @param anime The anime associated with the row.
	 */
	protected onRowClick(anime: Anime): void {
		this.router.navigate([`/anime/${anime.id}`]);
	}
}