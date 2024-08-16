import { Component, inject, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormErrorService } from '@js-camp/angular/core/services/form-error.service';

@Component({
	selector: 'camp-password-input',
	templateUrl: './password-input.component.html',
	styleUrls: ['./password-input.component.css'],
	imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
	standalone: true,
})
export class PasswordInputComponent {
	@Input() label: string = '';
	@Input() type: string = 'text';
	@Input() formControl = new FormControl();
	protected readonly formErrorService = inject(FormErrorService)

	protected getErrorMessage(): string | null {
		return this.formErrorService.getErrorMessage(this.formControl);
	}
}
