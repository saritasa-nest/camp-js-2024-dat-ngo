import { AnimeSourceDto } from '../dtos/anime-source.dto';
import { AnimeSource } from '../models/anime-source';

export namespace AnimeSourceMapper {

	/** Map DTO to model. */
	/** Map DTO to model. */
	const MAP_ANIME_SOURCE_FROM_DTO: Record<AnimeSourceDto, AnimeSource> = {
		[AnimeSourceDto.Book]: AnimeSource.Book,
		[AnimeSourceDto.CardGame]: AnimeSource.CardGame,
		[AnimeSourceDto.FourKomaManga]: AnimeSource.FourKomaManga,
		[AnimeSourceDto.Game]: AnimeSource.Game,
		[AnimeSourceDto.LightNovel]: AnimeSource.LightNovel,
		[AnimeSourceDto.Manga]: AnimeSource.Manga,
		[AnimeSourceDto.MixedMedia]: AnimeSource.MixedMedia,
		[AnimeSourceDto.Music]: AnimeSource.Music,
		[AnimeSourceDto.Novel]: AnimeSource.Novel,
		[AnimeSourceDto.Original]: AnimeSource.Original,
		[AnimeSourceDto.Other]: AnimeSource.Other,
		[AnimeSourceDto.PictureBook]: AnimeSource.PictureBook,
		[AnimeSourceDto.Radio]: AnimeSource.Radio,
		[AnimeSourceDto.Unknown]: AnimeSource.Unknown,
		[AnimeSourceDto.VisualNovel]: AnimeSource.VisualNovel,
		[AnimeSourceDto.WebManga]: AnimeSource.WebManga,
		[AnimeSourceDto.WebNovel]: AnimeSource.WebNovel,
	};

	/** Map model to DTO. */
	const MAP_ANIME_SOURCE_TO_DTO: Record<AnimeSource, AnimeSourceDto> = {
		[AnimeSource.Book]: AnimeSourceDto.Book,
		[AnimeSource.CardGame]: AnimeSourceDto.CardGame,
		[AnimeSource.FourKomaManga]: AnimeSourceDto.FourKomaManga,
		[AnimeSource.Game]: AnimeSourceDto.Game,
		[AnimeSource.LightNovel]: AnimeSourceDto.LightNovel,
		[AnimeSource.Manga]: AnimeSourceDto.Manga,
		[AnimeSource.MixedMedia]: AnimeSourceDto.MixedMedia,
		[AnimeSource.Music]: AnimeSourceDto.Music,
		[AnimeSource.Novel]: AnimeSourceDto.Novel,
		[AnimeSource.Original]: AnimeSourceDto.Original,
		[AnimeSource.Other]: AnimeSourceDto.Other,
		[AnimeSource.PictureBook]: AnimeSourceDto.PictureBook,
		[AnimeSource.Radio]: AnimeSourceDto.Radio,
		[AnimeSource.Unknown]: AnimeSourceDto.Unknown,
		[AnimeSource.VisualNovel]: AnimeSourceDto.VisualNovel,
		[AnimeSource.WebManga]: AnimeSourceDto.WebManga,
		[AnimeSource.WebNovel]: AnimeSourceDto.WebNovel,
	};

	/**
	 * Function to convert anime source DTO to internal model.
	 * @param dtoSource Anime rating DTO.
	 */
	export function fromDto(dtoSource: AnimeSourceDto): AnimeSource {
		return MAP_ANIME_SOURCE_FROM_DTO[dtoSource];
	}

	/**
	 * Function to convert internal model to anime source DTO.
	 * @param source Internal anime source.
	 */
	export function toDto(source: AnimeSource): AnimeSourceDto {
		return MAP_ANIME_SOURCE_TO_DTO[source];
	}
}
