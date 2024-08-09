import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
@Component({
	selector: 'camp-authorization-form',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatIconModule],
	templateUrl: './authorization-form.component.html',
	styleUrl: './authorization-form.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorizationFormComponent {
	public constructor(private formBuilder: FormBuilder) {}

	protected profileForm = this.formBuilder.group({
		email: ['', Validators.required],
		password: ['', Validators.required],
	});

	protected onSubmit() {
		// TODO: Use EventEmitter with form value
		console.warn(this.profileForm.value);
	}

	protected hide = signal(true);

	protected clickEvent(event: MouseEvent) {
		this.hide.set(!this.hide());
		event.stopPropagation();
	}
}
