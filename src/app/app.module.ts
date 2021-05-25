import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {NavbarComponent} from './features/views/navbar/navbar.component';
import { InvoicesEditorComponent } from './features/invoices/components/invoices-editor.component';
import {InvoicesModule} from './features/invoices/invoices.module';
import {ProductsModule} from './features/products/products.module';

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
        RouterModule,
        InvoicesModule,
        ProductsModule
    ],
    providers: [], // Dichiarazione dei services ( concetto di gerarchia degli injectors ) ovvero classi ts in cui releghiamo la logica di business
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
        console.log('AppModule loading...');
    }
}
