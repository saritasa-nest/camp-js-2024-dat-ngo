import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpStatusCode,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, shareReplay, switchMap, tap, throwError } from 'rxjs';

import { AppUrlsConfig } from '@js-camp/angular/shared/app-url';

import { UserService } from '../services/user.service';

/** Refresh interceptor for access token. */
@Injectable()
export class RefreshInterceptor implements HttpInterceptor {
	private readonly apiUrlService = inject(AppUrlsConfig);

	private readonly userService = inject(UserService);

	private refreshSecretRequest$: Observable<void> | null = null;

	private readonly urlsToIntercept = [];

	private readonly regexToIntercept: RegExp[] = [/\/auth\/.*/];

	/** @inheritdoc */
	public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if (this.apiUrlService.bypassInterceptSecretForUrl(request.url, this.urlsToIntercept, this.regexToIntercept)) {
			return next.handle(request);
		}
		return next.handle(request).pipe(
			catchError((error: unknown) => {
				if (this.shouldHttpErrorBeIgnored(error)) {
					return throwError(() => new Error(error?.toString()));
				}
				this.refreshSecretRequest$ ??= this.userService.refresh().pipe(shareReplay({ refCount: true, bufferSize: 1 }));

				return this.refreshSecretRequest$.pipe(
					tap(() => {
						this.refreshSecretRequest$ = null;
					}),
					switchMap(() => next.handle(request)),
				);
			})
		);
	}

	private shouldHttpErrorBeIgnored(error: unknown): boolean {
		if (error instanceof HttpErrorResponse) {
			return error.status !== HttpStatusCode.Unauthorized;
		}
		return false;
	}
}
