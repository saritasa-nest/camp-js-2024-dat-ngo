import { BroadCastedTimeDto } from '../dtos/broadcasted-time.dto';
import { BroadCastedTime } from '../models/broadcasted-time.model';

export namespace broadCastedTimeMapper {

	/**
	 * Maps dto to model.
	 * @param dto Broadcasted time dto.
	 */
	export function fromDto(dto: BroadCastedTimeDto): BroadCastedTime {
		return new BroadCastedTime({
			startDate: dto.start ? new Date(dto.start) : null,
			endDate: dto.end ? new Date(dto.end) : null,
		});
	}

	/**
	 * Maps dto to model.
	 * @param animeTime Broadcasted time dto.
	 */
	export function toDto(animeTime: BroadCastedTime): BroadCastedTimeDto {
		return {
			start: animeTime.startDate ? animeTime.startDate.toISOString() : null,
			end: animeTime.endDate ? animeTime.endDate.toISOString() : null,
		};
	}
}
