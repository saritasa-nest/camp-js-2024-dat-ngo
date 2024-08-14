import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormErrorService } from '@js-camp/angular/core/services/form-error.service';
import { AuthApiService } from '@js-camp/angular/core/services/auth-api.service';
import { Router } from '@angular/router';
import { Registration } from '@js-camp/core/models/registration';
import { BehaviorSubject, catchError, finalize, take, throwError } from 'rxjs';
import { PATHS } from '@js-camp/core/utils/paths';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
	selector: 'camp-signup',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule],
	templateUrl: './signup.component.html',
	styleUrl: './signup.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
	private formErrorService = inject(FormErrorService);
	private authService = inject(UserService);
	private router = inject(Router);
	protected formErrors: { [key: string]: string | null } = {};
	private readonly destroyRef = inject(DestroyRef);

	public constructor(private formBuilder: NonNullableFormBuilder) {}

	protected profileForm = this.formBuilder.group({
		email: ['', [Validators.required, Validators.email]],
		firstName: ['', [Validators.required, Validators.maxLength(30)]],
		lastName: ['', [Validators.required, Validators.maxLength(30)]],
		passwordGroup: this.formBuilder.group({
			password: ['', [Validators.required, Validators.minLength(8)]],
			reTypePassword: ['', [Validators.required, Validators.minLength(8)]],
		}),
	});

	/** Loading state. */
	protected readonly isLoading$ = new BehaviorSubject<boolean>(false);

	protected onSubmit() {
		if (this.profileForm.valid) {
			const formRawValue = this.profileForm.getRawValue();
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
					catchError((error) => {
						this.formErrors = this.formErrorService.getFormErrors(this.profileForm);
						console.error('Registration failed:', error);
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
					error: (error) => {
						return throwError(() => error);
					},
				});
		} else {
			this.formErrors = this.formErrorService.getFormErrors(this.profileForm);
			console.warn('Form is invalid', this.formErrors);
		}
	}
}
