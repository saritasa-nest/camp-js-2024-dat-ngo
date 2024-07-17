// import { Component } from '@angular/core';

// /** Example component. */
// @Component({
// 	selector: 'camp-example',
// 	templateUrl: './example.component.html',
// 	styleUrls: ['./example.component.css'],
// 	standalone: true,
// })
// export class ExampleComponent {}

import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeDto } from '@js-camp/angular/core/dtos/anime.dto';
import { Anime } from '@js-camp/angular/core/models/anime.model';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';

@Component({
	selector: 'camp-example',
	standalone: true,
	imports: [CommonModule],
	template: `
		<div *ngIf="data$ | async as data">
			<pre>{{ data | json }}</pre>
		</div>
	`,
})
export class ExampleComponent {
	private readonly animeService = inject(AnimeService);
	readonly data$: Observable<PaginationDto<Anime>>;
	protected animeLists: Anime[] = [];
	public constructor() {
		this.data$ = this.animeService.getAllAnime();
		this.data$.subscribe((res) => {
			this.animeLists = [...res.results];
			console.log(this.animeLists);
		});
	}
}
