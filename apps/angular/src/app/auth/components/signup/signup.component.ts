import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormErrorService } from '@js-camp/angular/core/services/form-error.service';
import { Router } from '@angular/router';
import { Registration } from '@js-camp/core/models/registration';
import { BehaviorSubject, catchError, finalize, take, throwError } from 'rxjs';
import { PATHS } from '@js-camp/core/utils/paths';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { PasswordInputComponent } from '../password-input/password-input.component';

/** Sign up.*/
@Component({
	selector: 'camp-signup',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, PasswordInputComponent],
	templateUrl: './signup.component.html',
	styleUrl: './signup.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
	private readonly formErrorService = inject(FormErrorService);

	private readonly authService = inject(UserService);

	private readonly router = inject(Router);

	/** Form errors. */
	protected formErrors: { [key: string]: string | null } = {};

	private readonly destroyRef = inject(DestroyRef);

	public constructor(private formBuilder: NonNullableFormBuilder) {}

	/** Sign Up Form. */
	protected signUpForm = this.formBuilder.group({
		email: ['', [Validators.required, Validators.email, Validators.maxLength(5)]],
		firstName: ['', [Validators.required, Validators.maxLength(30)]],
		lastName: ['', [Validators.required, Validators.maxLength(30)]],
		passwordGroup: this.formBuilder.group({
			password: ['', [Validators.required, Validators.minLength(8)]],
			reTypePassword: ['', [Validators.required, Validators.minLength(8)]],
		}),
	});

	/** Loading state. */
	protected readonly isLoading$ = new BehaviorSubject<boolean>(false);

	/** Display error. */

	protected shouldShowError(controlName: string): boolean {
		return this.formErrorService.shouldShowError(this.signUpForm, controlName);
	}

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
		if (this.signUpForm.valid) {
			console.log(this.signUpForm.getRawValue());
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
						console.log(this.formErrors);
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
		} else {
			this.formErrors = this.formErrorService.getFormErrors(this.signUpForm);
			console.warn('Form is invalid', this.formErrors);
		}
	}
}
