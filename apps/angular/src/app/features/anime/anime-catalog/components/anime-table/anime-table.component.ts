import { CommonModule } from '@angular/common';
import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
	TrackByFunction,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { EmptyPipe } from '@js-camp/angular/core/pipes/empty.pipe';
import { Anime } from '@js-camp/core/models/anime';
import { MatSortModule, Sort } from '@angular/material/sort';
import { SkeletonDirective } from '@js-camp/angular/shared/directives/skeleton.directive';
import { TableCellContentComponent } from '@js-camp/angular/shared/components/table-cell-content/table-cell-content.component';
import { DEFAULT_PAGINATION } from '@js-camp/core/const/pagination';
import { AnimeStatusComponent } from '@js-camp/angular/shared/components/anime-status/anime-status.component';
import { AnimeTypeComponent } from '@js-camp/angular/shared/components/anime-type/anime-type.component';
import { AnimeNotFoundComponent } from '../anime-not-found/anime-not-found.component';
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
		SkeletonDirective,
		TableCellContentComponent,
		AnimeStatusComponent,
		AnimeTypeComponent,
		AnimeNotFoundComponent,
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
	public sortChange = new EventEmitter<Sort>();

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
			.map((_) => ({}));
	}

	/**
	 *  Track object by id.
	 *  @param key Key of Type.
	 */
	protected trackBy<T>(key: keyof T): TrackByFunction<T> {
		return function (index: number, item: T): T[keyof T] {
			return item[key];
		};
	}
}
