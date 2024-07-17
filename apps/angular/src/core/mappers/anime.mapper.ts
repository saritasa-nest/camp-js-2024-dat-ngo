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
		return {
			id: data.id,
			createdDate: new Date(data.created),
			modifiedDate: new Date(data.modified),
			titleEng: data.title_eng,
			titleJpn: data.title_jpn,
			coverImage: data.image,
			broadcasted: {
				startDate : data.aired.start ? new Date(data.aired.start) : null,
				endDate: data.aired.end ? new Date(data.aired.end) : null,
			},
			animeType: data.type,
			animeStatus: data.status,
			score: data.score,
			userScore: data.user_score,
			studios: data.studios,
			genres: data.genres,
		};
	}
}
