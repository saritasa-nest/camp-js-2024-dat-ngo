import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimeTableComponent } from './anime-table/anime-table.component';

/** Home component. */
@Component({
	selector: 'camp-home',
	styleUrl: 'home.component.css',
	templateUrl: 'home.component.html',
	standalone: true,
	imports: [AnimeTableComponent, CommonModule],
})
export class HomeComponent {
}
