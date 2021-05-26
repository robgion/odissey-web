import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard.component';
import { FatherComponent } from './components/father.component';
import { ChildComponent } from './components/child.component';
import {DataService} from './components/data.service';


@NgModule({
    declarations: [
        DashboardComponent,
        FatherComponent,
        ChildComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule
    ],
    providers: [
        DataService
    ]
})
export class DashboardModule {
}
