import { animeType } from '../enums/amimeType.enum';
import { animeStatus } from '../enums/animeStatus.enum';
import { BroadCastedTime } from '../types/BroadcastedTime.type';

/** Models of anime . */
export type Anime = {
	/** Id of anime. */
	readonly id: number;

	/** Date that anime was created. */
	readonly createdDate: Date;

	/** Last modified time. */
	readonly modifiedDate: Date;

	/** Title in English. */
	readonly titleEng: string;

	/** Title in Japanese. */
	readonly titleJpn: string;

	/** Cover image of the anime. */
	readonly coverImage: string;

	/** Broadcast time frame from start to end of a anime. */
	readonly broadcasted: BroadCastedTime;

	/** Type of the anime ex OVA. */
	readonly animeType: animeType;

	/** Status of the anime. */
	readonly animeStatus: animeStatus;

	/** Score of the anime from website. */
	readonly score: number | null;

	/** Score from users. */
	readonly userScore: number | null;

	/** Studio's id as array of string. */
	readonly studios: readonly string[];

	/** Genres' id as array of string. */
	readonly genres: readonly string[];
};
