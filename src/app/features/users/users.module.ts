import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserListComponent} from './components/user-list.component';
import {UsersService} from './services/users.service';
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
    providers: [UsersService]
})
export class UsersModule {
    constructor() {
        console.log('UsersModule loading...');
    }
}

export class Pippo {
    name: string;
}
