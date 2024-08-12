import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { UserService } from '../services/user.service';
import { PATHS } from '@js-camp/core/utils/paths';
type AuthGuardParams = {
	/**
	 * Whether guard is configured for currently authorized user or not.
	 * If 'true', guard will prevent a current user from accessing a route if he is not authorized.
	 * If 'false', guard will prevent a current user from accessing a route if he is authorized.
	 */
	readonly isAuthorized: boolean;
};

export function authGuard({ isAuthorized }: AuthGuardParams): CanMatchFn {
	console.log(1);
	return () => {
		const userService = inject(UserService);
		const router = inject(Router);

		return userService.isAuthorized$.pipe(
			map((isUserAuthorized) => {
				console.log({isUserAuthorized,isAuthorized})
				if (isAuthorized) {
					return isUserAuthorized ? true : router.parseUrl(PATHS.login);
				}

				return isUserAuthorized ? router.parseUrl(PATHS.home) : true;
			})
		);
	};
}
