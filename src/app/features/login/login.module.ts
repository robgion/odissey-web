import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginContainerComponent} from './components/login-container/login-container.component';
import {LoginRoutingModule} from './login-routing.module';
import {FormsModule} from '@angular/forms';
import {ForbiddenValidatorDirective} from './components/forbidden-validator.directive';


@NgModule({
    declarations: [
        LoginContainerComponent,
        ForbiddenValidatorDirective
    ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule
    ]
})
export class LoginModule {
}
