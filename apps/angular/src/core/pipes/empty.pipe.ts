import { Pipe, PipeTransform } from '@angular/core';

/** Pipe to return a null symbol if there is no value, undefined and null. */
@Pipe({
	standalone: true,
	name: 'empty',
})
export class EmptyPipe implements PipeTransform {
	/**
	 * Transform a value return itself if not null, undefined and no value otherwise return N/A string.
	 * @param value Value can be a string or a null.
	 */
	public transform(value: string | null): string {
		return value && value.length > 0 ? value : '-';
	}
}
