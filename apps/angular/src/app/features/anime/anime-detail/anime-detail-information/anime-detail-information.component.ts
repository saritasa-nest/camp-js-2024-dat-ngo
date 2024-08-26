import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeDetail } from '@js-camp/core/models/anime-detail';
import { EmptyPipe } from '@js-camp/angular/core/pipes/empty.pipe';

/** Anime detail component. */
@Component({
	selector: 'camp-anime-detail-information',
	standalone: true,
	imports: [CommonModule, EmptyPipe],
	templateUrl: './anime-detail-information.component.html',
	styleUrl: './anime-detail-information.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailInformationComponent {

	/** Anime detail. */
	@Input()
	public animeDetail!: AnimeDetail;

}
