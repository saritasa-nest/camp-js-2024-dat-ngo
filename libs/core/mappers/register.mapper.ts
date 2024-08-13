import { Injectable } from '@angular/core';
import { UserSecretDto } from '../dtos/user-secret.dto';
import { UserSecret } from '../models/user-secret';
import { TMapper, TMapperToDto } from '../types/mapper';
import { RegisterDto } from '../dtos/register.dto';
import { Register } from '../models/register';

/** UserSecret Mappper. */
@Injectable({
	providedIn: 'root',
})
export class RegisterMapper implements TMapperToDto<RegisterDto, Register> {
	public toDto(
		registerData: Register
	): Readonly<{ email: string; first_name: string; last_name: string; avatar: string; password: string }> {
		return {
			email: registerData.email,
			first_name: registerData.firstName,
			last_name: registerData.lastName,
			avatar: registerData.avatar,
			password: registerData.password,
		};
	}
}
