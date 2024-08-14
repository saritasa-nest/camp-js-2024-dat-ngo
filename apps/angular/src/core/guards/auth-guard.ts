import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { map } from 'rxjs';

import { PATHS } from '@js-camp/core/utils/paths';

import { UserService } from '../services/user.service';

type AuthGuardParams = {

	/**
	 * Whether guard is configured for currently authorized user or not.
	 * If 'true', guard will prevent a current user from accessing a route if he is not authorized.
	 * If 'false', guard will prevent a current user from accessing a route if he is authorized.
	 */
	readonly isAuthorized: boolean;
};

/**
 * Auth guard.
 * @param isAuthorized The route required authorization or not.
 * @returns CanMatchFn.
 */
export function authGuard({ isAuthorized }: AuthGuardParams): CanMatchFn {
	return () => {
		const userService = inject(UserService);
		const router = inject(Router);
		return userService.isAuthorized$.pipe(
			map((isUserAuthorized) => {
				if (isAuthorized) {
					return isUserAuthorized ? true : router.parseUrl(PATHS.login);
				}

				return isUserAuthorized ? router.parseUrl(PATHS.home) : true;
			})
		);
	};
}
