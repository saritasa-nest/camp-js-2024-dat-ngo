import { LoginDto } from '../dtos/login.dto';
import { Login } from '../models/login';
import { TMapperToDto } from '../types/mapper';

export class LoginMapper implements TMapperToDto<LoginDto, Login> {
	toDto(loginData: Login): LoginDto {
		return {
			email: loginData.email,
			password: loginData.password,
		};
	}
}
