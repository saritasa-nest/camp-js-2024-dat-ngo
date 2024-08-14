import { Injectable } from '@angular/core';
import { environment } from '@js-camp/angular/environments/environment';

/**
 * Urls used within the application.
 * Stringified for convenience, since most of the Angular's HTTP tools work with strings.
 */
@Injectable({ providedIn: 'root' })
export class AppUrlsConfig {
	private readonly baseUrl = environment.apiURL;

	/** ApiKey */
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

	/**
	 * Determines whether the URL should have its secret intercepted.
	 * @param url The URL to check.
	 * @param urlsToIntercept A list of URL patterns (as strings) that should trigger interception.
	 * @param regexPatterns A list of regular expressions for more complex matching.
	 * @returns True if the URL should be intercepted, false otherwise.
	 */
	public bypassInterceptSecretForUrl(
		url: string,
		urlsToIntercept: string[] = [],
		regexPatterns: RegExp[] = []
	): boolean {
		// Check if the URL matches any of the listed URLs
		if (urlsToIntercept.some((interceptUrl) => url === interceptUrl)) {
			return true;
		}

		// Check if the URL matches any of the regular expression patterns
		if (regexPatterns.some((pattern) => pattern.test(url))) {
			return true;
		}

		// Default to true if no matches are found
		return false;
	}
}
