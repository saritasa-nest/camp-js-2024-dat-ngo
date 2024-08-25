import { Injectable } from '@angular/core';
import { UserDto } from '@js-camp/core/dtos/user.dto';
import { User } from '@js-camp/core/models/user';
import { TMapper } from '@js-camp/core/types/mapper';

/** User mapper . */
@Injectable({ providedIn: 'root' })
export class UserMapper implements TMapper<UserDto, User> {
	/** @inheritdoc */
	public fromDto(dto: UserDto): User {
		return new User({
			email: dto.email,
			firstName: dto.first_name,
			lastName: dto.last_name,
			avatar: dto.avatar,
		});
	}

	/** @inheritdoc */
	public toDto(model: User): UserDto {
		return {
			email: model.email,
			first_name: model.firstName,
			last_name: model.lastName,
			avatar: model.avatar,
		};
	}
}
