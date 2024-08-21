import { DateRangeDto } from '../dtos/date-range.dto';
import { DateRange } from '../models/date-range';

export namespace DateRangeMapper {

	/**
	 * Maps dto to model.
	 * @param dto Broadcasted time dto.
	 */
	export function fromDto(dto: DateRangeDto): DateRange {
		return new DateRange({
			startDate: dto.start ? new Date(dto.start) : null,
			endDate: dto.end ? new Date(dto.end) : null,
		});
	}

	/**
	 * Maps dto to model.
	 * @param animeTime Broadcasted time dto.
	 */
	export function toDto(animeTime: DateRange): DateRangeDto {
		return {
			start: animeTime.startDate ? animeTime.startDate.toISOString() : null,
			end: animeTime.endDate ? animeTime.endDate.toISOString() : null,
		};
	}
}
