import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

import { SkeletonDirective } from '../../directives/skeleton.directive';

/** Table component content. */
@Component({
	selector: 'app-table-cell-content',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [SkeletonDirective, CommonModule],
	templateUrl: './table-cell-content.component.html',
	styleUrls: ['./table-cell-content.component.css'],
})
export class TableCellContentComponent {
	/** Whether cell is loading or not. */
	@Input()

	public isLoading: boolean | null = false;
}
