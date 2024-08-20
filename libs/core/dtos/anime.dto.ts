import { AnimeTypeDto } from './amime-type.dto';
import { AnimeStatusDto } from './anime-status.dto';

/** Anime Dto. */
export type AnimeDto = {

	/** Id of anime. */
	readonly id: number;

	/** Date that anime was created. */
	readonly created: string;

	/** Last modified time. */
	readonly modified: string;

	/** Title in English. */
	readonly title_eng: string;

	/** Title in Japanese. */
	readonly title_jpn: string;

	/** Cover image of the anime. */
	readonly image: string;

	/** Broadcast time frame from start to end of a anime. */
	readonly aired: {

		/**
		 * Start Date.
		 * @example 2023-07-09T07:06:38.596236Z.
		 * */
		readonly start: string | null;

		/**
		 * End Date.
		 * @example 2023-07-09T07:06:38.596236Z.
		 * */
		readonly end: string | null;
	};

	/** Type of the anime ex OVA. */
	readonly type: AnimeTypeDto;

	/** Status of the anime. */
	readonly status: AnimeStatusDto;

	/** Score of the anime from website. */
	readonly score: number | null;

	/** Score from users. */
	readonly user_score: number | null;

	/** Studios' id as array of string. */
	readonly studios: readonly string[];

	/** Genres' id as array of string. */
	readonly genres: readonly string[];
};
