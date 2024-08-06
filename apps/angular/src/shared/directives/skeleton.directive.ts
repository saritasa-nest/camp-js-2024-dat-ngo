import { Directive, ElementRef, Renderer2 } from '@angular/core';

/** Skeleton Cell .*/
@Directive({
	selector: '[campcSkeleton]',
	standalone: true,
})
export class SkeletonDirective {
	public constructor(private el: ElementRef, private renderer: Renderer2) {
		this.setSkeletonCellStyle();
	}

	private setSkeletonCellStyle(): void {

		/** Apply skeleton loading styles */
		this.renderer.setStyle(
			this.el.nativeElement,
			'background',
			'linear-gradient(-90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
		);
		this.renderer.setStyle(this.el.nativeElement, 'backgroundSize', '200% 100%');
		this.renderer.setStyle(this.el.nativeElement, 'animation', 'skeleton-loading 1.5s infinite');
		this.renderer.setStyle(this.el.nativeElement, 'borderRadius', '4px');
	}
}
