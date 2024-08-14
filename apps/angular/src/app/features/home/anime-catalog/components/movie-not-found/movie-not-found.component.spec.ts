import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieNotFoundComponent } from './movie-not-found.component';

describe('MovieNotFoundComponent', () => {
	let component: MovieNotFoundComponent;
	let fixture: ComponentFixture<MovieNotFoundComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MovieNotFoundComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(MovieNotFoundComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
