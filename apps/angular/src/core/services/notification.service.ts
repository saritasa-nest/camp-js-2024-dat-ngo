import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ApiError } from '@js-camp/core/models/api-error';
import { take } from 'rxjs';

const DEFAULT_SNACKBAR_OPTIONS: MatSnackBarConfig = {
	duration: 7000,
	horizontalPosition: 'center',
	verticalPosition: 'bottom',
};

/** Notification service. */
@Injectable({ providedIn: 'root' })
export class NotificationService {
	private readonly snackBar: MatSnackBar = inject(MatSnackBar);

	/**
	 * Displays notification bars sequentially.
	 * @param errors The errors to be displayed in the notification bars.
	 * @param action The action button text (optional).
	 * @param config Additional configuration for the snackbar (optional).
	 */
	public showMessage(errors: ApiError, action?: string, config?: MatSnackBarConfig): void {
		const finalConfig = { ...DEFAULT_SNACKBAR_OPTIONS, ...config };

		/** Recursive function to show snackbars sequentially.
		 * @param index Index of current error.
		 */
		const showNextSnackbar = (index: number): void => {
			if (index >= errors.error.length) {
				return; /** Exit if no more errors .*/
			}

			const currentError = errors.error[index].detail;
			const snackBarRef = this.snackBar.open(currentError, action, finalConfig);

			/** Show the next snackbar after this one is dismissed take 1 to unsubscribe after first emit .*/
			snackBarRef.afterDismissed().pipe(take(1)).subscribe(() => {
				showNextSnackbar(index + 1);
			});
		};

		/** Start the sequence with the first snackbar .*/
		showNextSnackbar(0);
	}
}
