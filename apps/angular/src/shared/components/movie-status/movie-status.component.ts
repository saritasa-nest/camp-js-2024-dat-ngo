import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeStatus } from '@js-camp/core/models/anime-status';

/** Movie status. */
@Component({
	selector: 'camp-movie-status',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './movie-status.component.html',
	styleUrl: './movie-status.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieStatusComponent {
	/** Session status. */
	@Input({ required: true })
	public animeStatus: AnimeStatus = AnimeStatus.CurrentlyAiring;

	private get color(): string {
		switch (this.animeStatus) {
			case AnimeStatus.CurrentlyAiring:
				return 'anime_currently-airing';
			case AnimeStatus.FinishedAiring:
				return 'anime_finished-airing';
			case AnimeStatus.NotYetAired:
				return 'anime_not-yet-aired';
			default:
				return 'anime_currently-airing';
		}
	}

	private get classes(): string {
		return `${this.color}`;
	}

	@HostBinding('class')
	private get _classes(): string {
		return this.classes;
	}
}
