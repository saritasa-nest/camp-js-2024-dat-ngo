import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieStatusComponent } from './movie-type.component';

describe('MovieStatusComponent', () => {
	let component: MovieStatusComponent;
	let fixture: ComponentFixture<MovieStatusComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MovieStatusComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(MovieStatusComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
