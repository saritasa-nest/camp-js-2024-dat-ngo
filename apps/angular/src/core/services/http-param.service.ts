import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/** Http Params Service. */
@Injectable({
	providedIn: 'root',
})
export class HttpParamsService {
	/** Build an HTTP params from the URL hold the URL.
	 * @param params Filter Params.
	 */
	public buildHttpParamsFromDto<T extends object>(params: T): HttpParams {
		return Object.keys(params).reduce((httpParams, key) => {
			const value = params[key as keyof T];
			if (value != null) {
				return httpParams.set(key, value.toString());
			}
			return httpParams;
		}, new HttpParams());
	}
}
