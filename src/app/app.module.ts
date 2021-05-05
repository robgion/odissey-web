import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule( {
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [], // Dichiarazione dei services ( concetto di gerarchia degli injectors ) ovvero classi ts in cui releghiamo la logica di business
  bootstrap: [AppComponent]
})
export class AppModule {
}
