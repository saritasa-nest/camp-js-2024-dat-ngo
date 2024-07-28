import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'camp-anime-catalog',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './anime-catalog.component.html',
	styleUrl: './anime-catalog.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeCatalogComponent {}
