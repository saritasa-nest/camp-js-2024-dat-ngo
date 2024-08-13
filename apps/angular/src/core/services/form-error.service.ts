import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

/** Form Error Service. */
@Injectable({ providedIn: 'root' })
export class FormErrorService {
	private errorMessages: Record<string, string | ((params: any) => string)> = {
		required: 'This field is required',
		email: 'Please enter a valid email address',
		minlength: (params: any) => `Minimum length is ${params.requiredLength} characters`,
		maxlength: (params: any) => `Maximum length is ${params.requiredLength} characters`,
		passwordMismatch: 'Passwords do not match',
		pattern: 'Invalid format',
	};

	/**
	 * Get error message for a specific form control.
	 * @param control The form control.
	 * @returns The error message or null if there are no errors.
	 */
	public getErrorMessage(control: AbstractControl): string | null {
		return (
			Object.keys(control?.errors ?? {}).map((errorKey) => {
				const errorMessage = this.errorMessages[errorKey];
				return typeof errorMessage === 'function' ? errorMessage(control?.errors?.[errorKey]) : errorMessage;
			})[0] ?? null
		);
	}

	/**
	 * Get error messages for all controls in a form group.
	 * @param formGroup The form group.
	 * @returns A map of form control names to error messages.
	 */
	public getFormErrors(formGroup: FormGroup): Record<string, string | null> {
		const formErrors: Record<string, string | null> = {};
		Object.keys(formGroup.controls).forEach((key) => {
			const control = formGroup.get(key);
			if (control instanceof FormGroup) {
				// Recursively get errors for nested form groups
				Object.assign(formErrors, this.getFormErrors(control));
			} else if (control) {
				formErrors[key] = this.getErrorMessage(control);
			}
		});
		return formErrors;
	}
}
