import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserListComponent} from './components/user-list.component';
import {UsersRoutingModule} from './users-routing.module';


@NgModule({
    declarations: [
        UserListComponent
    ],
    exports: [
        UserListComponent
    ],
    imports: [
        CommonModule,
        UsersRoutingModule
    ],
    providers: []
})
export class UsersModule {
    constructor() {
        console.log('UsersModule loading...');
    }
}
