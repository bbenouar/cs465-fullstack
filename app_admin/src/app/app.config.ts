import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
//import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { TripDataService } from './services/trip-data.service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient()],

  };




  /*
    importProvidersFrom(
      BrowserModule,
      FormsModule,
      HttpClientModule
    ),
    provideRouter(routes),
    provideHttpClient(),
    AuthenticationService,
    TripDataService
  ]
};
 /* bootstrap: [AppComponent]
})
export class AppModule { }

export const appConfig: ApplicationConfig = {
  providers: [
    //provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient()]
};*/