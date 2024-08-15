import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppUrlsConfig } from '@js-camp/angular/shared/app-url';
import { UserDto } from '@js-camp/core/dtos/user.dto';
import { UserMapper } from '@js-camp/core/mappers/user.mapper';
import { User } from '@js-camp/core/models/user';
import { map, Observable } from 'rxjs';

/** User api service. */
@Injectable({
	providedIn: 'root',
})
export class UserApiService {
	private readonly httpClient = inject(HttpClient);

	private readonly appUrlConfig = inject(AppUrlsConfig);

	private readonly userMapper = inject(UserMapper);

	/** Get current user. */
	public getCurrentUser(): Observable<User> {
		return this.httpClient
			.get<UserDto>(this.appUrlConfig.users.profile)
			.pipe(map(data => this.userMapper.fromDto(data)));
	}
}
