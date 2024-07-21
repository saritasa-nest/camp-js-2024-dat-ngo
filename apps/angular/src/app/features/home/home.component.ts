import { Component, inject } from '@angular/core';
import { AnimeResponse, AnimeService } from '@js-camp/angular/core/services/anime.service';
import { CommonModule } from '@angular/common';

import { Observable } from 'rxjs';

import { AnimeTableComponent } from '../anime-table/anime-table.component';

/** Home component. */
@Component({
	selector: 'camp-home',
	styleUrl: 'home.component.css',
	templateUrl: 'home.component.html',
	standalone: true,
	imports: [AnimeTableComponent, CommonModule],
})
export class HomeComponent {
	/** Anime response observable.  */
	protected readonly animeResponse$: Observable<AnimeResponse>;

	private readonly animeService: AnimeService = inject(AnimeService);

	public constructor() {
		this.animeResponse$ = this.animeService.getAllAnime();
	}
}
