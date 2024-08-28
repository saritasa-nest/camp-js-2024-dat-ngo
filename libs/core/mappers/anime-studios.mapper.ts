import { AnimeDetailDto } from '../dtos/anime-detail.dto';
import { AnimeStudioDataDto } from '../dtos/anime-studio-data.dto';
import { AnimeDetail } from '../models/anime-detail';
import { AnimeStudioData } from '../models/anime-studio';

import { DateTimeMapper } from './date-time.mapper';

export namespace AnimeStudioMapper {

	/**
	 * Function to convert anime studio DTO to internal model.
	 * @param dto Anime studio DTO.
	 */
	export function fromDto(dto: AnimeStudioDataDto): AnimeStudioData {
		return new AnimeStudioData({
			id: dto.id,
			createdDate: DateTimeMapper.fromDto(dto.created),
			modifiedDate: DateTimeMapper.fromDto(dto.modified),
			name: dto.name,
			image: dto.image,
		});
	}

	/**
	 * Function to convert anime internal model to studio DTO.
	 * @param model Anime studio model.
	 */
	export function toDto(model: AnimeStudioData): AnimeStudioDataDto {
		return {
			id: model.id,
			created: DateTimeMapper.toDto(model.createdDate),
			modified: DateTimeMapper.toDto(model.modifiedDate),
			name: model.name,
			image: model.image,
		};
	}

	/**
	 * Map genres array from dto to model.
	 * @param dto Genres dto array.
	 * @returns Genres array model.
	 */
	export function mapStudioListFromDto(dto: AnimeDetailDto['studios_data']): AnimeDetail['studiosData'] {
		return dto.map(genreDto => fromDto(genreDto));
	}

	/**
	 * Map genres array from model to dto.
	 * @param model Genres model array.
	 * @returns Genres array dto.
	 */
	export function mapStudioListToDto(model: AnimeDetail['studiosData']): AnimeDetailDto['studios_data'] {
		return model.map(genre => toDto(genre));
	}
}
