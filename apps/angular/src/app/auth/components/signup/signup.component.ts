import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormErrorService } from '@js-camp/angular/core/services/form-error.service';
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
	protected formErrors: { [key: string]: string | null } = {};

	public constructor(private formBuilder: FormBuilder) {}

	protected profileForm = this.formBuilder.group({
		email: ['', [Validators.required, Validators.email]],
		firstName: ['', [Validators.required, Validators.maxLength(30)]],
		lastName: ['', [Validators.required, Validators.maxLength(30)]],
		passwordGroup: this.formBuilder.group({
			password: ['', [Validators.required, Validators.minLength(8)]],
			reTypePassword: ['', [Validators.required, Validators.minLength(8)]],
		}),
	});

	protected onSubmit() {
		if (this.profileForm.valid) {
			// Handle form submission
			console.warn('Form submitted successfully!', this.profileForm.value);
		} else {
			this.formErrors = this.formErrorService.getFormErrors(this.profileForm);
			console.warn('Form is invalid', this.formErrors);
		}
	}
}
