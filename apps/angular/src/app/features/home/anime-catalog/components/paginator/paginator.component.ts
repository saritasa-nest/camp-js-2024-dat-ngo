import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

/** Paginator.  */
@Component({
	selector: 'camp-paginator',
	standalone: true,
	imports: [CommonModule, MatPaginatorModule],
	templateUrl: './paginator.component.html',
	styleUrl: './paginator.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {

	// TODO (Dat Ngo): Put Input and Output correctly.

	/** Paginator page number. */
	@Input()
	public pageNumber: number | null = null;

	/** Paginator page size. */
	@Input()
	public pageSize: number | null = null;

	/** Page size options. */
	protected readonly pageSizeOptions = [5, 10, 25, 100] as const;

	/** Total amount of fetched items. */
	@Input()
	public totalCount = 0;

	/** Event emitter for page changing. */
	@Output()
	public pageChange = new EventEmitter<PageEvent>();

	/**
	 * Emit the page event.
	 * @param event The page event.
	 */
	public onPageChange(event: PageEvent): void {
		this.pageChange.emit(event);
	}
}
