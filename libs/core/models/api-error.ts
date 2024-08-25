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

/**
 * Custom error class to wrap ApiError.
 */
export class ApiErrorExtended extends ApiError implements Error {
	/** Error name. */
	public readonly name: string;

	/** Error message. */
	public readonly message: string;

	public constructor(data: ApiErrorConstructorData, message?: string) {
		super(data);
		this.name = 'ExtendedApiError';
		this.message = message ?? 'An API error occurred';
	}
}

type ApiErrorConstructorData = OmitImmerable<ApiError>;
