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
	/** An array of available anime types to choose from. */
	protected readonly selectTypes = Object.values(AnimeType);

	/** Event emitter for page changing. */
	@Output() public typeChange = new EventEmitter<AnimeType>();

	@Input() public search = '';

	@Input() selectedType: AnimeType | null = null;

	@Output() public searchChange = new EventEmitter<string | null>();

	protected onSelectionChange(event: MatSelectChange) {
		if (Object.values(AnimeType).includes(event.value)) {
			this.typeChange.emit(event.value);
		}
	}

	protected onSearch() {
		if (this.search.length > 0) {
			this.searchChange.emit(this.search);
		} else {
			this.searchChange.emit(null);
		}
	}
}
