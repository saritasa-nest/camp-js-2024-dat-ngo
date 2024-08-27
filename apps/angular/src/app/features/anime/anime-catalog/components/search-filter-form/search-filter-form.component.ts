import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { AnimeType } from '@js-camp/core/models/anime-type';
import { MatInputModule } from '@angular/material/input';

/** Search and Filter component. */
@Component({
	selector: 'camp-search-filter-form',
	standalone: true,
	imports: [CommonModule, MatFormFieldModule, MatSelectModule, FormsModule, MatInputModule],
	templateUrl: './search-filter-form.component.html',
	styleUrl: './search-filter-form.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFilterFormComponent {
	/** Search input. */
	@Input()
	public search = '';

	/** Selection type of anime. */
	@Input()
	public selectedType: AnimeType | null = null;

	/** Event emitter for type sort change. */
	@Output()
	public readonly typeChange = new EventEmitter<AnimeType>();

	/** Event Emitter for search input change. */
	@Output()
	public readonly searchChange = new EventEmitter<string | null>();

	/** An array of available anime types to choose from. */
	protected readonly selectTypes = Object.values(AnimeType);

	/**
	 *  Emit selection type to parent.
	 * @param event The selection type.
	 */
	protected onSelectionChange(event: MatSelectChange): void {
		const isValidType = this.selectTypes.includes(event.value);
		if (isValidType) {
			this.typeChange.emit(event.value);
		}
	}

	/** Emit search input to parent. */
	protected onSearch(): void {
		if (this.search.length > 0) {
			this.searchChange.emit(this.search);
		} else {
			this.searchChange.emit(null);
		}
	}

	/** Execute onSearch on Enter key down.
	 * @param event Keyboard event.
	 */
	protected onKeyDown(event: KeyboardEvent): void {
		if (event.key === 'Enter') {
			this.onSearch();
		}
	}
}
