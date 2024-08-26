import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { defer, Observable, of, tap } from 'rxjs';
import { AnimeDetail } from '@js-camp/core/models/anime-detail';
import { MatCardModule } from '@angular/material/card';
import { EmptyPipe } from '@js-camp/angular/core/pipes/empty.pipe';
import { MatTabsModule } from '@angular/material/tabs';

/** Anime detail. */
@Component({
	selector: 'camp-anime-detail',
	standalone: true,
	imports: [CommonModule, MatCardModule, EmptyPipe, MatTabsModule],
	templateUrl: './anime-detail.component.html',
	styleUrl: './anime-detail.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailComponent {
	private readonly route = inject(ActivatedRoute);

	private readonly animeService = inject(AnimeService);

	private readonly animeId = this.route.snapshot.paramMap.get('id');

	/** Anime detail. */
	protected readonly animeDetail$: Observable<AnimeDetail | null>;

	public constructor() {
		console.log("hello:", this.animeId)
		this.animeDetail$ = defer(() => (this.animeId ? this.animeService.getAnimeDetail(this.animeId) : of(null))).pipe(
			tap((data) => console.log(data)),
		);
	}
}
