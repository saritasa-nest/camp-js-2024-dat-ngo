import { Injectable } from '@angular/core';
import { environment } from '@js-camp/angular/environments/environment';

/**
 * Urls used within the application.
 * Stringified for convenience, since most of the Angular's HTTP tools work with strings.
 */
@Injectable({ providedIn: 'root' })
export class AppUrlsConfig {
	private readonly baseUrl = environment.apiURL;
	public readonly apiKey = environment.apiKey;

	/** Anime-related routes. */
	public readonly anime = {
		list: this.toApi('anime/anime/'),
	};

	/** Auth-related routes. */
	public readonly auth = {
		login: this.toApi('auth/login/'),
		register: this.toApi('auth/register/'),
		refresh: this.toApi('auth/token/refresh/'),
	};

	/** Users-related routes. */
	public readonly users = {
		profile: this.toApi('users/profile/'),
	};

	/**
	 * Generate Api urls as an constant.
	 * @param args Multiple relative path.
	 */
	private toApi(...args: string[]): string {
		const relativePath = args.join('/');
		return new URL(relativePath, this.baseUrl).toString();
	}
}
