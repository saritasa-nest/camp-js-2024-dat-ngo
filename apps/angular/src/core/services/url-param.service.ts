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
					pageNumber: params.has('pageNumber') ? Number(params.get('pageNumber')) : 0,
					pageSize: params.has('pageSize') ? Number(params.get('pageSize')) : 5,
					sortFields: params.get('sortFields') ?? undefined,
					type: (params.get('type') as AnimeType) ?? undefined,
				};
				return combinedParams as AnimeQueryParams.Combined;
			})
		);
	}

	/** Set query parameters from AnimeQueryParams.Combined type. */
	public setCombinedQueryParams(params: AnimeQueryParams.Combined): void {
		const paramsWithoutUndefined = this.removeUndefinedFields(params);
		console.log("paramsWithoutUndefined",paramsWithoutUndefined);
		const queryParams: UrlQueryParams = {
			...(paramsWithoutUndefined.search != null && { search: paramsWithoutUndefined.search }),
			...(paramsWithoutUndefined.pageNumber != null && { pageNumber: paramsWithoutUndefined.pageNumber.toString() }),
			...(paramsWithoutUndefined.pageSize != null && { pageSize: paramsWithoutUndefined.pageSize.toString() }),
			...(paramsWithoutUndefined.sortFields != null && { sortFields: paramsWithoutUndefined.sortFields }),
			...(paramsWithoutUndefined.type != null && { type: paramsWithoutUndefined.type }),
		};
		console.log({queryParams})
		this.router.navigate([], {
			relativeTo: this.route,
			queryParams,
			queryParamsHandling: '',
		});
	}

	/**
	 * Remove undefined fields.
	 * @param obj Object to remove.
	 */
	private removeUndefinedFields(obj: AnimeQueryParams.Combined): AnimeQueryParams.Combined {
		return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== undefined)) as AnimeQueryParams.Combined;
	}

	/** Get current URL parameters. */
	public getCurrentParams(): AnimeQueryParams.Combined {
		return this.route.snapshot.queryParams as AnimeQueryParams.Combined;
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
