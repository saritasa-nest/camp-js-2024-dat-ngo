import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators, ReactiveFormsModule, NonNullableFormBuilder, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Login } from '@js-camp/core/models/login';
import { BehaviorSubject, catchError, finalize, take, tap, throwError } from 'rxjs';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { Router, RouterLink } from '@angular/router';
import { PATHS } from '@js-camp/core/utils/paths';
import { NotificationService } from '@js-camp/angular/core/services/notification.service';

import { FormErrorService } from '@js-camp/angular/core/services/form-error.service';
import {
	PASSWORD_MIN_LENGTH,
	PASSWORD_MAX_LENGTH,
	EMAIL_MIN_LENGTH,
	EMAIL_MAX_LENGTH,
} from '@js-camp/angular/shared/constant';

import { errorGuard } from '@js-camp/angular/core/guards/error-guard';

import { PasswordInputComponent } from '../password-input/password-input.component';

/** Signin component. */
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
		RouterLink,
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

	private readonly formBuilder = inject(NonNullableFormBuilder);

	/** Loading state. */
	protected readonly isLoading$ = new BehaviorSubject(false);

	/** Password hide signal. */
	protected readonly hide = signal(true);

	/** Signin form builder .*/
	protected readonly signInForm = this.formBuilder.group({
		email: this.formBuilder.control('', [
				Validators.required,
				Validators.email,
				Validators.minLength(EMAIL_MIN_LENGTH),
				Validators.maxLength(EMAIL_MAX_LENGTH),
			]),
		password: [
			'',
			[Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH), Validators.maxLength(PASSWORD_MAX_LENGTH)],
		],
	});

	/**
	 * Display error.
	 * @param controlName Name of the control.
	 * @returns Should show error of control field.
	 */
	protected shouldShowError(controlName: string): boolean {
		const formControl = this.signInForm.get(controlName) as FormControl;
		return this.formErrorService.shouldShowError(formControl);
	}

	/**
	 *	Get Error message.
	 * @param controlName Name of the control.
	 * @returns The error message.
	 */
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
		const credentials = new Login(this.signInForm.getRawValue());

		this.userService
			.login(credentials)
			.pipe(
				tap(() => this.isLoading$.next(true)),
				take(1),
				catchError((error: unknown) =>
					throwError(() => {
						if (errorGuard(error)) {
							this.notificationService.showMessage(error, 'DISMISS');
						}
						return error;
					})),
				finalize(() => {
					this.isLoading$.next(false);
				}),
			)
			.subscribe(() => this.router.navigate([PATHS.home]));
	}
}
