import { Routes } from '@angular/router';

/** Routes object. */
export const appRoutes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./features/home/home.component').then(c => c.HomeComponent),
	},
	{
		path: 'test',
		loadComponent: () =>
			import('./authorization-form/authorization-form.component').then(c => c.AuthorizationFormComponent),
	},
	{
		path: 'test2',
		loadComponent: () =>
			import('./profile-editor/profile-editor.component').then(c => c.ProfileEditorComponent),
	},
];
