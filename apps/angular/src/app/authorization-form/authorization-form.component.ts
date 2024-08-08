import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'camp-authorization-form',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './authorization-form.component.html',
	styleUrl: './authorization-form.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorizationFormComponent {}
