import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/** Http Params Service. */
@Injectable({
	providedIn: 'root',
})
export class HttpParamsService {
	// TODO (Dat Ngo): Wrong docs
	/** Buldt an HTTP params from the URL hold the URL.
	 * @param params Filter Params.
	 */
	public buildHttpParamsFromDto<T extends object>(params: T): HttpParams {
		let httpParams = new HttpParams();

		Object.keys(params).forEach(key => {
			const value = params[key as keyof T];
			if (value != null) {
				httpParams = httpParams.set(key, value.toString());
			}
		});

		return httpParams;
	}
}
