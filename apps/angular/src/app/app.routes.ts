import { Routes } from '@angular/router';

import { authGuard } from '../core/guards/auth-guard';

/** Routes object. */
export const appRoutes: Routes = [
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
				canMatch: [authGuard({ isAuthorized: false })],
			},
			{
				path: 'signup',
				loadComponent: () => import('./auth/components/signup/signup.component').then((c) => c.SignupComponent),
				canMatch: [authGuard({ isAuthorized: false })],
			},
			{ path: '', redirectTo: 'signin', pathMatch: 'full' },
		],
	},
	{
		path: '',
		loadComponent: () => import('./features/home/home.component').then((c) => c.HomeComponent),
		canMatch: [authGuard({ isAuthorized: true })],
	},
	{
		path: 'test',
		loadComponent: () => import('./name-editor/name-editor.component').then((c) => c.NameEditorComponent),
		canMatch: [authGuard({isAuthorized: false})],
	},
];
