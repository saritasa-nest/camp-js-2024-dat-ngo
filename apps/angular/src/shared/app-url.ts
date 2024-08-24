import { Injectable } from '@angular/core';
import { environment } from '@js-camp/angular/environments/environment';

/**
 * Urls used within the application.
 * Stringified for convenience, since most of the Angular's HTTP tools work with strings.
 */
@Injectable({ providedIn: 'root' })
export class AppUrlsConfig {
	private readonly baseUrl = environment.apiURL;

	/** Anime-related routes. */
	public readonly anime = {
		list: this.toApi('anime', 'anime'),
	};

	/**
	 * Generate Api urls as an constant.
	 * @param args Multiple relative path.
	 */
	private toApi(...args: readonly string[]): string {
		const relativePath = args.join('/');
		const finalPath = `${relativePath}/`;
		return new URL(finalPath, this.baseUrl).toString();
	}
}
