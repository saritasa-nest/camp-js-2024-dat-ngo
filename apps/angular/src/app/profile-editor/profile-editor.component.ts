import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
@Component({
	selector: 'camp-profile-editor',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './profile-editor.component.html',
	styleUrl: './profile-editor.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileEditorComponent {
	public constructor(private formBuilder: FormBuilder) {}

	profileForm1 = new FormGroup({
		firstName: new FormControl(''),
		lastName: new FormControl(''),
		address: new FormGroup({
			street: new FormControl(''),
			city: new FormControl(''),
			state: new FormControl(''),
			zip: new FormControl(''),
		}),
	});

	profileForm = this.formBuilder.group({
		firstName: ['', Validators.required],
		lastName: [''],
		address: this.formBuilder.group({
			street: [''],
			city: [''],
			state: [''],
			zip: [''],
		}),
		aliases: this.formBuilder.array([this.formBuilder.control('')]),
	});

	protected onSubmit() {
		// TODO: Use EventEmitter with form value
		console.warn(this.profileForm.value);
	}

	protected updateProfile() {
		this.profileForm.patchValue({
			firstName: 'Nancy',
			address: {
				street: '123 Drew Street',
			},
		});
	}

	protected get aliases() {
		return this.profileForm.get('aliases') as FormArray;
	}

	protected addAlias() {
		this.aliases.push(this.formBuilder.control(''));
	}
}
