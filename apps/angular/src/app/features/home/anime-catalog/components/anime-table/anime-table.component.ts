import { CommonModule } from '@angular/common';
import {
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
import { MatSort, MatSortModule, Sort, SortDirection } from '@angular/material/sort';
import { SortsDirection } from '@js-camp/core/models/sort-direction';
import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';
import { SortMapper } from '@js-camp/core/mappers/sort-mapper';

/** Create anime table component.*/
@Component({
	selector: 'camp-anime-table',
	standalone: true,
	imports: [MatTableModule, CommonModule, EmptyPipe, MatPaginator, MatSortModule],
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent implements OnChanges {
	@ViewChild(MatSort) protected sort!: MatSort;

	@Input() public animeList: ReadonlyArray<Anime> = [];

	@Input() public sortParams: Sort = {
		direction: '',
		active: '',
	}

	protected dataSource = new MatTableDataSource<Anime>();

	protected readonly sortMapper = inject(SortMapper);

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

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['animeList']) {
			this.dataSource.data = [...this.animeList];
		}
	}

	/** This informs the table how to uniquely identify rows to track how the dataSource changes with each update.
	 * @param index Index of them Anime on table.
	 * @param item Items on table.
	 */
	protected trackBy(index: number, item: Anime): Anime['id'] {
		return item.id;
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
}
