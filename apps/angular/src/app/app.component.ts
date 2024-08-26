import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

/** App component. */
@Component({
	selector: 'camp-root',
	templateUrl: './app.component.html',
	standalone: true,
	imports: [RouterModule, ReactiveFormsModule],
})
export class AppComponent {}
