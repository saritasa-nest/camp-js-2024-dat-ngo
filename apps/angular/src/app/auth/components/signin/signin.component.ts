import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators, ReactiveFormsModule, NonNullableFormBuilder, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Login } from '@js-camp/core/models/login';
import { BehaviorSubject, catchError, finalize, take, throwError } from 'rxjs';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { Router } from '@angular/router';
import { PATHS } from '@js-camp/core/utils/paths';
import { NotificationService } from '@js-camp/angular/core/services/notification.service';
import { PasswordInputComponent } from '../password-input/password-input.component';
import { FormErrorService } from '@js-camp/angular/core/services/form-error.service';

/** Signin. */
@Component({
	selector: 'camp-authorization-form',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatInputModule,
		MatFormFieldModule,
		MatIconModule,
		PasswordInputComponent,
	],
	templateUrl: './signin.component.html',
	styleUrl: './signin.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
	private readonly userService = inject(UserService);

	private readonly formErrorService = inject(FormErrorService);

	private readonly router = inject(Router);

	private readonly notificationService = inject(NotificationService);

	/** Loading state. */
	protected readonly isLoading$ = new BehaviorSubject(false);

	private formBuilder = inject(NonNullableFormBuilder);

	/** Password hide signal. */
	protected hide = signal(true);

	/** Signin form builder .*/
	protected readonly signInForm = this.formBuilder.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, Validators.minLength(8)]],
	});

		/** Display error. */

		protected shouldShowError(controlName: string): boolean {
			const formControl = this.signInForm.get(controlName) as FormControl;
			return this.formErrorService.shouldShowError(formControl);
		}

		protected getErrorMessage(controlName: string): string | null {
			const data = this.signInForm.get(controlName);
			if (data == null) {
				return null;
			}
			return this.formErrorService.getErrorMessage(data);
		}

	/** Onsubmit signin form. */
	protected onSubmit(): void {
		this.signInForm.markAllAsTouched();
		if (this.signInForm.invalid) {
			return;
		}
		this.isLoading$.next(true);
		const credentials = new Login(this.signInForm.getRawValue());

		this.userService
			.login(credentials)
			.pipe(
				take(1),
				catchError((error) => {
					return throwError(() => this.notificationService.showMessage(error, 'DISMISS'));
				}),
				finalize(() => {
					this.isLoading$.next(false);
				})
			)
			.subscribe({
				next: () => {
					this.router.navigate([PATHS.home]);
				},
			});
	}
}
