import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from './components/user-list.component';

const routes: Routes = [
    { path: '', component: UserListComponent },
    // { path: ':id', component: UserDetailComponent }
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})

export class UsersRoutingModule {
}
