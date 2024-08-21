import { Injectable } from '@angular/core';
import { UserSecretDto } from '../dtos/user-secret.dto';
import { UserSecret } from '../models/user-secret';
import { TMapper } from '../types/mapper';

// TODO (Dat Ngo): Why Angular classes are in libs/core, other frameworks cannot use the Injectable.
/** UserSecret Mappper. */
@Injectable({
	providedIn: 'root',
})
export class UserSecretMapper implements TMapper<UserSecretDto, UserSecret> {
	/**
	 * Maps dto to model.
	 * @param dto User secret dto.
	 */
	public fromDto(dto: UserSecretDto): UserSecret {
		return new UserSecret({
			accessToken: dto.access,
			refreshToken: dto.refresh,
		});
	}

	/**
	 * Maps model to Dto.
	 * @param model User secret.
	 */
	public toDto(model: UserSecret): UserSecretDto {
		return {
			access: model.accessToken,
			refresh: model.refreshToken,
		};
	}
}
