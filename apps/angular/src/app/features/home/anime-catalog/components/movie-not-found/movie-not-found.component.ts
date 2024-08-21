import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Anime not found. */
@Component({
	selector: 'camp-movie-not-found',
	standalone: true,
	imports: [],
	templateUrl: './movie-not-found.component.html',
	styleUrl: './movie-not-found.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieNotFoundComponent {}
