import { ErrorDetail } from './error-detail';
import { Immerable, OmitImmerable } from './immerable';

/** Api Error. */
export class ApiError extends Immerable {
	/** Array of errors. */
	public readonly error: ErrorDetail[];

	public constructor(data: ApiErrorConstructorData) {
		super();
		this.error = data.error;
	}
}
type ApiErrorConstructorData = OmitImmerable<ApiError>;
