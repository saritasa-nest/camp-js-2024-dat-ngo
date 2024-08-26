export namespace DateTimeMapper {

	/**
	 * Parse Date data type to string.
	 * @param dateStr String of date.
	 * @returns Date.
	 */
	function parseDate(dateStr: string): Date {
		const date = new Date(dateStr);
		if (isNaN(date.getTime())) {
			throw new Error(`Invalid date format: ${dateStr}`);
		}
		return date;
	}

	/**
	 * Parse date from dto string to Date.
	 * @param dto Dto date string.
	 * @returns Return either a valid date or an empty date.
	 */
	export function fromDto(dto: string): Date {
		return parseDate(dto);
	}

	/**
	 * Parse date from model date to string.
	 * @param model String to dto date.
	 * @returns Return either a valid date string or an empty date string.
	 */
	export function toDto(model: Date): string {
		return model.toISOString();
	}
}
