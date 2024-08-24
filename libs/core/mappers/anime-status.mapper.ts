import { AnimeStatusDto } from '../dtos/anime-status.dto';
import { AnimeStatus } from '../models/anime-status';

/** Namespace for Anime Status Mapper functions and mappings. */
export namespace AnimeStatusMapper {

	/** Anime Status from DTO. */
	const MAP_ANIME_STATUS_FROM_DTO: Record<AnimeStatusDto, AnimeStatus> = {
		[AnimeStatusDto.CurrentlyAiring]: AnimeStatus.CurrentlyAiring,
		[AnimeStatusDto.FinishedAiring]: AnimeStatus.FinishedAiring,
		[AnimeStatusDto.NotYetAired]: AnimeStatus.NotYetAired,
	};

	/** Anime Status to DTO. */
	const MAP_ANIME_STATUS_TO_DTO: Record<AnimeStatus, AnimeStatusDto> = {
		[AnimeStatus.CurrentlyAiring]: AnimeStatusDto.CurrentlyAiring,
		[AnimeStatus.FinishedAiring]: AnimeStatusDto.FinishedAiring,
		[AnimeStatus.NotYetAired]: AnimeStatusDto.NotYetAired,
	};

	/**
	 * Function to convert anime status DTO to internal model.
	 * @param dtoStatus Anime status DTO.
	 */
	export function fromDto(dtoStatus: AnimeStatusDto): AnimeStatus {
		return MAP_ANIME_STATUS_FROM_DTO[dtoStatus];
	}

	/**
	 * Function to convert internal model to anime status DTO.
	 * @param status Internal anime status.
	 */
	export function toDto(status: AnimeStatus): AnimeStatusDto {
		return MAP_ANIME_STATUS_TO_DTO[status];
	}
}
