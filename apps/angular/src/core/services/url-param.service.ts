import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
					pageNumber: params.has('pageNumber') ? Number(params.get('pageNumber')) : undefined,
					pageSize: params.has('pageSize') ? Number(params.get('pageSize')) : undefined,
					sortFields: params.getAll('sortFields').length > 0 ? params.getAll('sortFields') : undefined,
					type: (params.get('type') as AnimeType) ?? undefined,
				};
				console.log(combinedParams);
				return combinedParams as AnimeQueryParams.Combined;
			})
		);
	}

	/** Set query parameters from AnimeQueryParams.Combined type. */
	public setCombinedQueryParams(params: AnimeQueryParams.Combined): void {
		const queryParams: UrlQueryParams = {};

		if (params.search != null) {
			queryParams.search = params.search;
		}
		if (params.pageNumber != null) {
			queryParams.pageNumber = params.pageNumber.toString();
		}
		if (params.pageSize != null) {
			queryParams.pageSize = params.pageSize.toString();
		}
		if (params.sortFields != null) {
			queryParams.sortFields = params.sortFields;
		}
		if (params.type != null) {
			queryParams.type = params.type;
		}

		this.router.navigate([], {
			relativeTo: this.route,
			queryParams,
			queryParamsHandling: 'merge',
		});
	}
}
