import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AnimeCatalogComponent } from './anime-catalog/anime-catalog.component';

/** Home component. */
@Component({
	selector: 'camp-anime',
	styleUrl: 'anime.component.css',
	templateUrl: 'anime.component.html',
	standalone: true,
	imports: [AnimeCatalogComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeComponent {}
