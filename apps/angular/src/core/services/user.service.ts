import { inject, Injectable } from '@angular/core';

import {
	catchError,
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
	take,
	tap,
	throwError,
} from 'rxjs';
import { Login } from '@js-camp/core/models/login';
import { UserSecret } from '@js-camp/core/models/user-secret';

import { User } from '@js-camp/core/models/user';

import { UserSecretStorageService } from './user-secret-storage.service';
import { AuthApiService } from './auth-api.service';
import { UserApiService } from './user-api.service';
import { Registration } from '@js-camp/core/models/registration';

/** User service. */
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
		this.isAuthorized$ = this.currentUser$.pipe(
			map((user) => user != null)
		);
	}

	/**
	 * Login a user with email and password.
	 * @param loginData Login data.
	 */
	public login(loginData: Login): Observable<void> {
		return this.authService.login(loginData).pipe(this.saveSecretAndWaitForAuthorized());
	}

	/** Logout current user. */
	public logout(): Observable<void> {
		return this.userSecretStorage.removeSecret();
	}

	/** Refreshes the secret via service. */
	public refresh(): Observable<void> {
		return this.userSecretStorage.currentSecret$.pipe(
			take(1),
			switchMap((secret) =>
				secret != null ? this.authService.refreshSecret(secret) : throwError(() => new Error('No refresh token found'))
			),
			catchError(() => this.logout()),
			switchMap((newSecret) => (newSecret ? this.userSecretStorage.saveSecret(newSecret) : of(null))),
			map(() => undefined)
		);
	}

	/**
	 * register via service.
	 * @param registrationData Registration Data.
	 */
	public register(registrationData: Registration): Observable<void> {
		return this.authService.register(registrationData).pipe(this.saveSecretAndWaitForAuthorized());
	}

	private saveSecretAndWaitForAuthorized(): OperatorFunction<UserSecret, void> {
		return pipe(
			switchMap((secret) => {
				const saveUserSecretSideEffect$ = this.userSecretStorage.saveSecret(secret).pipe(ignoreElements());

				return merge(this.isAuthorized$, saveUserSecretSideEffect$);
			}),
			first((isAuthorized) => isAuthorized),
			map(() => undefined)
		);
	}

	private initCurrentUserStream(): Observable<User | null> {
		return this.userSecretStorage.currentSecret$.pipe(
			switchMap((secret) => (secret ? this.userApiService.getCurrentUser() : of(null))),
			shareReplay({ bufferSize: 1, refCount: false })
		);
	}
}
