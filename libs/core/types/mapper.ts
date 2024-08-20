/** Mapper of DTO to Domain models. */
export type MapperFromDto<TDto, TDomain> = {

	/** Maps from DTO to Domain model. */
	fromDto(dto: TDto): TDomain;
};

/** Mapper of Domain models to DTO. */
export type MapperToDto<TDto, TDomain> = {

	/** Maps from Domain models to DTO. */
	toDto(dto: TDomain): TDto;
};

/** Custom Mapper function. */
export type MapperFunction<TDto, TDomain> = (dto: TDto) => TDomain;

/** Mapper from DTO to Domain model and vice versa. */
export type Mapper<TDto, TDomain> = MapperFromDto<TDto, TDomain> & MapperToDto<TDto, TDomain>;
