import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeTableComponent } from './anime-table.component';

describe('AnimeTableComponent', () => {
	let component: AnimeTableComponent;
	let fixture: ComponentFixture<AnimeTableComponent>;

	beforeEach(async() => {
		await TestBed.configureTestingModule({
			imports: [AnimeTableComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(AnimeTableComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
