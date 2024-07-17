// import { Component } from '@angular/core';

// /** Example component. */
// @Component({
// 	selector: 'camp-example',
// 	templateUrl: './example.component.html',
// 	styleUrls: ['./example.component.css'],
// 	standalone: true,
// })
// export class ExampleComponent {}

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeDto } from '@js-camp/angular/core/dtos/anime.dto';
import { Anime } from '@js-camp/angular/core/models/anime.model';

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
	data$: Observable<PaginationDto<Anime>>;

	constructor(private http: HttpClient) {
		this.data$ = this.fetchData().pipe();
	}

	fetchData(): Observable<PaginationDto<AnimeDto>> {
		return this.http.get<PaginationDto<AnimeDto>>('https://api.camp-js.saritasa.rocks/api/v1/anime/anime/');
	}
}
