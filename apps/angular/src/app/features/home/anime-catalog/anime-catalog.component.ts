import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
@Component({
	selector: 'camp-anime-catalog',
	standalone: true,
	imports: [CommonModule, MatFormField, MatLabel, MatSelect, MatOption, FormsModule],
	templateUrl: './anime-catalog.component.html',
	styleUrl: './anime-catalog.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeCatalogComponent {
	searchQuery: string = '';
	sortBy: string = '';

	/** 1. */
	protected sortOptions = [
		{ value: 'name', viewValue: 'Name' },
		{ value: 'date', viewValue: 'Date' },
		{ value: 'rating', viewValue: 'Rating' },
	];

	/** 1. */
	public onSearchChange(): void {
		// Logic for handling search query change
		console.log('Search query:', this.searchQuery);
	}

	/** 1. */
	public onSortChange(): void {
		// Logic for handling sort option change
		console.log('Sort by:', this.sortBy);
	}
}
