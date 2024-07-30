import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { AnimeType } from '@js-camp/core/models/anime-type';
import { MatInputModule } from '@angular/material/input';
@Component({
	selector: 'camp-search-filter-form',
	standalone: true,
	imports: [CommonModule, MatFormFieldModule, MatSelectModule, FormsModule, MatInputModule],
	templateUrl: './search-filter-form.component.html',
	styleUrl: './search-filter-form.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFilterFormComponent {
	protected selectedType: AnimeType | null = null;

	/** An array of available anime types to choose from. */
	protected readonly selectTypes = Object.values(AnimeType);

	/** Event emitter for page changing. */
	@Output() public typeChange = new EventEmitter<AnimeType>();

	@Input() public search = '';

	@Output() public searchChange = new EventEmitter<string>();

	protected onSelectionChange(event: MatSelectChange) {
		console.log(event.value);
		if (event.value in AnimeType) {
			this.typeChange.emit(event.value);
		}
	}
	protected onSearch() {
		this.searchChange.emit(this.search);
	}
	// protected onSearch(): void {
	// 	const newParams: Partial<AnimeQueryParams.Combined> = {
	// 		...this.params,
	// 		pageNumber: 0,
	// 	};
	// 	this.params = newParams;
	// 	this.urlService.updateCombinedQueryParams(this.params);
	// }
}
