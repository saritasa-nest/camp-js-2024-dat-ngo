import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AnimeType } from '@js-camp/core/models/anime-type';
import { MatInputModule } from '@angular/material/input';

/** Search and Filter component. */
@Component({
	selector: 'camp-search-filter-form',
	standalone: true,
	imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, ReactiveFormsModule],
	templateUrl: './search-filter-form.component.html',
	styleUrls: ['./search-filter-form.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFilterFormComponent {
	/** Search form control. */
	public searchControl: FormControl = new FormControl('');

	/** Anime type form control. */
	public typeControl: FormControl = new FormControl(null);

	/** Selection type of anime. */
	@Input()
	public set selectedType(value: AnimeType | null) {
		this.typeControl.setValue(value);
	}

	/** Search input. */
	@Input()
	public set search(value: string) {
		this.searchControl.setValue(value);
	}

	/** Event emitter for type change. */
	@Output()
	public readonly typeChange = new EventEmitter<AnimeType>();

	/** Event emitter for search input change. */
	@Output()
	public readonly searchChange = new EventEmitter<string | null>();

	/** An array of available anime types to choose from. */
	protected readonly selectTypes = Object.values(AnimeType);

	public constructor() {
		// Emit search change when the search input changes.
		this.searchControl.valueChanges.subscribe(value => {
			this.searchChange.emit(value?.trim() || null);
		});

		// Emit type change when the anime type changes.
		this.typeControl.valueChanges.subscribe(value => {
			if (this.selectTypes.includes(value)) {
				this.typeChange.emit(value);
			}
		});
	}

	/** Execute onSearch on Enter key down.
	 * @param event Keyboard event.
	 */
	protected onKeyDown(event: KeyboardEvent): void {
		if (event.key === 'Enter') {
			this.searchChange.emit(this.searchControl.value?.trim() || null);
		}
	}
}
