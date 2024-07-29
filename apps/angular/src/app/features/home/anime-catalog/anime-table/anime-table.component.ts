import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
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
	],
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent {
	/** Anime response observable.  */
	protected animePage$: Observable<Pagination<Anime>>;

	private readonly animeService = inject(AnimeService);

	private readonly urlService = inject(UrlParamsService);

	@ViewChild(MatPaginator) paginator!: MatPaginator;

	public constructor() {
		this.animePage$ = this.animeService.getAllAnime();
	}

	protected onPageChange(event: PageEvent): void {
		const searchParams: Partial<AnimeQueryParams.Combined> = {
			pageNumber: event.pageIndex,
			pageSize: event.pageSize,
		};
		this.urlService.updateCombinedQueryParams(searchParams);
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
