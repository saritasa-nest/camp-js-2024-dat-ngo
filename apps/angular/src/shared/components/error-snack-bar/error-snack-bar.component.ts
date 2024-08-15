import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
	selector: 'camp-error-snack-bar',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './error-snack-bar.component.html',
	styleUrl: './error-snack-bar.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorSnackBarComponent {
	constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
