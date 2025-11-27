import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    importProvidersFrom(CarouselModule), // ✅ Added missing comma here

    // 👇 START of new additions
    provideAnimations(), // Enables Angular animations (needed for Toastr)
    provideToastr({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      timeOut: 2000, // 2 seconds display
    }),
    // 👆 END of new additions
  ],
};
