import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AnimeQueryParamsDto } from '@js-camp/core/dtos/url-query.dto';
import { AnimeFiltersParamsMapper } from '@js-camp/core/mappers/filter-params.mapper';
import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';

/** Http Params Service. */
@Injectable({
	providedIn: 'root',
})
export class HttpParamsService {

	public buildHttpParamsFromDto<T extends object>(params: T): HttpParams {
		let httpParams = new HttpParams();

		Object.keys(params).forEach((key) => {
			const value = params[key as keyof T];
			if (value != null) {
				httpParams = httpParams.set(key, value.toString());
			}
		});

		return httpParams;
	}

}
