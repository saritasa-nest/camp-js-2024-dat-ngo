import { Injectable } from '@angular/core';

import { TMapperToDto } from '@js-camp/core/types/mapper';
import { RegistrationDto } from '@js-camp/core/dtos/register.dto';
import { Registration } from '@js-camp/core/models/registration';

/** UserSecret Mappper. */
@Injectable({
	providedIn: 'root',
})
export class RegisterMapper implements TMapperToDto<RegistrationDto, Registration> {
	/** @inheritdoc */
	public toDto(
		registerData: Registration,
	): Readonly<{ email: string; first_name: string; last_name: string; password: string; }> {
		return {
			email: registerData.email,
			first_name: registerData.firstName,
			last_name: registerData.lastName,
			password: registerData.password,
		};
	}
}
