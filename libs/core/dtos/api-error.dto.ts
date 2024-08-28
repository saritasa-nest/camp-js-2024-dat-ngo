import { ErrorDetailDto } from './error-detail.dto';

/** Api error. */
export type ApiErrorDto = {
	type: string;
	errors: readonly ErrorDetailDto[];
};
