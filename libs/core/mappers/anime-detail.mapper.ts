import { AnimeDetailDto } from '../dtos/anime-detail.dto';
import { AnimeDetail } from '../models/anime-detail';

import { AnimeRatingMapper } from './anime-rating.mapper';
import { AnimeSeasonMapper } from './anime-season.mapper';
import { AnimeSourceMapper } from './anime-source.mapper';
import { AnimeStudioMapper } from './anime-studios.mapper';
import { AnimeMapper } from './anime.mapper';
import { AnimeGenreMapper } from './genre.mapper';

/** Anime detail mapper. */
export namespace AnimeDetailMapper {

	/**
	 * Anime detail mapper from dto to model.
	 * @param dto Anime detail dto.
	 * @returns Anime detail model.
	 */
	export function fromDto(dto: AnimeDetailDto): AnimeDetail {
		return new AnimeDetail({
			...AnimeMapper.fromDto(dto),
			rating: AnimeRatingMapper.fromDto(dto.rating),
			season: AnimeSeasonMapper.fromDto(dto.season),
			source: AnimeSourceMapper.fromDto(dto.source),
			genresData: AnimeGenreMapper.mapGenreListFromDto(dto.genres_data),
			studiosData: AnimeStudioMapper.mapStudioListFromDto(dto.studios_data),
			trailerYoutubeId: dto.trailer_youtube_id,
			synopsis: dto.synopsis,
			airingStatus: dto.airing,
			background: dto.background,
			broadcastDay: dto.broadcast_day,
			broadcastTime: dto.broadcast_time,
			broadcastTimezone: dto.broadcast_timezone,
		});
	}

	/**
	 * Anime detail mapper from model to dto.
	 * @param model Anime detail model.
	 * @returns Anime detail dto.
	 */
	export function toDto(model: AnimeDetail): AnimeDetailDto {
		return {
			...AnimeMapper.toDto(model),
			rating: AnimeRatingMapper.toDto(model.rating),
			season: AnimeSeasonMapper.toDto(model.season),
			source: AnimeSourceMapper.toDto(model.source),
			genres_data: AnimeGenreMapper.mapGenreListToDto(model.genresData),
			studios_data: AnimeStudioMapper.mapStudioListToDto(model.studiosData),
			trailer_youtube_id: model.trailerYoutubeId,
			synopsis: model.synopsis,
			airing: model.airingStatus,
			background: model.background,
			broadcast_day: model.broadcastDay,
			broadcast_time: model.broadcastTime,
			broadcast_timezone: model.broadcastTimezone,
		};
	}
}
