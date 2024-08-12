import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppUrlsConfig } from '@js-camp/angular/shared/app-url';
import { first, map, Observable, switchMap } from 'rxjs';
import { UserSecretStorageService } from '../services/user-secret-storage.service';

const AUTH_HEADER_KEY = 'Authorization';

@Injectable({ providedIn: 'root' })
export class AuthorizationIntercetor implements HttpInterceptor {
	private readonly appConfig = inject(AppUrlsConfig);

	private userSecretStorageService = inject(UserSecretStorageService);

	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const userSecret$ = this.userSecretStorageService.currentSecret$.pipe(first());
		/** Paths do not need intercept secret */
		if (this.shouldInterceptSecretForUrl(req.url)) {
			return next.handle(req);
		}
		return userSecret$.pipe(
			map((userSecret) =>
				userSecret
					? req.clone({
							headers: req.headers.set(AUTH_HEADER_KEY, `Bearer ${userSecret.accessToken}`),
					  })
					: req
			),
			switchMap((newReq) => next.handle(newReq))
		);
	}

	private shouldInterceptSecretForUrl(url: string): boolean {
		return url === this.appConfig.auth.login || url === this.appConfig.auth.register;
	}
}
