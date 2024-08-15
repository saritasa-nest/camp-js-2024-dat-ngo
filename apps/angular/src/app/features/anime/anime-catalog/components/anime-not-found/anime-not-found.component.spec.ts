import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeNotFoundComponent } from '@js-camp/angular/app/features/anime/anime-catalog/components/movie-not-found/movie-not-found.component';

describe('AnimeNotFoundComponent', () => {
	let component: AnimeNotFoundComponent;
	let fixture: ComponentFixture<AnimeNotFoundComponent>;

	beforeEach(async() => {
		await TestBed.configureTestingModule({
			imports: [AnimeNotFoundComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(AnimeNotFoundComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
