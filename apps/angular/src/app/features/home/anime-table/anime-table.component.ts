import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, ViewChild } from '@angular/core';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { catchError, combineLatest, map, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { EmptyPipe } from '@js-camp/angular/core/pipes/empty.pipe';
import { Pagination } from '@js-camp/core/models/pagination';
import { Anime } from '@js-camp/core/models/anime.model';
import { MatPaginator } from '@angular/material/paginator';

import { PaginatorComponent } from '../../paginator/paginator.component';
import { DataService } from '@js-camp/angular/core/services/pagination-anime.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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

	private router = inject(Router);

	private route = inject(ActivatedRoute);

	protected resultsLength = 0;

	protected isLoading = true;

	@ViewChild(MatPaginator) paginator!: MatPaginator;

	public constructor(private fb: FormBuilder) {
		const initialOffset = +(this.route.snapshot.queryParamMap.get('offset') ?? 0);
		const initialLimit = +(this.route.snapshot.queryParamMap.get('limit') ?? 10);
		this.paginatorForm = this.fb.group({
			offset: initialOffset,
			limit: initialLimit,
		});

		const pagination$ = this.paginatorForm.valueChanges.pipe(startWith(this.paginatorForm.value));
		this.animePage$ = combineLatest([pagination$, this.route.queryParamMap]).pipe(
			tap(([pagination]) => {
				this.updateUrl(pagination.offset, pagination.limit);
				this.isLoading = true;
			}),
			switchMap(([pagination]) => {
				console.log(pagination);
				const offset = pagination.offset;
				const limit = pagination.limit;
				return this.animePaginatorService.getPaginatorAnime(offset, limit);
			}),
			map((data) => {
				this.resultsLength = data.totalCount;
				this.isLoading = false;
				return data;
			})
		);

		// this.animePage$ = this.paginatorForm.valueChanges.pipe(
		// 	startWith(this.paginatorForm.value),
		// 	tap(() => (this.isLoading = true)),
		// 	switchMap((value) => {
		// 		console.log(value);
		// 		const offset = value.offset;
		// 		const limit = value.limit;
		// 		return this.animePaginatorService.getPaginatorAnime(offset, limit);
		// 	}),
		// 	map((data) => {
		// 		this.resultsLength = data.totalCount;
		// 		this.isLoading = false;
		// 		return data;
		// 	})
		// 	// catchError(() => {
		// 	//   return of([]);
		// 	// })
		// );
	}

	onPageChange(event: any) {
		this.paginatorForm.patchValue({
			offset: event.pageIndex * event.pageSize,
			limit: event.pageSize,
		});
	}

	/** This informs the table how to uniquely identify rows to track how the data changes with each update.
	 * @param index Index of them Anime on table.
	 * @param item Items on table.
	 */
	protected trackBy(index: number, item: Anime): Anime['id'] {
		return item.id;
	}

	updateUrl(offset: number, limit: number) {
		this.router.navigate([], {
			relativeTo: this.route,
			queryParams: { offset, limit },
			queryParamsHandling: 'merge',
		});
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
