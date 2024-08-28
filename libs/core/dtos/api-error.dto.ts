import { ErrorDetailDto } from './error-detail.dto';

/** Api error. */
export type ApiErrorDto = {
	readonly type: string;
	readonly errors: readonly ErrorDetailDto[];
};
