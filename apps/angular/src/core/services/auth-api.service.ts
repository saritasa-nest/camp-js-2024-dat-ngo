import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppUrlsConfig } from '@js-camp/angular/shared/app-url';
import { UserSecretDto } from '@js-camp/core/dtos/user-secret.dto';
import { ApiErrorMapper } from '@js-camp/core/mappers/api-error.mapper';
import { LoginMapper } from '@js-camp/core/mappers/login.mapper';

import { Login } from '@js-camp/core/models/login';
import { Registration } from '@js-camp/core/models/registration';
import { UserSecret } from '@js-camp/core/models/user-secret';
import { catchError, map, Observable, throwError } from 'rxjs';

import { ApiError } from '@js-camp/core/models/api-error';

import { UserSecretMapper } from '../mappers/user-secret.mapper';
import { RegisterMapper } from '../mappers/registration.mapper';

import { errorGuardFromDTO } from '../guards/error-guard';

/** Auth api service. */
@Injectable({
	providedIn: 'root',
})
export class AuthApiService {
	private readonly httpClient = inject(HttpClient);

	private readonly appUrlConfig = inject(AppUrlsConfig);

	private readonly loginDataMapper = inject(LoginMapper);

	private readonly userSecretMapper = inject(UserSecretMapper);

	private readonly registrationMapper = inject(RegisterMapper);

	private readonly apiErrorMapper = inject(ApiErrorMapper);

	/**
	 * Login.
	 * @param loginData Login Data from user input.
	 */
	public login(loginData: Login): Observable<UserSecret> {
		const data = this.loginDataMapper.toDto(loginData);
		return this.httpClient.post<UserSecretDto>(this.appUrlConfig.auth.login, data).pipe(
			catchError((error: unknown) => {
				let mappedError: Error;
				if (error instanceof HttpErrorResponse) {
					if (errorGuardFromDTO(error.error)) {
						mappedError = new Error(JSON.stringify(this.apiErrorMapper.fromDto(error.error)));
					}
				}

				// Return the Error instance to comply with the rule
				return throwError(() => mappedError);
			}),
			map((secret) => this.userSecretMapper.fromDto(secret))
		);
	}

	/**
	 * Refresh token with provided user refreshToken in LocalStorage.
	 * @param secret User tokens.
	 */
	public refreshSecret(secret: UserSecret): Observable<UserSecret> {
		return this.httpClient
			.post<UserSecretDto>(this.appUrlConfig.auth.refresh, this.userSecretMapper.toDto(secret))
			.pipe(
				catchError((error: unknown) => {
					let mappedError: ApiError;
					if (error instanceof HttpErrorResponse) {
						if (errorGuardFromDTO(error.error)) {
							mappedError = this.apiErrorMapper.fromDto(error.error);
						}
					}

					// Return the Error instance to comply with the rule
					return throwError(() => mappedError);
				}),
				map((token) => this.userSecretMapper.fromDto(token))
			);
	}

	/**
	 * Registers user with the provided credentials.
	 * @param registerData Registration data of user.
	 */
	public register(registerData: Registration): Observable<UserSecret> {
		return this.httpClient
			.post<UserSecretDto>(this.appUrlConfig.auth.register, this.registrationMapper.toDto(registerData))
			.pipe(
				catchError((error: unknown) => {
					let mappedError: ApiError;
					if (error instanceof HttpErrorResponse) {
						if (errorGuardFromDTO(error.error)) {
							mappedError = this.apiErrorMapper.fromDto(error.error);
						}
					}

					// Return the Error instance to comply with the rule
					return throwError(() => mappedError);
				}),
				map((token) => this.userSecretMapper.fromDto(token))
			);
	}
}
