import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full'},
  { path: 'users', loadChildren: () => import('./features/users/users.module').then( m => m.UsersModule) },
  { path: 'products', loadChildren: () => import('./features/products/products.module').then( m => m.ProductsModule) },
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
