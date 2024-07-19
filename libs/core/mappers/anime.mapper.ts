import { Injectable } from '@angular/core';

import { Anime } from '../models/anime.model';
import { AnimeDto } from '../dtos/anime.dto';

/** Auth mapper. */
@Injectable({
	providedIn: 'root',
})
export class AnimeMapper {
	/** @inheritdoc */
	public fromDto(data: AnimeDto): Anime {
		return new Anime({
			id: data.id,
			createdDate: new Date(data.created),
			modifiedDate: new Date(data.modified),
			titleEng: data.title_eng,
			titleJpn: data.title_jpn,
			coverImage: data.image,
			broadcasted: {
				startDate: data.aired.start ? new Date(data.aired.start) : null,
				endDate: data.aired.end ? new Date(data.aired.end) : null,
			},
			animeType: data.type,
			animeStatus: data.status,
			score: data.score,
			userScore: data.user_score,
			studios: data.studios,
			genres: data.genres,
		});
	}

	/** @inheritdoc */
	public toDto(data: Anime): AnimeDto {
		return {
			id: data.id,
			created: data.createdDate.toISOString(),
			modified: data.modifiedDate.toISOString(),
			title_eng: data.titleEng,
			title_jpn: data.titleJpn,
			image: data.coverImage,
			aired: {
				start: data.broadcasted.startDate ? data.broadcasted.startDate.toISOString() : null,
				end: data.broadcasted.endDate ? data.broadcasted.endDate.toISOString() : null,
			},
			type: data.animeType,
			status: data.animeStatus,
			score: data.score,
			user_score: data.userScore,
			studios: data.studios,
			genres: data.genres,
		};
	}

	/**
	 *
	 * @param data
	 * @returns
	 */
	public fromDtoArray(data: readonly AnimeDto[]): readonly Anime[] {
		return data.map((item) => this.fromDto(item));
	}
}
