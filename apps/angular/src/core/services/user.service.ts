import { inject, Injectable } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { first, ignoreElements, map, merge, Observable, OperatorFunction, pipe, switchMap, tap } from 'rxjs';
import { Login } from '@js-camp/core/models/login';
// import { User } from '@js-camp/core/models/user';
import { UserSecret } from '@js-camp/core/models/user-secret';
import { UserSecretStorageService } from './user-secret-storage.service';

@Injectable({ providedIn: 'root' })
export class UserService {
	private readonly authService = inject(AuthApiService);

	/** Current user. `null` when a user is not logged in. */
	public readonly currentUser$: Observable<null> = new Observable<null>();

	/** Whether the current user is authorized. */
	public readonly isAuthorized$: Observable<boolean>;

	private readonly userSecretStorage = inject(UserSecretStorageService);

	// private readonly userApiService = inject(UserApiService);

	public constructor() {
		// this.currentUser$ = this.initCurrentUserStream();
		this.isAuthorized$ = this.currentUser$.pipe(map((user) => user != null));
	}

	/**
	 * Login a user with email and password.
	 * @param loginData Login data.
	 */
	public login(loginData: Login): Observable<void> {
		return this.authService
			.login(loginData)
			.pipe(tap((data) => console.log(data)))
			.pipe(this.saveSecretAndWaitForAuthorized());
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
			switchMap((secret) => {
				const saveUserSecretSideEffect$ = this.userSecretStorage.saveSecret(secret).pipe(ignoreElements());

				return merge(this.isAuthorized$, saveUserSecretSideEffect$);
			}),
			first((isAuthorized) => isAuthorized),
			map(() => undefined)
		);
	}

	// private initCurrentUserStream(): Observable<User | null> {
	// 	return this.userSecretStorage.currentSecret$.pipe(
	// 		switchMap((secret) => (secret ? this.userApiService.getCurrentUser() : of(null))),
	// 		shareReplay({ bufferSize: 1, refCount: false })
	// 	);
	// }
}
