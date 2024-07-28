import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AnimeQueryParamsDto } from '@js-camp/core/dtos/url-query.dto';
import { AnimeQueryParamsMapper } from '@js-camp/core/mappers/query-params.mapper';
import { AnimeQueryParams } from '@js-camp/core/models/url-query';

/** Http Params Service. */
@Injectable({
	providedIn: 'root',
})
export class HttpParamsService {
	private readonly animeQueryMapper = inject(AnimeQueryParamsMapper);

	private buildHttpParamsFromDto(params: AnimeQueryParamsDto.Combined): HttpParams {
		let httpParams = new HttpParams();

		Object.keys(params).forEach((key) => {
			const value = params[key as keyof AnimeQueryParamsDto.Combined];
			if (value !== undefined && value !== null) {
				httpParams = httpParams.set(key, value.toString());
			}
		});

		return httpParams;
	}

	/**
	 * Build HttpParams from URL query params.
	 * @param params URL query params.
	 * @returns Http params.
	 */
	public getHttpParams(params: AnimeQueryParams.Combined): HttpParams {
		const dtoQueryParams = this.animeQueryMapper.mapCombinedOptionsToDto(params);
		return this.buildHttpParamsFromDto(dtoQueryParams);
	}
}
