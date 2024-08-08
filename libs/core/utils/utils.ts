/**
 * Function to return a null symbol if there is no value, undefined and null.
 * @param value Value to display.
 */
export function changeIfValueEmpty(value: string): string {
	return value || 'N/A';
}
