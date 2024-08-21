import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

/** Form Error Service. */
@Injectable({ providedIn: 'root' })
export class FormErrorService {
	// TODO (Dat Ngo): MUnexpected any. Specify a different type.
	private errorMessages: Record<string, string | ((params: any) => string)> = {
		required: 'This field is required',
		email: 'Please enter a valid email address',
	// TODO (Dat Ngo): MUnexpected any. Specify a different type.
		minlength: (params: any) => `Minimum length is ${params.requiredLength} characters`,
	// TODO (Dat Ngo): MUnexpected any. Specify a different type.
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
		// Return null early if there are no errors
		if (!control?.errors) {
			return null;
		}

		// Iterate over the error keys and return the first matching message
		for (const errorKey of Object.keys(control.errors)) {
			const errorMessage = this.errorMessages[errorKey];
			if (errorMessage) {
				return typeof errorMessage === 'function' ? errorMessage(control.errors[errorKey]) : errorMessage;
			}
		}

		// If no matching error message is found, return null
		return null;
	}

	/**
	 * Get error messages for all controls in a form group.
	 * @param formGroup The form group.
	 * @returns A map of form control names to error messages.
	 */
	public getFormErrors(formGroup: FormGroup): Record<string, string | null> {
		const formErrors: Record<string, string | null> = {};
		// TODO (Dat Ngo): We should fix linter errors.
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

	/**
	 * Determines whether a form control should show an error within a form group.
	 * @param formGroup The parent form group containing the control.
	 * @param controlName The name of the control to check.
	 * @returns True if the control is invalid and either touched or dirty, otherwise false.
	 */
	public shouldShowError(formGroup: FormControl): boolean {
		// const control = formGroup.get(controlName);
		return formGroup ? formGroup.invalid && (formGroup.touched || formGroup.dirty) : false;
	}
}
