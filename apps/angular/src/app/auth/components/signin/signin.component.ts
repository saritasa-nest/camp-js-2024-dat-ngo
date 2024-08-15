import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Login } from '@js-camp/core/models/login';
import { catchError, take, throwError } from 'rxjs';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { Router } from '@angular/router';
import { PATHS } from '@js-camp/core/utils/paths';
import { NotificationService } from '@js-camp/angular/core/services/notification.service';

/** Signin. */
@Component({
	selector: 'camp-authorization-form',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatIconModule],
	templateUrl: './signin.component.html',
	styleUrl: './signin.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
	private readonly userService = inject(UserService);

	private readonly router = inject(Router);

	private readonly notificationService = inject(NotificationService);

	/** Signin form builder .*/
	protected signInForm = this.formBuilder.group({
		email: ['', Validators.required],
		password: ['', Validators.required],
	});

	public constructor(private formBuilder: NonNullableFormBuilder) {}

	/** Onsubmit signin form. */
	protected onSubmit(): void {
		if (this.signInForm.invalid) {
			return;
		}
		const credentials = new Login(this.signInForm.getRawValue());
		this.userService
			.login(credentials)
			.pipe(
				catchError((error) => {
					return throwError(() => this.notificationService.showMessage(error, 'DISMISS'));
				})
			)
			.pipe(take(1))
			.subscribe({
				next: () => {
					this.router.navigate([PATHS.home]);
				},
			});
	}

	/** Password hide signal. */
	protected hide = signal(true);

	/**
	 * Password hide and review click event.
	 * @param event Mouse event.
	 */
	protected clickEvent(event: MouseEvent): void {
		this.hide.set(!this.hide());
		event.stopPropagation();
	}
}
