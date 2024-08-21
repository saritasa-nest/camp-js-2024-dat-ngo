import { Injectable } from '@angular/core';
import { ApiErrorDto } from '../dtos/api-error.dto';
import { ApiError } from '../models/api-error';
import { ErrorDetail } from '../models/error-detail';
import { TMapperFromDto } from '../types/mapper';

const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again later.';

// TODO (Dat Ngo): Why Angular classes are in libs/core, other frameworks cannot use the Injectable.
// TODO (Dat Ngo): Missing JSDoc comment.
@Injectable({ providedIn: 'root' })
export class ApiErrorMapper implements TMapperFromDto<ApiErrorDto, ApiError> {
	/**
	 * Maps DTO to model.
	 * @param dto API error DTO.
	 * @returns API error model.
	 */
	public fromDto(dto: ApiErrorDto): ApiError {
		return new ApiError({
			// TODO (Dat Ngo): Missing JSDoc comment. Add type for error.
			error: dto.errors.map((error) => {
				const detail = error.detail ?? DEFAULT_ERROR_MESSAGE;
				return new ErrorDetail({
					detail,
					attr: error.attr,
				});
			}),
		});
	}
}
