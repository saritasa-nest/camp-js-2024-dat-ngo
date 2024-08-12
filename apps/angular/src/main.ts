import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { ApiKeyIntercetor } from './core/interceptors/api-key.interceptor';
import { AuthorizationIntercetor } from './core/interceptors/authorization.interceptor';

if (environment.production) {
	enableProdMode();
}

bootstrapApplication(AppComponent, {
	providers: [
		provideRouter(appRoutes),
		provideHttpClient(withInterceptorsFromDi()),
		{ provide: HTTP_INTERCEPTORS, useClass: ApiKeyIntercetor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: AuthorizationIntercetor, multi: true },
		provideAnimationsAsync(),
	],
}).catch((err) => console.error(err));
