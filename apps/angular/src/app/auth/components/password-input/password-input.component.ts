import { ChangeDetectionStrategy, Component, forwardRef, inject, Input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormErrorService } from '@js-camp/angular/core/services/form-error.service';
import { MatIcon } from '@angular/material/icon';

/** Camp password input. */
@Component({
	selector: 'camp-password-input',
	templateUrl: './password-input.component.html',
	styleUrls: ['./password-input.component.css'],
	imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIcon],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => PasswordInputComponent),
			multi: true,
		},
	],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordInputComponent implements ControlValueAccessor {
	/** Label. */
	@Input()
	public label = '';

	/** Type of input field. */
	@Input()
	public type = 'password';

	/** Touched. */
	@Input({ required: true })
	public touched = false;

	/** Form control. */
	@Input()
	public formControl = new FormControl();

	/** Value of the field.*/
	protected _value = '';

	/** Form error service. */
	protected readonly formErrorService = inject(FormErrorService);

	/** ControlValueAccessor interface methods.
	 * @param value On change value.
	 */
	public onChange = (value: string): void => {};

	/** On touch. */
	public onTouched = () => {};

	/**
	 * Called when the value in the UI needs to be updated
	 * @param value String to set.
	 */
	public writeValue(value: string): void {
		this._value = value;
	}

	/**
	 * Registers a function to call when the control value changes
	 * @param fn Register function onChange.
	 */
	public registerOnChange(fn: (value: string) => void): void {
		this.onChange = fn;
	}

	/**
	 * Registers a function to call when the control is touched
	 * @param fn Register function onTouch.
	 */
	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	/**
	 *On input event execute set element onChange and onTouch.
	 * @param event Input event.
	 */
	public onInput(event: Event): void {
		const inputElement = event.target as HTMLInputElement;
		if (inputElement && inputElement.value !== null) {
			this._value = inputElement.value;
			this.onChange(this._value);
			this.onTouched();
		}
	}

	/**
	 * Show error if there is any.
	 * @returns Boolean.
	 */
	protected shouldShowError(): boolean {
		return this.formErrorService.shouldShowError(this.formControl);
	}

	/**
	 * Get error messages from form control.
	 * @returns Error string or null.
	 */
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
