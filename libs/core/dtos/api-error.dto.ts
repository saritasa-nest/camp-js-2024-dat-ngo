import { ErrorDetailDto } from './error-detail.dto';

export type ApiErrorDto = {
	type: string;
	errors: readonly ErrorDetailDto[];
};
