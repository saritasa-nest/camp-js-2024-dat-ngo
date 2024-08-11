import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { StorageService } from './storage.service';
import { UserSecret } from '@js-camp/core/models/user-secret';

const USER_SECRET_STORAGE_KEY = 'user';

/** User secret storage. */
@Injectable({ providedIn: 'root' })
export class UserSecretStorageService {
	/** Token info for current user. */
	public readonly currentSecret$: Observable<UserSecret | null>;

	private readonly storageService = inject(StorageService);

	public constructor() {
		this.currentSecret$ = this.storageService.get(USER_SECRET_STORAGE_KEY);
	}

	/**
	 * Saves a secret.
	 * @param secret Secret to save.
	 */
	public saveSecret(secret: UserSecret): Observable<UserSecret> {
		return this.storageService.save(USER_SECRET_STORAGE_KEY, secret).pipe(map(() => secret));
	}

	/** Removes current secret. */
	public removeSecret(): Observable<void> {
		return this.storageService.remove(USER_SECRET_STORAGE_KEY);
	}
}
