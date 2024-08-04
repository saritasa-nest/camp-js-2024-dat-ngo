import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkeletonCellComponent } from './skeleton-cell.component';

describe('SkeletonCellComponent', () => {
	let component: SkeletonCellComponent;
	let fixture: ComponentFixture<SkeletonCellComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SkeletonCellComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SkeletonCellComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
