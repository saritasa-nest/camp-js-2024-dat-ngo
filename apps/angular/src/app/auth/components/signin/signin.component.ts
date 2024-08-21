import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
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

	private readonly router = inject(Router);

	private readonly notificationService = inject(NotificationService);

	// TODO (Dat Ngo): If we have only one type, we can use like this new BehaviorSubject(false);
	/** Loading state. */
	protected readonly isLoading$ = new BehaviorSubject<boolean>(false);

	// TODO (Dat Ngo): We should add readonly here.
	/** Signin form builder .*/
	protected signInForm = this.formBuilder.group({
		email: ['', Validators.required],
		password: ['', [Validators.required, Validators.minLength(8)]],
	});

	// TODO (Dat Ngo): We should use new approach.
	public constructor(private formBuilder: NonNullableFormBuilder) {}

	/** Onsubmit signin form. */
	protected onSubmit(): void {
		// TODO (Dat Ngo): We should mark form as touched here.
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

	// TODO (Dat Ngo): We should move variables above the constructor.
	/** Password hide signal. */
	protected hide = signal(true);

	// TODO (Dat Ngo): https://wiki.saritasa.rocks/frontend/languages/ts-js/naming
	// TODO (Dat Ngo): We should remove redundant code.
	/**
	 * Password hide and review click event.
	 * @param event Mouse event.
	 */
	protected clickEvent(event: MouseEvent): void {
		this.hide.set(!this.hide());
		event.stopPropagation();
	}
}
