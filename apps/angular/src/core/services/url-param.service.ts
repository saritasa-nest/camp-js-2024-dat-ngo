import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/** Service for handling URL query params. */
@Injectable({
	providedIn: 'root',
})
export class UrlParamsService {
	private readonly activatedRoute = inject(ActivatedRoute);

	private readonly router = inject(Router);

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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public append(params: Record<string, unknown>): void {
		const paramsWithoutUndefinedField = this.removeUndefinedFields(params);
		this.router.navigate([], {
			queryParams: paramsWithoutUndefinedField,
			relativeTo: this.activatedRoute,
			queryParamsHandling: 'merge',
		});
	}

	/**
	 * Append the query params and reset the page number on URL.
	 * @param params Params to append.
	 * @param defaultPageNumber Default page number to reset.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public appendAndResetPageNumber(params: Record<string, any>, defaultPageNumber: number): void {
		return this.append({ ...params, pageNumber: defaultPageNumber });
	}
}
