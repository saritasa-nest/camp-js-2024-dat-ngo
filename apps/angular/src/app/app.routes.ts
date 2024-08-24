import { Routes } from '@angular/router';

/** Routes object. */
export const appRoutes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./features/home/home.component').then(c => c.HomeComponent),
	},
];
