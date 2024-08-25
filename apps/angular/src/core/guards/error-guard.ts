import { ApiErrorDto } from '@js-camp/core/dtos/api-error.dto';
import { ApiError } from '@js-camp/core/models/api-error';

/**
 * Type guard to check if an unknown object is of type ApiErrorDto.
 * @param error The unknown error object.
 * @returns True if the object is an ApiErrorDto, false otherwise.
 */
export function errorGuardFromDTO(error: unknown): error is ApiErrorDto {
	return (
		typeof error === 'object' && error !== null

	// && Array.isArray((error as ApiErrorDto).errors)
	// &&
	// (error as ApiErrorDto).errors.every((err) => 'code' in err && 'detail' in err && 'attr' in err)
	);
}

/**
 * Type guard to check if an unknown object is of type ApiError.
 * @param error The unknown error object.
 * @returns True if the object is an ApiError, false otherwise.
 */
export function errorGuard(error: unknown): error is ApiError {
	return typeof error === 'object' && error !== null && Array.isArray((error as ApiError).error);
}
