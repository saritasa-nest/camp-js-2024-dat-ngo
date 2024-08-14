import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AppUrlsConfig } from '@js-camp/angular/shared/app-url';
import { Observable } from 'rxjs';

/** ApiKey Interceptor. */
export class ApiKeyIntercetor implements HttpInterceptor {
	private readonly appConfig = inject(AppUrlsConfig);

	/** @inheritdoc */
	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const apiKeyRequest = req.clone({
			headers: req.headers.set('Api-key', this.appConfig.apiKey),
		});
		return next.handle(apiKeyRequest);
	}
}
