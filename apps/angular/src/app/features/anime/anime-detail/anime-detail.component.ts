import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { BehaviorSubject, defer, finalize, Observable, of, tap } from 'rxjs';
import { AnimeDetail } from '@js-camp/core/models/anime-detail';
import { MatCardModule } from '@angular/material/card';
import { EmptyPipe } from '@js-camp/angular/core/pipes/empty.pipe';
import { MatTabsModule } from '@angular/material/tabs';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { SkeletonCellComponent } from '@js-camp/angular/shared/components/skeleton-cell/skeleton-cell.component';

import { MovieNotFoundComponent } from '../anime-catalog/components/movie-not-found/movie-not-found.component';

import { AnimeDetailInformationComponent } from './anime-detail-information/anime-detail-information.component';

const EMBEDDED_LINK = 'https://www.youtube.com/embed/';

/** Anime detail. */
@Component({
	selector: 'camp-anime-detail',
	standalone: true,
	imports: [
		CommonModule,
		MatCardModule,
		EmptyPipe,
		MatTabsModule,
		AnimeDetailInformationComponent,
		MovieNotFoundComponent,
		SkeletonCellComponent,
	],
	templateUrl: './anime-detail.component.html',
	styleUrl: './anime-detail.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailComponent {
	private readonly route = inject(ActivatedRoute);

	private readonly animeService = inject(AnimeService);

	private readonly animeId = this.route.snapshot.paramMap.get('id');

	private readonly domSanitizer = inject(DomSanitizer);

	/** Anime detail. */
	protected readonly animeDetail$: Observable<AnimeDetail | null>;

	/** Loading state. */
	protected readonly isLoading$ = new BehaviorSubject(true);

	/**
	 * Get anime trailer based on its id.
	 * @param id Anime id.
	 */
	protected getAnimeTrailerUrl(id: AnimeDetail['trailerYoutubeId'] | undefined): SafeResourceUrl {
		return this.domSanitizer.bypassSecurityTrustResourceUrl(`${EMBEDDED_LINK}${id}`);
	}

	/** Skeleton details array. */
	protected skeletonDetailsArray = Array(7);

	public constructor() {
		console.log('hello:', this.animeId);
		this.animeDetail$ = defer(() => (this.animeId ? this.animeService.getAnimeDetail(this.animeId) : of(null)))
			.pipe(tap((data) => console.log(data)))
			.pipe(finalize(() => this.isLoading$.next(false)));
	}
}
