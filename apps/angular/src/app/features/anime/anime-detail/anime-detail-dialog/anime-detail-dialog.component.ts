import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

type ImageDialogData = {

	/** Source. */
	source: string | null;

	/** Title. */
	title: string;

	/** Studio. */
	studios: string;
};

/** Anime dialog component. */
@Component({
	selector: 'camp-anime-detail-dialog',
	standalone: true,
	imports: [],
	templateUrl: './anime-detail-dialog.component.html',
	styleUrl: './anime-detail-dialog.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailDialogComponent {

	/** Image dialog data. */
	protected readonly dialogData = inject<ImageDialogData>(MAT_DIALOG_DATA);
}
