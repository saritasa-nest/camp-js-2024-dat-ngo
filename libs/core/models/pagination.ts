import { Immerable, OmitImmerable } from './immerable';

/** Pagination class. */
export class Pagination<T> extends Immerable {
	/** Total count of items. */
	public readonly totalCount: number;

	/** Next page of items. */
	public readonly hasNext: boolean;

	/** Previous page of items. */
	public readonly hasPrevious: boolean;

	/** Array of items requested. */
	public readonly items: readonly T[];

	public constructor(data: PaginationConstructorData<T>) {
		super();
		this.items = data.items;
		this.totalCount = data.totalCount;
		this.hasNext = data.hasNext;
		this.hasPrevious = data.hasPrevious;
	}
}

/** Pagination Type. */
type PaginationConstructorData<T> = OmitImmerable<Pagination<T>>;
