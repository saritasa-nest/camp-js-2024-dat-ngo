import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
	selector: 'app-skeleton-cell',
	template: `<div class="skeleton-cell" [ngStyle]="{ width: width, height: height }"></div>`,
	styleUrls: ['./skeleton-cell.component.css'],
	standalone: true,
	imports: [CommonModule],
})
export class SkeletonCellComponent {
	@Input() width: string = '100px';
	@Input() height: string = '20px';
}
