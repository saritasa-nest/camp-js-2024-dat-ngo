import { inject, InjectionToken, Provider } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';
import { map, Observable, shareReplay } from 'rxjs';

import { AnimeQueryParamsMapper, AnimeQueryParams } from '../mappers/anime-query-params.mapper';

/** Anime filter params token. */
export const ANIME_FILTER_PARAMS_TOKEN = new InjectionToken<Observable<AnimeFilterParams.Combined>>(
	'Anime page filter params',
);

/** Anime filter params providers. */
export const ANIME_FILTER_PARAMS_PROVIDERS: readonly Provider[] = [
	{
		provide: ANIME_FILTER_PARAMS_TOKEN,
		deps: [ActivatedRoute],
		useFactory: animeFiltersFactory,
	},
];

/**
 * Factory function for Anime filter params.
 * @param activatedRoute Activated route.
 */
function animeFiltersFactory(activatedRoute: ActivatedRoute): Observable<AnimeFilterParams.Combined> {
	const animeQueryParamsMapper = inject(AnimeQueryParamsMapper);

	return activatedRoute.queryParams.pipe(
		map((params: AnimeQueryParams) => animeQueryParamsMapper.fromDto(params)),
		shareReplay({ refCount: true, bufferSize: 1 }),
	);
}
