import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';

@NgModule( {
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule
  ],
  providers: [], // Dichiarazione dei services ( concetto di gerarchia degli injectors ) ovvero classi ts in cui releghiamo la logica di business
  bootstrap: [AppComponent]
})
export class AppModule {
}
