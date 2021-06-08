import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {NavbarComponent} from './features/views/navbar/navbar.component';
import {AuthInterceptorService} from './core/services/security/auth-interceptor.service';
import {UserRolesSecurityService} from './core/services/security/user-roles-security.service';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        CoreModule,
        SharedModule,
        AppRoutingModule,
        RouterModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        },
        {
            provide: APP_INITIALIZER,
            useFactory: (config: UserRolesSecurityService) => ()  => config.load(),
            deps: [UserRolesSecurityService],
            multi: true
        },

    ], // Dichiarazione dei services ( concetto di gerarchia degli injectors ) ovvero classi ts in cui releghiamo la logica di business
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
        console.log('AppModule loading...');
    }
}
