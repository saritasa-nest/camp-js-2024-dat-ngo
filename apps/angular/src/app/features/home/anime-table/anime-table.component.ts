import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, ViewChild } from '@angular/core';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { catchError, map, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { EmptyPipe } from '@js-camp/angular/core/pipes/empty.pipe';
import { Pagination } from '@js-camp/core/models/pagination';
import { Anime } from '@js-camp/core/models/anime.model';
import { MatPaginator } from '@angular/material/paginator';

import { PaginatorComponent } from '../../paginator/paginator.component';
import { DataService } from '@js-camp/angular/core/services/pagination-anime.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

/** Create anime table componet.*/
@Component({
	selector: 'camp-anime-table',
	standalone: true,
	imports: [MatTableModule, CommonModule, EmptyPipe, AsyncPipe, PaginatorComponent, MatPaginator],
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent {
	/** Anime response observable.  */
	protected animePage$: Observable<Pagination<Anime>>;

	// private readonly animeService = inject(AnimeService);

	private readonly animePaginatorService = inject(DataService);

	protected paginatorForm: FormGroup;

	private route = inject(Router);

	protected resultsLength = 0;

	protected isLoading = true;

	@ViewChild(MatPaginator) paginator!: MatPaginator;

	public constructor(private fb: FormBuilder) {
		// this.animePage$ = this.animePaginatorService.getPaginatorAnime(0, 100);
		this.paginatorForm = this.fb.group({
			pageIndex: [0],
			pageSize: [10],
		});

		this.animePage$ = this.paginatorForm.valueChanges.pipe(
			startWith(this.paginatorForm.value),
			tap(() => (this.isLoading = true)),
			switchMap((value) => {
				console.log(value);
				const offset = value.pageIndex * value.pageSize;
				const limit = value.pageSize;
				return this.animePaginatorService.getPaginatorAnime(offset, limit);
			}),
			map((data) => {
				this.resultsLength = data.totalCount;
				this.isLoading = false;
				return data;
			})
			// catchError(() => {
			//   return of([]);
			// })
		);
	}

	onPageChange(event: any) {
		this.paginatorForm.patchValue({
			pageIndex: event.pageIndex,
			pageSize: event.pageSize,
		});
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
