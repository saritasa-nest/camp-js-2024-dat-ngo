import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppUrlsConfig } from '@js-camp/angular/shared/app-url';
import { UserSecretDto } from '@js-camp/core/dtos/user-secret.dto';
import { LoginMapper } from '@js-camp/core/mappers/login.mapper';
import { UserSecretMapper } from '@js-camp/core/mappers/user-secret.mapper';
import { Login } from '@js-camp/core/models/login';
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

	public login(loginData: Login): Observable<UserSecret> {
		console.log(1, this.loginDataMapper.toDto(loginData));
		const data = this.loginDataMapper.toDto(loginData);
		return this.httpClient
			.post<UserSecretDto>(this.appUrlConfig.auth.login, data)
			.pipe(tap((data) => console.log(1)))
			.pipe(map((secret) => this.userSecretMapper.fromDto(secret)));
	}
}
