import { Routes } from '@angular/router';

import { authGuard } from '../core/guards/auth-guard';

/** Routes object. */
export const appRoutes: Routes = [
	{
		path: 'auth',
		loadComponent: () => import('./features/auth/auth.component').then(c => c.AuthComponent),
		children: [
			{
				path: 'signin',
				loadComponent: () => import('./features/auth/components/signin/signin.component').then(c => c.SignInComponent),
				canMatch: [authGuard({ isAuthorized: false })],
			},
			{
				path: 'signup',
				loadComponent: () => import('./features/auth/components/signup/signup.component').then(c => c.SignupComponent),
				canMatch: [authGuard({ isAuthorized: false })],
			},
			{ path: '', redirectTo: 'signin', pathMatch: 'full' },
		],
	},
	{
		path: '',
		title: 'Home',
		loadComponent: () => import('./features/anime/home.component').then(c => c.HomeComponent),
	},
	{
		path: 'anime/:id',
		title: 'Anime Detail',
		loadComponent: () =>
			import('./features/anime/anime-detail/anime-detail.component').then(c => c.AnimeDetailComponent),
		canMatch: [authGuard({ isAuthorized: true })],
	},
];
