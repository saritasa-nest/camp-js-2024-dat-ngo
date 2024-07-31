import { CommonModule } from '@angular/common';
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	SimpleChanges,
	ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmptyPipe } from '@js-camp/angular/core/pipes/empty.pipe';
import { Anime } from '@js-camp/core/models/anime.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
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

	protected dataSource = new MatTableDataSource<Anime>();

	/** Event emitter for page changing. */
	@Output() public sortChange = new EventEmitter<string>();

	/**
	 * Emit the page event.
	 * @param event The page event.
	 */
	public onSortChange(event: Sort): void {
		if (event.direction === 'asc') {
			this.sortChange.emit(event.active);
		} else if (event.direction === 'desc') {
			this.sortChange.emit(`-${event.active}`);
		} else {
			this.sortChange.emit(undefined);
		}
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
		'English Title',
		'titleJpn',
		'Broadcasted Date',
		'Type',
		'Status',
	];
}
