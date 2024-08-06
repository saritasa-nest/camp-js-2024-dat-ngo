import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeType } from '@js-camp/core/models/anime-type';

/** Anime type. */
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
				// TODO (Dat Ngo): Use modified instead of element. DONE
				return 'anime_movie';
			case AnimeType.ONA:
				return 'anime_ona';
			case AnimeType.Music:
				return 'anime_music';
			case AnimeType.OVA:
				return 'anime_ova';
			case AnimeType.PromotionalVideos:
				return 'anime_promotional-videos';
			case AnimeType.Special:
				return 'anime_special';
			case AnimeType.TV:
				return 'anime_tv';
			case AnimeType.Unknown:
				return 'anime_unknown';
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
