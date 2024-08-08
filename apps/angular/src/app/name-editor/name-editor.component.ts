import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'camp-name-editor',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './name-editor.component.html',
	styleUrl: './name-editor.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NameEditorComponent {

	protected name = new FormControl('');

	protected updateName() {
    this.name.setValue('Nancy');
  }
}
