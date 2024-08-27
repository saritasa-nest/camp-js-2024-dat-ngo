import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators, ReactiveFormsModule, NonNullableFormBuilder, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormErrorService } from '@js-camp/angular/core/services/form-error.service';
import { Router, RouterLink } from '@angular/router';
import { Registration } from '@js-camp/core/models/registration';
import { BehaviorSubject, catchError, finalize, take, throwError } from 'rxjs';
import { PATHS } from '@js-camp/core/utils/paths';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
	PASSWORD_MIN_LENGTH,
	PASSWORD_MAX_LENGTH,
	EMAIL_MIN_LENGTH,
	EMAIL_MAX_LENGTH,
	NAME_MAX_LENGTH,
} from '@js-camp/angular/shared/constant';

import { mustMatch } from '@js-camp/angular/core/utils/custom-validator';

import { PasswordInputComponent } from '../password-input/password-input.component';

/** Sign up.*/
@Component({
	selector: 'camp-signup',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, PasswordInputComponent, RouterLink],
	templateUrl: './signup.component.html',
	styleUrl: './signup.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
	private readonly formErrorService = inject(FormErrorService);

	private readonly authService = inject(UserService);

	private readonly router = inject(Router);

	private readonly formBuilder = inject(NonNullableFormBuilder);

	private readonly destroyRef = inject(DestroyRef);

	/** Form errors. */
	protected formErrors: { [key: string]: string | null; } = {};

	/** Sign Up Form. */
	protected signUpForm = this.formBuilder.group({
		email: [
			'',
			[
				Validators.required,
				Validators.required,
				Validators.minLength(EMAIL_MIN_LENGTH),
				Validators.maxLength(EMAIL_MAX_LENGTH),
			],
		],
		firstName: ['', [Validators.required, Validators.maxLength(NAME_MAX_LENGTH)]],
		lastName: ['', [Validators.required, Validators.maxLength(NAME_MAX_LENGTH)]],
		passwordGroup: this.formBuilder.group(
			{
				password: [
					'',
					[Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH), Validators.maxLength(PASSWORD_MAX_LENGTH)],
				],
				reTypePassword: [
					'',
					[Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH), Validators.maxLength(PASSWORD_MAX_LENGTH)],
				],
			},
			{ validators: mustMatch('password', 'reTypePassword') },
		),
	});

	/** Loading state. */
	protected readonly isLoading$ = new BehaviorSubject<boolean>(false);

	/** Display error.
	 * @param controlName Name of the control.
	 * @returns Should show error of control field.
	 */
	protected shouldShowError(controlName: string): boolean {
		const formControl = this.signUpForm.get(controlName) as FormControl;
		return this.formErrorService.shouldShowError(formControl);
	}

	/**
	 *	Get Error message.
	 * @param controlName Name of the control.
	 * @returns The error message.
	 */
	protected getErrorMessage(controlName: string): string | null {
		const data = this.signUpForm.get(controlName);
		if (data == null) {
			return null;
		}
		return this.formErrorService.getErrorMessage(data);
	}

	/** Submit form. */
	protected onSubmit(): void {
		this.signUpForm.markAllAsTouched();
		if (this.signUpForm.invalid) {
			return;
		}
		const formRawValue = this.signUpForm.getRawValue();
		const registrationData = {
			email: formRawValue.email,
			password: formRawValue.passwordGroup.password,
			firstName: formRawValue.firstName,
			lastName: formRawValue.lastName,
		};
		this.isLoading$.next(true);

		const credentials = new Registration(registrationData);
		this.authService
			.register(credentials)
			.pipe(
				take(1),
				catchError((error: unknown) => {
					this.formErrors = this.formErrorService.getFormErrors(this.signUpForm);
					return throwError(() => error);
				}),
				finalize(() => {
					this.isLoading$.next(false);
				}),
				takeUntilDestroyed(this.destroyRef)
			)
			.subscribe({
				next: () => {
					this.router.navigate([PATHS.home]);
				},
				error(error: unknown) {
					return throwError(() => error);
				},
			});
	}
}
