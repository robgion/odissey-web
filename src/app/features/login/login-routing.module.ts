import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginContainerComponent} from './components/login-container/login-container.component';

const routes: Routes = [

    { path: '', component: LoginContainerComponent }
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class LoginRoutingModule {
}
