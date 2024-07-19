import { Component, inject, OnInit } from '@angular/core';
import { Anime } from '@js-camp/core/models/anime.model';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
@Component({
	selector: 'camp-example',
	styleUrl: 'example.component.css',
	templateUrl: 'example.component.html',
	standalone: true,
	imports: [MatTableModule],
})
export class ExampleComponent implements OnInit {
	private readonly animeService = inject(AnimeService);

	public dataSource = new MatTableDataSource<Anime>();

	public constructor() {}

	public ngOnInit(): void {
		this.animeService.getAllAnime().subscribe((res) => {
			this.dataSource.data = [...res.results];
			console.log(1, this.dataSource);
		});
		console.log(2, this.dataSource);
	}

	displayedColumns: string[] = ['Image', 'English Title', 'Japanese Title', 'Broadcasted Date', 'Type', 'Status'];
}
