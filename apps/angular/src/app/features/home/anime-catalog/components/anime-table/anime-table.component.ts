import { AsyncPipe, CommonModule } from '@angular/common';
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
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmptyPipe } from '@js-camp/angular/core/pipes/empty.pipe';
import { Anime } from '@js-camp/core/models/anime.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { UrlParamsService } from '@js-camp/angular/core/services/url-param.service';
import { AnimeQueryParams } from '@js-camp/core/models/url-query';

import { PaginatorComponent } from '../paginator/paginator.component';
import { AnimeCatalogComponent } from '../../anime-catalog.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { AnimeType } from '@js-camp/core/models/anime-type';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
/** Create anime table componet.*/
@Component({
	selector: 'camp-anime-table',
	standalone: true,
	imports: [
		MatTableModule,
		CommonModule,
		EmptyPipe,
		AsyncPipe,
		PaginatorComponent,
		MatPaginator,
		AnimeCatalogComponent,
		MatInputModule,
		MatFormFieldModule,
		MatFormField,
		FormsModule,
		MatSelectModule,
		MatSort,
	],
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent implements OnChanges {
	/** Anime response observable.  */
	protected params: Partial<AnimeQueryParams.Combined>;

	@ViewChild(MatPaginator) paginator!: MatPaginator;

	@ViewChild(MatSort) protected sort!: MatSort;

	@Input() public animeList: ReadonlyArray<Anime> = [];

	protected dataSource = new MatTableDataSource<Anime>();

	protected pageSize: number | null = null;

	protected pageNumber: number | null = null;

	/** Event emitter for page changing. */
	@Output() public pageChange = new EventEmitter<PageEvent>();

	/**
	 * Emit the page event.
	 * @param event The page event.
	 */
	public onPageChange(event: PageEvent): void {
		this.pageChange.emit(event);
	}

	public constructor() {
		this.params = {};
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['animeList']) {
			this.dataSource.data = [...this.animeList];
		}
	}

	/** This informs the table how to uniquely identify rows to track how the data changes with each update.
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
		'Japanese Title',
		'Broadcasted Date',
		'Type',
		'Status',
	];
}
