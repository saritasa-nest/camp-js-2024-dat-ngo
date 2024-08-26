import { booleanAttribute, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeDetail } from '@js-camp/core/models/anime-detail';
import { EmptyPipe } from '@js-camp/angular/core/pipes/empty.pipe';
import { MovieTypeComponent } from '@js-camp/angular/shared/components/movie-type/movie-type.component';
import { MovieStatusComponent } from '@js-camp/angular/shared/components/movie-status/movie-status.component';
import { Genre } from '@js-camp/core/models/genre';
import { AnimeStudioData } from '@js-camp/core/models/anime-studio';
import { SkeletonCellComponent } from '@js-camp/angular/shared/components/skeleton-cell/skeleton-cell.component';

/** Anime detail component. */
@Component({
	selector: 'camp-anime-detail-information',
	standalone: true,
	imports: [CommonModule, EmptyPipe, MovieTypeComponent, MovieStatusComponent, SkeletonCellComponent],
	templateUrl: './anime-detail-information.component.html',
	styleUrl: './anime-detail-information.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailInformationComponent {
	/** Anime detail. */
	@Input()
	public animeDetail!: AnimeDetail | null;

	/** Loading state. */
	@Input({ transform: booleanAttribute })
	public isLoading = true;

	/**
	 * Gets formatted list.
	 * @param array Array of items.
	 */
	protected getFormattedList(array: readonly Genre[] | readonly AnimeStudioData[]): string {
		return array.map((item) => item.name).join(', ');
	}
}
