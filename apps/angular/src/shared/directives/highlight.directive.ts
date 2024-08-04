import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTable } from '@angular/material/table';

@Directive({
	selector: '[appLoadingMatTable]',
	standalone: true,
})
export class LoadingMatTableDirective implements OnChanges {
	@Input() loading: boolean | null = false;
	@Input() skeletonRows: number = 3;
	private originalData: any[] = [];

	constructor(private matTable: MatTable<any>) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['loading']) {
			this.toggleLoadingState(this.loading);
		}
	}

	private toggleLoadingState(isLoading: boolean | null): void {
		if (isLoading) {
			this.showSkeletonRows();
		} else {
			this.hideSkeletonRows();
		}
	}

	private showSkeletonRows(): void {
		// Logic to display skeleton rows
		const data = Array(this.skeletonRows).fill({});
		this.matTable.dataSource = data;
		// Additional styling or placeholder text can be added here
	}

	private hideSkeletonRows(): void {
		// Logic to clear skeleton rows and restore original data
		this.matTable.dataSource = this.originalData;
		// Reset to original data source if necessary
	}
}
