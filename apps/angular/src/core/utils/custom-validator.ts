import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Custom validator for 2 fields must match.
 * @param controlName Name of the control to display the error.
 * @param matchingControlName Name of the control need to compare.
 * @returns ValidatorFn.
 */
export function mustMatch(controlName: string, matchingControlName: string): ValidatorFn {
	return (formGroup: AbstractControl): ValidationErrors | null => {
		const control = formGroup.get(controlName);
		const matchingControl = formGroup.get(matchingControlName);
		if (!control || !matchingControl) {
			return null;
		}

		if (matchingControl.errors && !matchingControl.errors['passwordMismatch']) {
			return null;
		}

		if (control.value !== matchingControl.value) {
			matchingControl.setErrors({ passwordMismatch: true });
		} else {
			matchingControl.setErrors(null);
		}
		return null;
	};
}
