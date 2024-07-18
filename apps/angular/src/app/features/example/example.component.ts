// // import { Component } from '@angular/core';

// // /** Example component. */
// // @Component({
// // 	selector: 'camp-example',
// // 	templateUrl: './example.component.html',
// // 	styleUrls: ['./example.component.css'],
// // 	standalone: true,
// // })
// // export class ExampleComponent {}

// import { Component, inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { Observable } from 'rxjs';
// import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
// import { AnimeDto } from '@js-camp/angular/core/dtos/anime.dto';
// import { Anime } from '@js-camp/angular/core/models/anime.model';
// import { AnimeService } from '@js-camp/angular/core/services/anime.service';

// @Component({
// 	selector: 'camp-example',
// 	standalone: true,
// 	imports: [CommonModule],
// 	template: `
// 		<div *ngIf="data$ | async as data">
// 			<pre>{{ data | json }}</pre>
// 		</div>
// 	`,
// })
// export class ExampleComponent {
// 	private readonly animeService = inject(AnimeService);
// 	readonly data$: Observable<PaginationDto<Anime>>;
// 	protected animeLists: Anime[] = [];
// 	public constructor() {
// 		this.data$ = this.animeService.getAllAnime();
// 		this.data$.subscribe((res) => {
// 			this.animeLists = [...res.results];
// 			console.log(this.animeLists);
// 		});
// 	}
// }

import { Component, inject, OnInit } from '@angular/core';
import { Anime } from '@js-camp/angular/core/models/anime.model';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Genre } from '@js-camp/core/models/genre';
import { OmitImmerable } from '@js-camp/core/models/immerable';
import produce from 'immer';
/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
	selector: 'camp-example',
	styleUrl: 'example.component.css',
	// templateUrl: 'example.component.html',
	template: 'hello',
	standalone: true,
	imports: [MatTableModule],
})
export class ExampleComponent {
	public constructor() {
		const initialGenreData = {
			id: 1,
			name: 'Science Fiction',
		};

		const genre = new Genre(initialGenreData);

		console.log('Initial Genre:', genre);

		// Function to mutate genre name using Immer
		const updatedGenre = produce(genre, (draft) => {
			draft.name = 'Fantasy';
		});

		console.log('Updated Genre:', updatedGenre);

		// Demonstrating the use of OmitImmerable
		type GenreWithoutImmerable = OmitImmerable<Genre>;
		const plainGenre: GenreWithoutImmerable = {
			id: genre.id,
			name: genre.name,
		};

		console.log('Plain Genre:', plainGenre);
	}
}
// export class ExampleComponent implements OnInit {
// 	private readonly animeService = inject(AnimeService);

// 	public dataSource = new MatTableDataSource<Anime>();

// 	public constructor() {}

// 	ngOnInit(): void {
// 		this.animeService.getAllAnime().subscribe((res) => {
// 			this.dataSource.data = [...res.results];
// 			console.log(1, this.dataSource);
// 		});
// 		console.log(2, this.dataSource);
// 	}

// 	displayedColumns: string[] = ['Image', 'English Title', 'Japanese Title', 'Broadcasted Date', 'Type', 'Status'];
// }
