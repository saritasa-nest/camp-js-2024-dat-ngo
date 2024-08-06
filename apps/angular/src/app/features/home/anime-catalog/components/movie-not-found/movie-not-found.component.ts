import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'camp-movie-not-found',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './movie-not-found.component.html',
	styleUrl: './movie-not-found.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieNotFoundComponent {}
