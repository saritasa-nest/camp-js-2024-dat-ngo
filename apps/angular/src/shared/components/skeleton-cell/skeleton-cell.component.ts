import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

import { SkeletonDirective } from '@js-camp/angular/shared/directives/skeleton.directive';

/** Table component content. */
@Component({
	selector: 'camp-skeleton-cell',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [SkeletonDirective, CommonModule],
	templateUrl: './skeleton-cell.component.html',
	styleUrls: ['./skeleton-cell.component.css'],
})
export class SkeletonCellComponent {
	/** Whether cell is loading or not. */
	@Input()
	public isLoading: boolean | null = false;
}
