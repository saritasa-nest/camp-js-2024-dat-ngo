import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeType } from '@js-camp/core/models/anime-type';

const ANIME_TYPE_COLORS: Record<AnimeType, string> = {
	[AnimeType.Movie]: 'anime-type_movie',
	[AnimeType.Music]: 'anime-type_music',
	[AnimeType.ONA]: 'anime-type_ona',
	[AnimeType.OVA]: 'anime-type_ova',
	[AnimeType.PromotionalVideos]: 'anime-type_promotional-videos',
	[AnimeType.Special]: 'anime-type_special',
	[AnimeType.TV]: 'anime-type_tv',
	[AnimeType.Unknown]: 'anime-type_unknown',
};

/** Anime type. */
@Component({
	selector: 'camp-anime-type',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './anime-type.component.html',
	styleUrl: './anime-type.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTypeComponent {
	/** Session status. */
	@Input({ required: true })
	public animeType: AnimeType = AnimeType.Movie;

	private get color(): string {
		return ANIME_TYPE_COLORS[this.animeType];
	}

	/** Bind color to class. */
	@HostBinding('class')
	protected get classes(): string {
		return `anime-badge ${this.color}`;
	}
}
