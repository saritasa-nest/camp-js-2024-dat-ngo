import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AnimeTableComponent } from './components/anime-table/anime-table.component';

/** Home component. */
@Component({
	selector: 'camp-home',
	styleUrl: 'home.component.css',
	templateUrl: 'home.component.html',
	standalone: true,
	imports: [AnimeTableComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
}
