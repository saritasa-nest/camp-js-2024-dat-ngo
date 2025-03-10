import { AnimeTypeDto } from './amime-type.dto';
import { AnimeStatusDto } from './anime-status.dto';
import { DateRangeDto } from './date-range.dto';

/** Anime Dto. */
export type AnimeDto = {

	/** Id of anime. */
	readonly id: number;

	/** Title in English. */
	readonly title_eng: string;

	/** Title in Japanese. */
	readonly title_jpn: string;

	/** Cover image of the anime. */
	readonly image: string;

	/** Broadcast time frame from start to end of a anime. */
	readonly aired: DateRangeDto;

	/** Type of the anime ex OVA. */
	readonly type: AnimeTypeDto;

	/** Status of the anime. */
	readonly status: AnimeStatusDto;

	/** Score of the anime from website. */
	readonly score: number | null;

	/** Score from users. */
	readonly user_score: number | null;

	/** Studios' id as array of string. */
	readonly studios: readonly number[];

	/** Genres' id as array of string. */
	readonly genres: readonly number[];
};
