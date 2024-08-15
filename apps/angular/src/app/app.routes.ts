import { Routes } from '@angular/router';

/** Routes object. */
export const appRoutes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./features/anime/anime.component').then(c => c.AnimeComponent),
	},
];
