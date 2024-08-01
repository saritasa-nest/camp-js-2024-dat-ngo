import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';
import { AnimeType } from '@js-camp/core/models/anime-type';
import { UrlQueryParams } from '@js-camp/core/models/url-query-param';
/** Service for handling URL query params. */
@Injectable({
	providedIn: 'root',
})
export class UrlParamsService {
	private readonly activatedRoute = inject(ActivatedRoute);

	private readonly router = inject(Router);

	private constructor() {}

	/**
	 * Remove undefined fields.
	 * @param obj Object to remove.
	 */
	private removeUndefinedFields<T extends Record<string, unknown>>(obj: T): Partial<T> {
		return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== undefined)) as Partial<T>;
	}

	/**
	 * Append provide query params to the URL.
	 * @param params Params to append.
	 */
	public append(params: Record<string, any>): void {
		const paramsWithoutUndefinedField = this.removeUndefinedFields(params);
		this.router.navigate([], {
			queryParams: paramsWithoutUndefinedField,
			relativeTo: this.activatedRoute,
			queryParamsHandling: 'merge',
		});
	}

	/**
	 * Append the query params and reset the page number on URL.
	 */

	public appendAndResetPageNumber(params: Record<string, any>, defaultPageNumber: number): void {
		return this.append({ ...params, pageNumber: defaultPageNumber });
	}

	/** Set query parameters from AnimeFilterParams.Combined type. */
	public setCombinedQueryParams(params: AnimeFilterParams.Combined): void {
		// const paramsWithoutUndefined = this.removeUndefinedFields(params);
		// console.log("paramsWithoutUndefined",paramsWithoutUndefined);
		const queryParams: UrlQueryParams = {
			...(params.search != null && { search: params.search }),
			...(params.pageNumber != null && { pageNumber: params.pageNumber.toString() }),
			...(params.pageSize != null && { pageSize: params.pageSize.toString() }),
			...(params.sortFields != null ? { sortFields: params.sortFields } : { sortFields: null }),
			...(params.type != null ? { type: params.type } : { type: null }),
		};
		this.router.navigate([], {
			relativeTo: this.activatedRoute,
			queryParams,
			queryParamsHandling: 'merge',
		});
	}

	/** Get current URL parameters. */
	public getCurrentParams(): AnimeFilterParams.Combined {
		return this.activatedRoute.snapshot.queryParams as AnimeFilterParams.Combined;
	}

	/** Update query parameter. */
	public updateCombinedQueryParams(params: Partial<AnimeFilterParams.Combined>): void {
		const currentParams = { ...this.activatedRoute.snapshot.queryParams };
		const newParams = { ...currentParams, ...params };

		this.router.navigate([], {
			relativeTo: this.activatedRoute,
			queryParams: newParams,
			queryParamsHandling: 'merge',
		});
	}
}
