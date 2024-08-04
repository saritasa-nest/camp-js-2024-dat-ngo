import { Directive, Input, TemplateRef, ViewContainerRef, OnChanges, SimpleChanges } from '@angular/core';
import { SkeletonCellComponent } from '@js-camp/angular/app/skeleton-cell/skeleton-cell.component';

@Directive({
	selector: '[appSkeletonLoader]',
	standalone: true,
})
export class SkeletonLoaderDirective implements OnChanges {
	@Input() appSkeletonLoader: boolean | null = false;
	@Input() cellSizes: { [key: string]: { width: string; height: string } } = {};
	@Input() displayedColumns: string[] = [];

	private hasView = false;

	constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}

	ngOnChanges(changes: SimpleChanges): void {
		this.updateView();
	}

	private updateView(): void {
		this.viewContainer.clear();
		if (this.appSkeletonLoader && !this.hasView) {
			this.createSkeletonCells();
			this.hasView = true;
		} else if (!this.appSkeletonLoader && this.hasView) {
			this.viewContainer.createEmbeddedView(this.templateRef);
			this.hasView = false;
		}
	}

	private createSkeletonCells(): void {
		const rows = 5; // Number of skeleton rows to display

		for (let i = 0; i < rows; i++) {
			const rowElement = document.createElement('div');
			rowElement.classList.add('skeleton-row');

			this.displayedColumns.forEach((column) => {
				const { width, height } = this.cellSizes[column] || { width: '100px', height: '20px' };
				const componentRef = this.viewContainer.createComponent<SkeletonCellComponent>(SkeletonCellComponent);

				componentRef.instance.width = width;
				componentRef.instance.height = height;

				rowElement.appendChild(componentRef.location.nativeElement);
			});

			this.viewContainer.element.nativeElement.appendChild(rowElement);
		}
	}
}
