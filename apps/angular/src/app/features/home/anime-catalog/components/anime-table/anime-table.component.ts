import { CommonModule } from '@angular/common';
import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	inject,
	Input,
	OnChanges,
	Output,
	SimpleChanges,
	ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmptyPipe } from '@js-camp/angular/core/pipes/empty.pipe';
import { Anime } from '@js-camp/core/models/anime.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { SkeletonDirective } from '@js-camp/angular/shared/directives/skeleton.directive';
import { TableCellContentComponent } from '@js-camp/angular/shared/directives/table-cell-content/table-cell-content.component';
import { DEFAULT_PAGINATION } from '@js-camp/core/const/pagination';
import { ClassifyPipe } from '@js-camp/angular/core/pipes/classify.pipe';

/** Create anime table component.*/
@Component({
	selector: 'camp-anime-table',
	standalone: true,
	imports: [
		MatTableModule,
		CommonModule,
		EmptyPipe,
		ClassifyPipe,
		MatPaginator,
		MatSortModule,
		SkeletonDirective,
		TableCellContentComponent,
	],
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent {
	@ViewChild(MatSort) protected sort!: MatSort;

	@Input() public set animeList(values: ReadonlyArray<Anime>) {
		console.log({ values });
		this.dataSource.data = [...values];
	}

	@Input({ transform: booleanAttribute }) public isLoading: boolean = false;

	@Input() public sortParams: Sort = {
		direction: '',
		active: '',
	};

	// protected dataSource = new MatTableDataSource<Anime>();

	protected dataSource = new MatTableDataSource<Anime>();

	// private data: SortDirection =

	/** Event emitter for page changing. */
	@Output() public sortChange = new EventEmitter<Sort>();

	/**
	 * Emit the page event.
	 * @param event The page event.
	 */
	public onSortChange(event: Sort): void {
		this.sortChange.emit(event);
	}

	public constructor() {}

	/** This informs the table how to uniquely identify rows to track how the dataSource changes with each update.
	 * @param index Index of them Anime on table.
	 * @param item Items on table.
	 */
	protected trackBy(index: number, item: Anime): Anime['id'] {
		return item.id;
	}

	protected trackByFallback(index: number): number {
		return index;
	}

	/** Displayed columns .*/
	protected readonly displayedColumns: string[] = [
		'Image',
		'titleEng',
		'title_jpn',
		'airedStartDate',
		'Type',
		'status',
	];
	/** Generate number array for the template table data source. */
	protected get templateArray(): object[] {
		return Array(DEFAULT_PAGINATION.pageSize)
			.fill(null)
			.map((_, index) => ({}));
	}

	protected formatDynamicClass(status: string): string {
		return status.toLowerCase().replace(/\s+/g, '-');
	}
}
