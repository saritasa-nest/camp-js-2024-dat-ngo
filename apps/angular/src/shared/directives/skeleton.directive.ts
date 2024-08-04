import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[appSkeletonLoader]',
	standalone: true,
})
export class SkeletonLoaderDirective {
	private isLoading: boolean | null = false;

	constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}

	@Input() set appSkeletonLoader(loading: boolean | null) {
		this.isLoading = loading;
		this.updateView();
	}

	private updateView(): void {
		this.viewContainer.clear();
		if (this.isLoading) {
			this.viewContainer.createEmbeddedView(this.templateRef);
		}
	}
}
