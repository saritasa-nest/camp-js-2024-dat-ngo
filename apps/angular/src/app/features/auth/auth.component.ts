import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/** Auth Component. */
@Component({
	selector: 'camp-auth',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './auth.component.html',
	styleUrl: './auth.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {}
