import { Immerable, OmitImmerable } from './immerable';

/** Anime studio. */
export class AnimeStudioData extends Immerable {

	/** Id. */
	public readonly id: number;

	/** Name. */
	public readonly name: string;

	/** Created date. */
	public readonly createdDate: Date;

	/** Modified date. */
	public readonly modifiedDate: Date;

	/** Type. */
	public readonly image: string;

	public constructor(data: TAnimeStudio) {
		super();
		this.id = data.id;
		this.name = data.name;
		this.createdDate = data.createdDate;
		this.modifiedDate = data.modifiedDate;
		this.image = data.image;
	}
}

type TAnimeStudio = OmitImmerable<AnimeStudioData>;
