import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from "./core/services/security/auth-guard.service";

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full'},
    { path: 'login', loadChildren: () => import('./features/login/login.module').then( m => m.LoginModule) },
    { path: 'users', loadChildren: () => import('./features/users/users.module').then( m => m.UsersModule), canActivate: [AuthGuardService] },
    { path: 'products', loadChildren: () => import('./features/products/products.module').then( m => m.ProductsModule), canActivate: [AuthGuardService]  },
    { path: 'invoices', loadChildren: () => import('./features/invoices/invoices.module').then( m => m.InvoicesModule) , canActivate: [AuthGuardService] },
    { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then( m => m.DashboardModule), canActivate: [AuthGuardService]  },
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ]
})
export class AppRoutingModule {
  constructor() {
    console.log('AppRoutingModule loading...');
  }
}
