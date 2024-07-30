import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, ViewChild } from '@angular/core';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { EmptyPipe } from '@js-camp/angular/core/pipes/empty.pipe';
import { Pagination } from '@js-camp/core/models/pagination';
import { Anime } from '@js-camp/core/models/anime.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { UrlParamsService } from '@js-camp/angular/core/services/url-param.service';
import { AnimeQueryParams } from '@js-camp/core/models/url-query';

import { PaginatorComponent } from '../../../paginator/paginator.component';
import { AnimeCatalogComponent } from '../anime-catalog.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { AnimeType } from '@js-camp/core/models/anime-type';
import { MatSelectModule } from '@angular/material/select';
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
export class AnimeTableComponent implements OnInit {
	/** Anime response observable.  */
	protected animePage$: Observable<Pagination<Anime>>;

	protected params: Partial<AnimeQueryParams.Combined>;

	private readonly animeService = inject(AnimeService);

	private readonly urlService = inject(UrlParamsService);

	/** An array of available anime types to choose from. */
	protected readonly selectTypes = Object.values(AnimeType);

	@ViewChild(MatPaginator) paginator!: MatPaginator;

	@ViewChild(MatSort) protected sort!: MatSort;

	protected pageSize: number | null = null;

	protected pageNumber: number | null = null;

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

	protected onSearch(): void {
		const newParams: Partial<AnimeQueryParams.Combined> = {
			...this.params,
			pageNumber: 0,
		};
		this.params = newParams;
		this.urlService.updateCombinedQueryParams(this.params);
	}

	protected onSelectType(): void {
		const newParams: Partial<AnimeQueryParams.Combined> = {
			...this.params,
			pageNumber: 0,
		};
		this.params = newParams;
		this.urlService.updateCombinedQueryParams(this.params);
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
