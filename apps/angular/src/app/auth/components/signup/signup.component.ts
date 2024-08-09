import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
	selector: 'camp-signup',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule],
	templateUrl: './signup.component.html',
	styleUrl: './signup.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
	public constructor(private formBuilder: FormBuilder) {}

	protected profileForm = this.formBuilder.group({
		email: ['', Validators.required],
		firstName: ['', Validators.required],
		lastName: ['', Validators.required],
		password: [''],
		reTypePassword: [''],
	});

	protected onSubmit() {
		// TODO: Use EventEmitter with form value
		console.warn(this.profileForm.value);
	}
}
