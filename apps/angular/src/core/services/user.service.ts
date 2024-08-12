import { inject, Injectable } from '@angular/core';

import {
	first,
	ignoreElements,
	map,
	merge,
	Observable,
	of,
	OperatorFunction,
	pipe,
	shareReplay,
	switchMap,
	tap,
} from 'rxjs';
import { Login } from '@js-camp/core/models/login';
import { UserSecret } from '@js-camp/core/models/user-secret';

import { User } from '@js-camp/core/models/user';

import { UserSecretStorageService } from './user-secret-storage.service';
import { AuthApiService } from './auth-api.service';
import { UserApiService } from './user-api.service';

@Injectable({ providedIn: 'root' })
export class UserService {
	private readonly authService = inject(AuthApiService);

	/** Current user. `null` when a user is not logged in. */
	public readonly currentUser$;

	/** Whether the current user is authorized. */
	public readonly isAuthorized$: Observable<boolean>;

	private readonly userSecretStorage = inject(UserSecretStorageService);

	private readonly userApiService = inject(UserApiService);

	public constructor() {
		this.currentUser$ = this.initCurrentUserStream();
		console.log(123213);

		// this.currentUser$.subscribe((data) => console.log('User: ', data));
		this.isAuthorized$ = this.currentUser$.pipe(map(user => user != null));

		// this.isAuthorized$.subscribe(data=>console.log("auth: ", data))
	}

	/**
	 * Login a user with email and password.
	 * @param loginData Login data.
	 */
	public login(loginData: Login): Observable<void> {
		return this.authService.login(loginData).pipe(this.saveSecretAndWaitForAuthorized());
	}

	/**
	 * Logout current user.
	 */
	// public logout(): Observable<void> {
	// 	const logOutActions$ = merge(this.userSecretStorage.removeSecret());

	// 	return this.authService.logout().pipe(
	// 		switchMap(() => logOutActions$),
	// 		catchError(() => logOutActions$)
	// 	);
	// }

	private saveSecretAndWaitForAuthorized(): OperatorFunction<UserSecret, void> {
		return pipe(
			switchMap(secret => {
				const saveUserSecretSideEffect$ = this.userSecretStorage.saveSecret(secret).pipe(ignoreElements());

				return merge(this.isAuthorized$, saveUserSecretSideEffect$);
			}),
			first(isAuthorized => isAuthorized),
			map(() => undefined),
		);
	}

	private initCurrentUserStream(): Observable<User | null> {
		console.log('save');
		return this.userSecretStorage.currentSecret$.pipe(
			switchMap(secret => (secret ? this.userApiService.getCurrentUser() : of(null))),
			shareReplay({ bufferSize: 1, refCount: false }),
		);
	}
}
