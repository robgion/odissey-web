import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserListComponent} from './components/user-list.component';
import {UsersRoutingModule} from './users-routing.module';
import {UserDetailComponent} from './components/user-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserSearchPipe} from './user-search.pipe';
import { ActivePipe } from './active.pipe';


@NgModule({
    declarations: [
        UserListComponent,
        UserDetailComponent,
        UserSearchPipe,
        ActivePipe
    ],
    exports: [
        UserListComponent
    ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: []
})
export class UsersModule {
    constructor() {
        console.log('UsersModule loading...');
    }
}
