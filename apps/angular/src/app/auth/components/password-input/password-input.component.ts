import { Component, forwardRef, inject, Input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormErrorService } from '@js-camp/angular/core/services/form-error.service';
import { MatIcon } from '@angular/material/icon';

@Component({
	selector: 'camp-password-input',
	templateUrl: './password-input.component.html',
	styleUrls: ['./password-input.component.css'],
	imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule,MatIcon],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => PasswordInputComponent),
			multi: true,
		},
	],
	standalone: true,
})
export class PasswordInputComponent implements ControlValueAccessor {
	@Input() label: string = '';

	@Input() type: string = 'password';

	@Input() formControl = new FormControl();

	protected _value: string = '';

	protected readonly formErrorService = inject(FormErrorService);

	// ControlValueAccessor interface methods
	onChange = (value: string) => {};
	onTouched = () => {};

	// Called when the value in the UI needs to be updated
	writeValue(value: string): void {
		this._value = value;
	}

	// Registers a function to call when the control value changes
	registerOnChange(fn: (value: string) => void): void {
		this.onChange = fn;
	}

	// Registers a function to call when the control is touched
	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	onInput(event: Event): void {
		const inputElement = event.target as HTMLInputElement;
		if (inputElement && inputElement.value !== null) {
			this._value = inputElement.value;
			this.onChange(this._value);
			this.onTouched();
		}
	}

	protected shouldShowError(): boolean {
		return this.formErrorService.shouldShowError(this.formControl);
	}

	protected getErrorMessage(): string | null {
		return this.formErrorService.getErrorMessage(this.formControl);
	}

	/** Password hide signal. */
	protected hide = signal(true);

	/**
	 * Password hide and review click event.
	 * @param event Mouse event.
	 */
	protected clickEvent(event: MouseEvent): void {
		this.hide.set(!this.hide());
		event.stopPropagation();
	}
}
