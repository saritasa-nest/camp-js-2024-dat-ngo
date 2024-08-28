import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { BehaviorSubject, defer, finalize, Observable, of } from 'rxjs';
import { AnimeDetail } from '@js-camp/core/models/anime-detail';
import { MatCardModule } from '@angular/material/card';
import { EmptyPipe } from '@js-camp/angular/core/pipes/empty.pipe';
import { MatTabsModule } from '@angular/material/tabs';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { SkeletonCellComponent } from '@js-camp/angular/shared/components/skeleton-cell/skeleton-cell.component';

import { MatDialog } from '@angular/material/dialog';

import { AnimeStudioData } from '@js-camp/core/models/anime-studio';

import { MatIcon } from '@angular/material/icon';

import { MovieNotFoundComponent } from '../anime-catalog/components/movie-not-found/movie-not-found.component';

import { AnimeDetailInformationComponent } from './anime-detail-information/anime-detail-information.component';

import { AnimeDetailDialogComponent } from './anime-detail-dialog/anime-detail-dialog.component';

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
		AnimeDetailDialogComponent,
		MatIcon,
	],
	templateUrl: './anime-detail.component.html',
	styleUrl: './anime-detail.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailComponent {
	private readonly route = inject(ActivatedRoute);

	private readonly animeService = inject(AnimeService);

	private readonly domSanitizer = inject(DomSanitizer);

	private readonly matDialog = inject(MatDialog);

	private readonly animeId = this.route.snapshot.paramMap.get('id');

	private readonly location = inject(Location);

	/** Anime detail. */
	protected readonly animeDetail$: Observable<AnimeDetail | null>;

	/** Loading state. */
	protected readonly isLoading$ = new BehaviorSubject(true);

	/** Skeleton details array. */
	protected skeletonDetailsArray = Array(7);

	public constructor() {
		this.animeDetail$ = defer(() => (this.animeId ? this.animeService.getAnimeDetail(this.animeId) : of(null))).pipe(
			finalize(() => this.isLoading$.next(false)),
		);
	}

	/**
	 * Get anime trailer based on its id.
	 * @param id Anime id.
	 */
	protected getAnimeTrailerUrl(id: AnimeDetail['trailerYoutubeId'] | undefined): SafeResourceUrl {
		return this.domSanitizer.bypassSecurityTrustResourceUrl(`${EMBEDDED_LINK}${id}`);
	}

	/**
	 * Gets formatted list.
	 * @param array Array of studios.
	 */
	protected getFormattedList(array: readonly AnimeStudioData[]): string {
		return array.map(item => item.name).join(', ');
	}

	/**
	 * Open image dialog.
	 * @param imageSource Source of image.
	 * @param title Title of Anime.
	 * @param studios Studios of Anime.
	 */
	protected openImageDialog(imageSource: string | null, title: string, studios: string): void {
		this.matDialog.open(AnimeDetailDialogComponent, {
			data: { source: imageSource, title, studios },
			height: '600px',
		});
	}

	/**
	 * Handles a keydown event on a image.
	 * @param event The keyboard event.
	 * @param imageSource Image source.
	 * @param title Japanese title.
	 * @param studios Studios string.
	 */
	protected handleKeydown(event: KeyboardEvent, imageSource: string | null, title: string, studios: string): void {
		if (event.key === 'Enter') {
			this.openImageDialog(imageSource, title, studios);
		}
	}

	/** Go back to the previous page. */
	protected handleGoBack(): void {
		console.log(this.location);
		this.location.back();
	}
}
