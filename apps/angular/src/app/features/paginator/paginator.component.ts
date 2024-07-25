import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Anime } from '@js-camp/core/models/anime.model';

/**
 *Paginator.
 */
@Component({
	selector: 'camp-paginator',
	standalone: true,
	imports: [CommonModule, MatPaginatorModule],
	templateUrl: './paginator.component.html',
	styleUrl: './paginator.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
	protected readonly length = 100;

	protected readonly pageSize = 25;

	protected readonly pageSizeOptions = [5, 10, 25, 100];

	@Input() data!: readonly Anime[];
}
