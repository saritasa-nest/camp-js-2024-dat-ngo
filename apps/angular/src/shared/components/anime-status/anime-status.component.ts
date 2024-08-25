import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeStatus } from '@js-camp/core/models/anime-status';

/** Anime status component. */
@Component({
	selector: 'camp-anime-status',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './anime-status.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeStatusComponent {
	/** Anime status. */
	@Input({ required: true })
	public animeStatus: AnimeStatus = AnimeStatus.CurrentlyAiring;

	private get color(): string {
		switch (this.animeStatus) {
			case AnimeStatus.CurrentlyAiring:
				return 'anime-status_currently-airing';
			case AnimeStatus.FinishedAiring:
				return 'anime-status_finished-airing';
			case AnimeStatus.NotYetAired:
				return 'anime-status_not-yet-aired';
			default:
				return 'anime-status_currently-airing';
		}
	}

	private get classes(): string {
		return `anime-badge ${this.color}`;
	}

	@HostBinding('class')
	private get _classes(): string {
		return this.classes;
	}
}
