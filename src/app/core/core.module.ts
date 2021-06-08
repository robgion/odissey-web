import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UiStoreService} from './services/ui-store.service';
import {UsersService} from './services/users.service';
import {InvoicesActionsService} from './services/invoices-actions.service';
import {ClientsActionsService} from './services/clients-actions.service';
import {InvoicesStoreService} from './services/invoices-store.service';
import {ClientsStoreService} from './services/clients-store.service';
import {ProfileStoreService} from './services/profile-store.service';
import {ProfileActionsService} from './services/profile-actions.service';
import {SecurityService} from './services/security/security.service';
import {AuthStoreService} from './services/security/auth-store.service';
import {AuthGuardService} from './services/security/auth-guard.service';
import {UserRolesSecurityService} from "./services/security/user-roles-security.service";


@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [
        UiStoreService,
        UsersService,
        InvoicesActionsService,
        InvoicesStoreService,
        ClientsActionsService,
        ClientsStoreService,
        ProfileActionsService,
        ProfileStoreService,
        SecurityService,
        AuthStoreService,
        AuthGuardService,
        UserRolesSecurityService
    ]
})
export class CoreModule {

    constructor() {
        console.log('CoreModule loading...');
    }
}
