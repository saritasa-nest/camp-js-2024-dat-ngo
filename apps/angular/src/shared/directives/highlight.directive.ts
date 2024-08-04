import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
	selector: '[appHighlight]',
	standalone: true,
})
export class HighlightDirective {
	@Input('appHighlight') highlightColor: string = 'yellow';

	constructor(private el: ElementRef) {}

	@HostListener('mouseenter') onMouseEnter() {
		this.highlight(this.highlightColor || 'yellow');
	}

	@HostListener('mouseleave') onMouseLeave() {
		this.highlight('');
	}

	private highlight(color: string) {
		this.el.nativeElement.style.backgroundColor = color;
	}
}
