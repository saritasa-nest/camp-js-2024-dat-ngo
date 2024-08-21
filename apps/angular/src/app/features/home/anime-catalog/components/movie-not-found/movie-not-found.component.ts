import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Anime not found. */
@Component({
	selector: 'camp-movie-not-found',
	standalone: true,

	// TODO (Dat Ngo): We should remove CommonModule if we don't use it.
	imports: [CommonModule],
	templateUrl: './movie-not-found.component.html',
	styleUrl: './movie-not-found.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieNotFoundComponent {}
