import { animeType } from "../enums/amimeType.enum";
import { animeStatus } from "../enums/animeStatus.enum";

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

		/** Todo.*/
		readonly start: string | null;

		/** Todo.*/
		readonly end: string | null;
	};

	/** Type of the anime ex OVA. */
	readonly type: animeType;

	/** Status of the anime. */
	readonly status: animeStatus;

	/** Score of the anime from website. */
	readonly score: number | null;

	/** Score from users. */
	readonly user_score: number | null;

	/** Studio's id as array of string. */
	readonly studios: readonly string[];

	/** Genres' id as array of string. */
	readonly genres: readonly string[];
};
