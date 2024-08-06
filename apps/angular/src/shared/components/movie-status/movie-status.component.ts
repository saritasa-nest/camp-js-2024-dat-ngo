import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeStatus } from '@js-camp/core/models/anime-status';

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
	@Input({ required: true }) public animeStatus!: AnimeStatus;

	// /** Map to human-readable. */
	// public readonly toReadable = toReadable(this.animeStatus);

	private get color(): string {
		switch (this.animeStatus) {
			case AnimeStatus.CurrentlyAiring:
				return 'anime__currently-airing';
			case AnimeStatus.FinishedAiring:
				return 'anime__finished-airing';
			case AnimeStatus.NotYetAired:
				return 'anime__not-yet-aired';
			default:
				return '';
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
