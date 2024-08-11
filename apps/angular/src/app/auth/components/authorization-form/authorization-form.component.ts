import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Login } from '@js-camp/core/models/login';
import { AuthApiService } from '@js-camp/angular/core/services/auth-api.service';
import { map, Observable } from 'rxjs';
import { UserSecret } from '@js-camp/core/models/user-secret';
import { UserService } from '@js-camp/angular/core/services/user.service';
@Component({
	selector: 'camp-authorization-form',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatIconModule],
	templateUrl: './authorization-form.component.html',
	styleUrl: './authorization-form.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorizationFormComponent {
	private readonly authService = inject(UserService);
	// private readonly AuthObservable: Observable<UserSecret>;

	protected profileForm = this.formBuilder.group({
		email: ['', Validators.required],
		password: ['', Validators.required],
	});

	public constructor(private formBuilder: NonNullableFormBuilder) {}

	protected onSubmit() {
		// TODO: Use EventEmitter with form value
		// console.warn(this.profileForm.getRawValue());
		const credentials = new Login(this.profileForm.getRawValue());
		console.log(credentials);
		console.log(typeof credentials);
		this.authService.login(credentials).subscribe();
	}

	protected hide = signal(true);

	protected clickEvent(event: MouseEvent) {
		this.hide.set(!this.hide());
		event.stopPropagation();
	}
}
