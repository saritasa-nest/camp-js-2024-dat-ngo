import { DateRange } from './date-range';

import { AnimeType } from './anime-type';
import { AnimeStatus } from './anime-status';

import { Immerable, OmitImmerable } from './immerable';

/** Models of anime . */
export class Anime extends Immerable {
	/** Id of anime. */
	public readonly id: number;

	/** Title in English. */
	public readonly englishTitle: string;

	/** Title in Japanese. */
	public readonly japaneseTitle: string;

	/** Cover image of the anime. */
	public readonly coverImageUrl: string;

	/** Broadcast time frame from start to end of a anime. */
	public readonly broadcasted: DateRange;

	/** Type of the anime ex OVA. */
	public readonly animeType: AnimeType;

	/** Status of the anime. */
	public readonly animeStatus: AnimeStatus;

	/** Score of the anime from website. */
	public readonly score: number | null;

	/** Score from users. */
	public readonly userScore: number | null;

	/** Studio's id as array of string. */
	public readonly studios: readonly number[];

	/** Genres' id as array of string. */
	public readonly genres: readonly number[];

	public constructor(data: AnimeConstructorData) {
		super();
		this.id = data.id;
		this.englishTitle = data.englishTitle;
		this.japaneseTitle = data.japaneseTitle;
		this.coverImageUrl = data.coverImageUrl;
		this.broadcasted = data.broadcasted;
		this.animeType = data.animeType;
		this.animeStatus = data.animeStatus;
		this.score = data.score;
		this.userScore = data.userScore;
		this.studios = data.studios;
		this.genres = data.genres;
	}
}

type AnimeConstructorData = OmitImmerable<Anime>;
