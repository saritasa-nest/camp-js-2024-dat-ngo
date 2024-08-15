import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppUrlsConfig } from '@js-camp/angular/shared/app-url';
import { first, map, Observable, switchMap } from 'rxjs';

import { UserSecretStorageService } from '../services/user-secret-storage.service';

const AUTH_HEADER_KEY = 'Authorization';

/** AuthorizationInterceptor. */
@Injectable({ providedIn: 'root' })
export class AuthorizationInterceptor implements HttpInterceptor {
	private readonly appConfig = inject(AppUrlsConfig);

	private userSecretStorageService = inject(UserSecretStorageService);

	private readonly urlsToIntercept = [this.appConfig.auth.register, this.appConfig.auth.login];

	private readonly regexToIntercept: RegExp[] = [/\/auth\/.*/];

	/** @inheritdoc */
	public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const userSecret$ = this.userSecretStorageService.currentSecret$.pipe(first());
		if (this.appConfig.bypassInterceptSecretForUrl(req.url)) {
			return next.handle(req);
		}
		return userSecret$.pipe(
			map((userSecret) =>
				userSecret ? req.clone({ headers: req.headers.set(AUTH_HEADER_KEY, `Bearer ${userSecret.accessToken}`) }) : req
			),
			switchMap((newReq) => next.handle(newReq))
		);
	}
}
