// import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

// @Directive({
// 	selector: '[appSkeletonLoader]',
// 	standalone: true,
// })
// export class SkeletonLoaderDirective {
// 	private hasView = false;

// 	@Input() set appSkeletonLoader(isLoading: boolean | null) {
// 		if (isLoading && !this.hasView) {
// 			this.viewContainer.clear();
// 			this.viewContainer.createEmbeddedView(this.templateRef);
// 			this.hasView = true;
// 		} else if (!isLoading && this.hasView) {
// 			this.viewContainer.clear();
// 			this.hasView = false;
// 		}
// 	}

// 	constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}
// }
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[appSkeletonLoader]',
	standalone: true,
})
export class SkeletonLoaderDirective {
	private hasView = false;

	@Input() set appSkeletonLoader(isLoading: boolean | null) {
		if (isLoading && !this.hasView) {
			this.viewContainer.clear();
			this.viewContainer.createEmbeddedView(this.templateRef, {
				$implicit: { height: this.height, width: this.width },
			});
			this.hasView = true;
		} else if (!isLoading && this.hasView) {
			this.viewContainer.clear();
			this.hasView = false;
		}
	}

	@Input() height: string | null = '100px';
	@Input() width: string | null = '100px';

	constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}
}
