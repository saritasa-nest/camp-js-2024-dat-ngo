import { BroadCastedTime } from './broadcasted-time.model';

import { AnimeType } from './amime-type';
import { AnimeStatus } from './anime-status';

import { Immerable, OmitImmerable } from './immerable';

/** Models of anime . */
export class Anime extends Immerable {
	/** Id of anime. */
	public readonly id: number;

	/** Date that anime was created. */
	public readonly createdDate: Date;

	/** Last modified time. */
	public readonly modifiedDate: Date;

	/** Title in English. */
	public readonly englishTitle: string;

	/** Title in Japanese. */
	public readonly japaneseTitle: string;

	/** Cover image of the anime. */
	public readonly coverImageUrl: string;

	/** Broadcast time frame from start to end of a anime. */
	public readonly broadcasted: BroadCastedTime;

	/** Type of the anime ex OVA. */
	public readonly animeType: AnimeType;

	/** Status of the anime. */
	public readonly animeStatus: AnimeStatus;

	/** Score of the anime from website. */
	public readonly score: number | null;

	/** Score from users. */
	public readonly userScore: number | null;

	/** Studio's id as array of string. */
	public readonly studios: readonly string[];

	/** Genres' id as array of string. */
	public readonly genres: readonly string[];

	public constructor(data: PaginationConstructorData) {
		super();
		this.id = data.id;
		this.createdDate = data.createdDate;
		this.modifiedDate = data.modifiedDate;
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

type PaginationConstructorData = OmitImmerable<Anime>;
