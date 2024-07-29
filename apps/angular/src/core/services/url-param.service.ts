import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AnimeQueryParams } from '@js-camp/core/models/url-query';
import { AnimeType } from '@js-camp/core/models/anime-type';
import { UrlQueryParams } from '@js-camp/core/models/url-query-param';
/** Service for handling URL query params. */
@Injectable({
	providedIn: 'root',
})
export class UrlParamsService {
	private route = inject(ActivatedRoute);

	private router = inject(Router);

	private constructor() {}

	/** Convert the params from URL. */
	public getCombinedQueryParams(): Observable<AnimeQueryParams.Combined> {
		return this.route.queryParamMap.pipe(
			map((params) => {
				const combinedParams: Partial<AnimeQueryParams.Combined> = {
					search: params.get('search') ?? undefined,
					pageNumber: params.has('pageNumber') ? Number(params.get('pageNumber')) : 0,
					pageSize: params.has('pageSize') ? Number(params.get('pageSize')) : 5,
					sortFields: params.getAll('sortFields').length > 0 ? params.getAll('sortFields') : undefined,
					type: (params.get('type') as AnimeType) ?? undefined,
				};
				return combinedParams as AnimeQueryParams.Combined;
			})
		);
	}

	/** Set query parameters from AnimeQueryParams.Combined type. */
	public setCombinedQueryParams(params: AnimeQueryParams.Combined): void {
		const queryParams: UrlQueryParams = {
			...(params.search != null && { search: params.search }),
			...(params.pageNumber != null && { pageNumber: params.pageNumber.toString() }),
			...(params.pageSize != null && { pageSize: params.pageSize.toString() }),
			...(params.sortFields != null && { sortFields: params.sortFields }),
			...(params.type != null && { type: params.type }),
		};

		this.router.navigate([], {
			relativeTo: this.route,
			queryParams,
			queryParamsHandling: 'merge',
		});
	}

	/** Update query parameter. */
	public updateCombinedQueryParams(params: Partial<AnimeQueryParams.Combined>): void {
		const currentParams = { ...this.route.snapshot.queryParams };
		const newParams = { ...currentParams, ...params };

		this.router.navigate([], {
			relativeTo: this.route,
			queryParams: newParams,
			queryParamsHandling: 'merge',
		});
	}
}
