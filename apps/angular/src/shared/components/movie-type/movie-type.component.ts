import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeType } from '@js-camp/core/models/anime-type';

@Component({
	selector: 'camp-movie-type',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './movie-type.component.html',
	styleUrl: './movie-type.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieTypeComponent {
	/** Session status. */
	@Input({ required: true }) public animeType!: AnimeType;

	private get color(): string {
		switch (this.animeType) {
			case AnimeType.Movie:
				return 'anime__movie';
			case AnimeType.ONA:
				return 'anime__ona';
			case AnimeType.Music:
				return 'anime__music';
			case AnimeType.OVA:
				return 'anime__ova';
			case AnimeType.PromotionalVideos:
				return 'anime__promotional-videos';
			case AnimeType.Special:
				return 'anime__special';
			case AnimeType.TV:
				return 'anime__tv';
			case AnimeType.Unknown:
				return 'anime__unknown';
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
