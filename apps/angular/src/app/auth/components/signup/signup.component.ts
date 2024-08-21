import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators, ReactiveFormsModule, NonNullableFormBuilder, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormErrorService } from '@js-camp/angular/core/services/form-error.service';
import { Router } from '@angular/router';
import { Registration } from '@js-camp/core/models/registration';
import { BehaviorSubject, catchError, finalize, take, throwError } from 'rxjs';
import { PATHS } from '@js-camp/core/utils/paths';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { mustMatch } from '@js-camp/angular/core/utils/custom-validator';
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

	// TODO (Dat Ngo): We should fix linter errors.
	/** Form errors. */
	protected formErrors: { [key: string]: string | null } = {};

	public constructor(private formBuilder: NonNullableFormBuilder) {}

	/** Sign Up Form. */
	protected signUpForm = this.formBuilder.group({
		email: ['', [Validators.required, Validators.email]],
		firstName: ['', [Validators.required, Validators.maxLength(30)]],
		lastName: ['', [Validators.required, Validators.maxLength(30)]],
		passwordGroup: this.formBuilder.group(
			{
				password: ['', [Validators.required, Validators.minLength(8)]],
				reTypePassword: ['', [Validators.required, Validators.minLength(8)]],
			},
			{
				validators: mustMatch('password', 'reTypePassword'),
				// TODO (Dat Ngo): We should fix linter errors.
			}
		),
	});

	/** Loading state. */
	protected readonly isLoading$ = new BehaviorSubject<boolean>(false);

	// TODO (Dat Ngo): We should fix linter errors.
	// TODO (Dat Ngo): Missing JSDoc comment.
	// TODO (Dat Ngo): There is an empty space below.
	/** Display error. */

	protected shouldShowError(controlName: string): boolean {
		const formControl = this.signUpForm.get(controlName) as FormControl;
		return this.formErrorService.shouldShowError(formControl);
	}

	// TODO (Dat Ngo): We should fix linter errors.
	// TODO (Dat Ngo): Missing JSDoc comment.
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

		// TODO (Dat Ngo): We can avoid nested by this.
		// if (this.signUpForm.invalid) {
		// 	return;
		// }
		if (this.signUpForm.valid) {
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
					// TODO (Dat Ngo): We should fix linter errors.
					})
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
			// TODO (Dat Ngo): We shouldn't leave console in our code.
			console.warn('Form is invalid', this.formErrors);
		}
	}
}
