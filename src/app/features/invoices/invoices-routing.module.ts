import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {InvoicesEditorComponent} from './components/invoices-editor.component';
import {PrintComponent} from './components/print/print.component';

const routes: Routes = [
  { path: '', component: InvoicesEditorComponent },
  {
    path: 'print', component: PrintComponent
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
