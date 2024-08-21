import { Injectable } from '@angular/core';

import { ApiErrorDto } from '../dtos/api-error.dto';
import { ApiError } from '../models/api-error';
import { ErrorDetail } from '../models/error-detail';
import { TMapperFromDto } from '../types/mapper';
import { ErrorDetailDto } from '../dtos/error-detail.dto';

const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again later.';

/** Api error mapper. */
@Injectable({ providedIn: 'root' })
export class ApiErrorMapper implements TMapperFromDto<ApiErrorDto, ApiError> {
	/**
	 * Maps DTO to model.
	 * @param dto API error DTO.
	 * @returns API error model.
	 */
	public fromDto(dto: ApiErrorDto): ApiError {
		return new ApiError({
			error: dto.errors.map((error: ErrorDetailDto): ErrorDetail => {
				const detail = error.detail ?? DEFAULT_ERROR_MESSAGE;
				return new ErrorDetail({
					detail,
					attr: error.attr,
				});
			}),
		});
	}
}
