import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductListComponent} from './product-list/product-list.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: '', component: ProductListComponent}
];

@NgModule({
    declarations: [
        ProductListComponent
    ],
    exports: [
        ProductListComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class ProductsModule {

    constructor() {
        console.log('ProductsModule loading...');
    }
}
