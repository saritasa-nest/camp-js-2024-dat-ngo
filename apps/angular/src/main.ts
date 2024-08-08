import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';

if (environment.production) {
	enableProdMode();
}

bootstrapApplication(AppComponent, {
	providers: [provideRouter(appRoutes), provideHttpClient(), provideAnimationsAsync()],
}).catch(err => console.error(err));
