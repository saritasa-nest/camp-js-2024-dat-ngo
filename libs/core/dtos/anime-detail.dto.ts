import { AnimeRatingDto } from './anime-rating.dto';
import { AnimeSeasonDto } from './anime-season.dto';
import { AnimeSourceDto } from './anime-source.dto';
import { AnimeStudioDataDto } from './anime-studio-data.dto';
import { AnimeDto } from './anime.dto';
import { GenreDto } from './genre.dto';

/** Anime detail Dto. */
export type AnimeDetailDto = AnimeDto & {

	/** Youtube trailer url. */
	trailer_youtube_id: string;

	/** Anime source. */
	source: AnimeSourceDto;

	/** Anime rating. */
	rating: AnimeRatingDto;

	/** Anime rating. */
	season: AnimeSeasonDto;

	/** Anime airing status. */
	readonly airing: boolean;

	/** Anime synopsis. */
	synopsis: string;

	/** Anime background. */
	background: string;

	/** Anime broadcast day. */
	broadcast_day: number;

	/** Anime broadcast time. */
	broadcast_time: string;

	/** Anime broadcast timezone. */
	broadcast_timezone: string;

	/** Anime studios data dto. */
	studios_data: readonly AnimeStudioDataDto[];

	/** Anime genres data dto. */
	genres_data: readonly GenreDto[];
};
