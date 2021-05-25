import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InvoicesRoutingModule} from './invoices-routing.module';
import {InvoicesListComponent} from './components/invoices-list.component';
import {InvoiceFormComponent} from './components/invoice-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InvoicesEditorComponent} from './components/invoices-editor.component';
import {SharedModule} from '../../shared/shared.module';
import {PanelClientsItemComponent} from './components/clients/panel-clients-item.component';
import {PanelClientsHeaderComponent} from './components/clients/panel-clients-header.component';
import {PanelClientsComponent} from './components/clients/panel-clients.component';
import {PrintComponent} from './components/print/print.component';

@NgModule({
    declarations: [
        InvoicesListComponent,
        InvoiceFormComponent,
        InvoicesEditorComponent,
        PanelClientsItemComponent,
        PanelClientsHeaderComponent,
        PanelClientsComponent,
        PrintComponent
    ],
    exports: [],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        InvoicesRoutingModule,
    ]
})
export class InvoicesModule {
}
