import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Anime not found. */
@Component({
	selector: 'camp-movie-not-found',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './movie-not-found.component.html',
	styleUrl: './movie-not-found.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieNotFoundComponent {}
