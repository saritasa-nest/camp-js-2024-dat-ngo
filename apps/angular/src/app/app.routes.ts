import { Routes } from '@angular/router';

/** Routes object. */
export const appRoutes: Routes = [
	{
		path: '',
		loadComponent: () => import('./features/home/home.component').then((c) => c.HomeComponent),
	},
	{
		path: 'auth',
		loadComponent: () => import('./auth/auth.component').then((c) => c.AuthComponent),
		children: [
			{
				path: 'signin',
				loadComponent: () =>
					import('./auth/components/authorization-form/authorization-form.component').then(
						(c) => c.AuthorizationFormComponent
					),
			},
			{
				path: 'signup',
				loadComponent: () =>
					import('./auth/components/signup/signup.component').then(
						(c) => c.SignupComponent
					),
			},
			{ path: '', redirectTo: 'signin', pathMatch: 'full' },
		],
	},
	{
		path: 'test',
		loadComponent: () =>
			import('./auth/components/authorization-form/authorization-form.component').then(
				(c) => c.AuthorizationFormComponent
			),
	},
	{
		path: 'test2',
		loadComponent: () => import('./profile-editor/profile-editor.component').then((c) => c.ProfileEditorComponent),
	},
];
