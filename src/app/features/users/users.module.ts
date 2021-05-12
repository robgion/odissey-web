import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserListComponent} from './components/user-list.component';
import {UsersService} from './services/users.service';



@NgModule({
  declarations: [
    UserListComponent
  ],
  exports: [
    UserListComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [UsersService]
})
export class UsersModule {
  constructor() {
    console.log('UsersModule loading...');
  }
}
