import { Injectable } from '@angular/core';
import { UserDto } from '../dtos/user.dto';
import { User } from '../models/user';
import { TMapper } from '../types/mapper';

// TODO (Dat Ngo): Why Angular classes are in libs/core, other frameworks cannot use the Injectable.
@Injectable({ providedIn: 'root' })
export class UserMapper implements TMapper<UserDto, User> {
	// TODO (Dat Ngo): We should fix linter errors and add JSDocs comments.
	public fromDto(dto: UserDto): User {
		return new User({
			email: dto.email,
			firstName: dto.first_name,
			lastName: dto.last_name,
			avatar: dto.avatar,
			createdAt: new Date(dto.created),
			modifiedAt: new Date(dto.modified),
		});
	}

	// TODO (Dat Ngo): We should fix linter errors and add JSDocs comments.
	public toDto(model: User): UserDto {
		return {
			email: model.email,
			first_name: model.firstName,
			last_name: model.lastName,
			avatar: model.avatar,
			created: model.createdAt.toISOString(),
			modified: model.modifiedAt.toISOString(),
		};
	}
}
