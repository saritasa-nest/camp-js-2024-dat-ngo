import { Injectable } from '@angular/core';
import { LoginDto } from '../dtos/login.dto';
import { Login } from '../models/login';
import { TMapperToDto } from '../types/mapper';
// TODO (Dat Ngo): Why Angular classes are in libs/core, other frameworks cannot use the Injectable.
@Injectable({
	providedIn: 'root',
})
export class LoginMapper implements TMapperToDto<LoginDto, Login> {
// TODO (Dat Ngo): Missing JSDocs comments.
	toDto(loginData: Login): LoginDto {
		return {
			email: loginData.email,
			password: loginData.password,
		};
	}
}
