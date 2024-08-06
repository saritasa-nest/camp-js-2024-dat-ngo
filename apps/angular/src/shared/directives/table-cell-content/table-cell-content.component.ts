import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

import { SkeletonDirective } from '../skeleton.directive';

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
	@Input() width = '100%'; // Default width

	@Input() height = 24; // Default height

	/** Whether cell is loading or not. */
	@Input()
	public isLoading: boolean | null = false;
}
