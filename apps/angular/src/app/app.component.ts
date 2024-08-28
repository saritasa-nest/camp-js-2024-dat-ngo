import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/** App component. */
@Component({
	selector: 'camp-root',
	templateUrl: './app.component.html',
	standalone: true,
	imports: [RouterModule],
})
export class AppComponent {}
