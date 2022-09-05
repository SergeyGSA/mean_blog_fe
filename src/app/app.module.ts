import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {StoreModule} from '@ngrx/store'
import {StoreDevtoolsModule} from '@ngrx/store-devtools'
import {EffectsModule} from '@ngrx/effects'
import {
  DEFAULT_ROUTER_FEATURENAME,
  routerReducer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store'
import {JwtModule} from '@auth0/angular-jwt'
import {MatSnackBarModule} from '@angular/material/snack-bar'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {environment} from '../environments/environment'
import {AuthInterceptor} from './auth/interceptors/auth.interceptor'
import {AppStoreModule} from './store/app-store.module'
import {AuthModule} from './auth/auth.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(
      {
        [DEFAULT_ROUTER_FEATURENAME]: routerReducer,
      },
      {}
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    AppStoreModule,
    JwtModule.forRoot({
      config: {tokenGetter: (request) => request as any},
    }),
    AuthModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
