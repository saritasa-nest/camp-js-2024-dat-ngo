import { AnimeRatingDto } from './anime-rating.dto';
import { AnimeSeasonDto } from './anime-season.dto';
import { AnimeSourceDto } from './anime-source.dto';
import { AnimeStudioDataDto } from './anime-studio-data.dto';
import { AnimeDto } from './anime.dto';
import { GenreDto } from './genre.dto';

/** Anime detail Dto. */
export type AnimeDetailDto = AnimeDto & {

	/** Youtube trailer url. */
	readonly trailer_youtube_id: string;

	/** Anime source. */
	readonly source: AnimeSourceDto;

	/** Anime rating. */
	readonly rating: AnimeRatingDto;

	/** Anime rating. */
	readonly season: AnimeSeasonDto;

	/** Anime airing status. */
	readonly airing: boolean;

	/** Anime synopsis. */
	readonly synopsis: string;

	/** Anime background. */
	readonly background: string;

	/** Anime broadcast day. */
	readonly broadcast_day: number;

	/** Anime broadcast time. */
	readonly broadcast_time: string;

	/** Anime broadcast timezone. */
	readonly broadcast_timezone: string;

	/** Anime studios data dto. */
	readonly studios_data: readonly AnimeStudioDataDto[];

	/** Anime genres data dto. */
	readonly genres_data: readonly GenreDto[];
};
