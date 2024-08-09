import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { EmptyPipe } from '@js-camp/angular/core/pipes/empty.pipe';
import { Pagination } from '@js-camp/core/models/pagination';
import { Anime } from '@js-camp/core/models/anime.model';

/** Anime table component.*/
@Component({
	selector: 'camp-anime-table',
	standalone: true,
	imports: [MatTableModule, CommonModule, EmptyPipe],
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent {
	/** Anime page observable.  */
	protected readonly animePage$: Observable<Pagination<Anime>>;

	private readonly animeService = inject(AnimeService);

	public constructor() {
		this.animePage$ = this.animeService.getAll();
	}

	/** This informs the table how to uniquely identify rows to track how the data changes with each update.
	 * @param index Index of them Anime on table.
	 * @param item Items on table.
	 */
	protected trackById(index: number, item: Anime): Anime['id'] {
		return item.id;
	}

	/** Displayed columns .*/
	protected readonly displayedColumns: string[] = [
		'Image',
		'English Title',
		'Japanese Title',
		'Broadcasted Date',
		'Type',
		'Status',
	] as const;
}
