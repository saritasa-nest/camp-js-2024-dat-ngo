import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeCatalogComponent } from '@js-camp/angular/app/features/anime/anime-catalog/anime-catalog.component';

describe('AnimeCatalogComponent', () => {
	let component: AnimeCatalogComponent;
	let fixture: ComponentFixture<AnimeCatalogComponent>;

	beforeEach(async() => {
		await TestBed.configureTestingModule({
			imports: [AnimeCatalogComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(AnimeCatalogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
