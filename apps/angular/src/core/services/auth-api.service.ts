import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppUrlsConfig } from '@js-camp/angular/shared/app-url';
import { UserSecretDto } from '@js-camp/core/dtos/user-secret.dto';
import { LoginMapper } from '@js-camp/core/mappers/login.mapper';
import { RegisterMapper } from '@js-camp/core/mappers/registration.mapper';
import { UserSecretMapper } from '@js-camp/core/mappers/user-secret.mapper';
import { Login } from '@js-camp/core/models/login';
import { Registration } from '@js-camp/core/models/registration';
import { UserSecret } from '@js-camp/core/models/user-secret';
import { map, Observable, tap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthApiService {
	private readonly httpClient = inject(HttpClient);

	private readonly appUrlConfig = inject(AppUrlsConfig);

	private readonly loginDataMapper = inject(LoginMapper);

	private readonly userSecretMapper = inject(UserSecretMapper);

	private readonly registrationMapper = inject(RegisterMapper);

	/**
	 * Login .
	 * @param loginData Login Data from user input.
	 */
	public login(loginData: Login): Observable<UserSecret> {
		const data = this.loginDataMapper.toDto(loginData);
		return this.httpClient
			.post<UserSecretDto>(this.appUrlConfig.auth.login, data)
			.pipe(map((secret) => this.userSecretMapper.fromDto(secret)));
	}

	/**
	 * Refresh token with provided user refreshToken in LocalStorage.
	 * @param secret user tokens.
	 */
	public refreshSecret(secret: UserSecret): Observable<UserSecret> {
		return this.httpClient
			.post<UserSecretDto>(this.appUrlConfig.auth.refresh, this.userSecretMapper.toDto(secret))
			.pipe(map((token) => this.userSecretMapper.fromDto(token)));
	}

	/**
	 * Registers user with the provided credentials.
	 * @param registerData Registration data of user.
	 */
	public register(registerData: Registration): Observable<UserSecret> {
		return this.httpClient
			.post<UserSecretDto>(this.appUrlConfig.auth.register, this.registrationMapper.toDto(registerData))
			.pipe(map((token) => this.userSecretMapper.fromDto(token)));
	}
}
