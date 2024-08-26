import { AnimeDetailDto } from '../dtos/anime-detail.dto';
import { GenreDto } from '../dtos/genre.dto';
import { AnimeDetail } from '../models/anime-detail';
import { Genre } from '../models/genre';

/** Anime genre mapper. */
export namespace AnimeGenreMapper {

	/** Map genres from dto to model.
	 * @param dto Genres dto.
	 * @returns Genres.
	 */
	export function fromDto(dto: GenreDto): Genre {
		return new Genre({
			id: dto.id,
			name: dto.name,
		});
	}

	/** Map genres from model to dto.
	 * @param model Genres model.
	 * @returns Genres dto.
	 */
	export function toDto(model: Genre): GenreDto {
		return {
			id: model.id,
			name: model.name,
		};
	}

	/** Map genres array from dto to model.
	 * @param dto Genres dto array.
	 * @returns Genres array model.
	 */
	export function mapGenreListFromDto(dto: AnimeDetailDto['genres_data']): AnimeDetail['genresData'] {
		return dto.map(genreDto => fromDto(genreDto));
	}

	/** Map genres array from model to dto.
	 * @param model Genres model array.
	 * @returns Genres array dto.
	 */
	export function mapGenreListToDto(model: AnimeDetail['genresData']): AnimeDetailDto['genres_data'] {
		return model.map(genre => toDto(genre));
	}
}
