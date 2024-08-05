import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'classify', standalone: true })
export class ClassifyPipe implements PipeTransform {
	transform(value: string): string {
		if (!value) {
			return '';
		}
		return value.toLowerCase().replace(/\s+/g, '-');
	}
}
