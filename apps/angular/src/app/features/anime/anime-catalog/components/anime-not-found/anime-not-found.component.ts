import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Anime not found. */
@Component({
	selector: 'camp-anime-not-found',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './anime-not-found.component.html',
	styleUrl: './anime-not-found.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AnimeNotFoundComponent {}
