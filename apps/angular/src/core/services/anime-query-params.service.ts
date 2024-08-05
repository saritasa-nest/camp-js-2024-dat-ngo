import { inject, Injectable } from "@angular/core";
import { AnimeQueryParamsMapper } from "@js-camp/core/mappers/url-params.mapper";
import { UrlParamsService } from "./url-param.service";
import { AnimeFilterParams } from "@js-camp/core/models/anime-filter-params";
import { DEFAULT_PAGINATION } from "@js-camp/core/const/pagination";

/** Anime query params service. */
@Injectable({ providedIn: 'root' })
export class AnimeQueryParamsService {
	private animeQueryParams = inject(AnimeQueryParamsMapper);
	private queryParamsService = inject(UrlParamsService);

	/**
	 * Append query params.
	 * @param params Anime filter params.
	 */
	public append(params: Partial<AnimeFilterParams.Combined>): void {
		const queryParams = this.animeQueryParams.toDto(params);
		this.queryParamsService.append(queryParams);
	}

	/**
	 * Append provide query params and reset page number params to the URL.
	 * @param params Anime filter params to append.
	 */
	public appendParamsAndResetPageNumber(params: Partial<AnimeFilterParams.Combined>): void {
		const queryParams = this.animeQueryParams.toDto(params);
		return this.queryParamsService.appendAndResetPageNumber(queryParams, DEFAULT_PAGINATION.pageNumber);
	}
}
