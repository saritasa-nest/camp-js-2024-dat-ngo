import { CommonModule } from '@angular/common';
import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
	ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmptyPipe } from '@js-camp/angular/core/pipes/empty.pipe';
import { Anime } from '@js-camp/core/models/anime.model';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { SkeletonDirective } from '@js-camp/angular/shared/directives/skeleton.directive';
import { TableCellContentComponent } from '@js-camp/angular/shared/directives/table-cell-content/table-cell-content.component';
import { DEFAULT_PAGINATION } from '@js-camp/core/const/pagination';
import { MovieStatusComponent } from '@js-camp/angular/shared/components/movie-status/movie-status.component';
import { MovieTypeComponent } from '@js-camp/angular/shared/components/movie-type/movie-type.component';

import { MovieNotFoundComponent } from '../movie-not-found/movie-not-found.component';

const COLUMN_KEYS = {
	IMAGE: 'Image',
	TitleEng: 'titleEng',
	TitleJpn: 'title_jpn',
	AiredStartDate: 'airedStartDate',
	Type: 'Type',
	Status: 'status',
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
			this.dataSource.data = [...values];
		} else if (values === null) {
			this.dataSource.data = [];
		}
	}

	/** Loading state. */
	@Input({ transform: booleanAttribute }) public isLoading = false;

	/** Sort params. */
	@Input({ required: true })
	public sortParams: Sort | null = null;

	/** Table data source. */
	protected dataSource = new MatTableDataSource<Anime>();

	/** Event emitter for page changing. */
	@Output() public sortChange = new EventEmitter<Sort>();

	/**
	 * Emit the page event.
	 * @param event The page event.
	 */
	public onSortChange(event: Sort): void {
		this.sortChange.emit(event);
	}

	// TODO (Dat Ngo): Create a constant object for columns. Then use Object.values for displayedColumns DONE;
	/** Displayed columns .*/
	protected readonly displayedColumns: string[] = Object.values(COLUMN_KEYS);

	/** Generate number array for the template table data source. */
	protected get templateArray(): object[] {
		return Array(DEFAULT_PAGINATION.pageSize)
			.fill(null)
			.map(_ => ({}));
	}
}
