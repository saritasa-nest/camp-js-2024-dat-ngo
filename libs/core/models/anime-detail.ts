import { Anime } from './anime';
import { AnimeRating } from './anime-rating';
import { AnimeSeason } from './anime-season';
import { AnimeSource } from './anime-source';
import { AnimeStudioData } from './anime-studio';
import { Genre } from './genre';
import { OmitImmerable } from './immerable';

/** Anime detail. */
export class AnimeDetail extends Anime {
	/** Youtube trailer url. */
	public readonly trailerYoutubeId: string;

	/** Anime source.*/
	public readonly source: AnimeSource;

	/** Anime rating. */
	public readonly rating: AnimeRating;

	/** Anime season. */
	public readonly season: AnimeSeason;

	/** Synopsis. */
	public readonly synopsis: string;

	/** Airing status. */
	public readonly airingStatus: boolean;

	/** Background. */
	public readonly background: string;

	/** Broadcast day. */
	public readonly broadcastDay: number;

	/** Broadcast time. */
	public readonly broadcastTime: string;

	/** Broadcast timezone. */
	public readonly broadcastTimezone: string;

	/** Studios data. */
	public readonly studiosData: readonly AnimeStudioData[];

	/** Genres data. */
	public readonly genresData: readonly Genre[];

	public constructor(data: TAnimeDetail) {
		super(data);
		this.trailerYoutubeId = data.trailerYoutubeId;
		this.rating = data.rating;
		this.source = data.source;
		this.season = data.season;
		this.synopsis = data.synopsis;
		this.airingStatus = data.airingStatus;
		this.studiosData = data.studiosData;
		this.genresData = data.genresData;
		this.background = data.background;
		this.broadcastDay = data.broadcastDay;
		this.broadcastTime = data.broadcastTime;
		this.broadcastTimezone = data.broadcastTimezone;
	}
}

/** Anime Type. */
type TAnimeDetail = Omit<OmitImmerable<AnimeDetail>, 'imageDescription'>;
