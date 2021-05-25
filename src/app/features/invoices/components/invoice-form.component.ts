import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Invoice, InvoiceItem} from '../../../model/invoice';
import {Client} from '../../../model/client';

@Component({
  selector: 'tcs-invoice-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!--TitleBar-->
    <form [formGroup]="form" (submit)="save()" class="transparent-card">

      <div class="d-flex flex-row justify-content-between">

        <h2 class="col">
          <span *ngIf="!activeInvoice?.invoiceNumber">Create New </span>
          Invoice
          <span class="badge badge-dark" *ngIf="activeInvoice?.invoiceNumber as invoiceNumber">
           # <strong>{{invoiceNumber}}</strong>
          </span>
          <button
            *ngIf="isInvoicesPanelOpened"
            class="btn btn-sm btn-outline-dark ml-2"
            type="button"
            (click)="openPanelInvoices.emit()" >
            <i class="fa fa-address-card"></i> Invoices List
          </button>
        </h2>


        <div class="btn-group">
          <button
            type="submit"
            class="btn btn-link text-dark"
            [disabled]="form.invalid"
            [style.opacity]="form.valid ? 1 : 0.3"
          > <i class="fa fa-save fa-2x"></i></button>

          <button
            *ngIf="activeInvoice?.id"
            type="button"
            class="btn btn-link text-dark"
            (click)="printInvoice.emit()" >
            <i class="fa fa-print fa-2x"></i>
          </button>
        </div>
      </div>

      <hr>


      <!--Date-->
      <div class="form-inline form-group">
        <input class="form-control " type="date" formControlName="date" placeholder="Subject">
      </div>

      <!--Client-->
      <div class="form-inline form-group ">
        <select formControlName="clientID" class="form-control mr-1" required>
          <option [value]="''">Select Client *</option>
          <option [value]="client.id" *ngFor="let client of clients">{{client.name}}</option>
        </select>
        <button
          class="btn btn-outline-dark mt-2 mt-sm-0"
          type="button"
          (click)="openPanelClients.emit()"
          *ngIf="isClientPanelOpened"
        > <i class="fa fa-users"></i> Edit Clients</button>

      </div>


      <!--Fields-->
      <div class="form-group">
        <input class="form-control" type="text" formControlName="subject" placeholder="Subject * (min 3 chars)">
        <!--<input class="form-control" type="text" formControlName="notes" placeholder="notes ">-->
      </div>

      <hr>

      <!--Invoice Items-->
      <h4>Products</h4>
      <div formArrayName="items"
           *ngFor="let item of items.controls; let i = index; let last = last">

        <div
          [formGroupName]="i" class="form-group form-inline"
          style="border-left: 5px solid grey; padding-left: 10px"
          [style.border-color]="item.valid ? 'green' : 'red'"
        >

          <input formControlName="text" placeholder="Item desc *" class="form-control mr-sm-2 mb-1 mb-sm-0">
          <input formControlName="price" placeholder="Item price *" class="form-control mr-sm-2 mb-1 mb-sm-0">
          <i class="fa fa-plus-square fa-2x ml-2 mr-2" (click)="addItem()" *ngIf="item?.valid && last"></i>
          <i class="fa fa-trash-o fa-2x ml-2 mr-2" (click)="removeItem(item)" *ngIf="items.controls.length > 1"></i>
        </div>
      </div>

      <hr>

      <h5>TOTAL: {{getTotalItems() | currency}}</h5>
    </form>
  `,
  styles: [`
    .btn-outline-odissey {
    }
  `]
})
export class InvoiceFormComponent implements OnChanges {
  @Input() activeInvoice: Invoice;
  @Input() clients: Client[];
  @Input() isInvoicesPanelOpened: boolean;
  @Input() isClientPanelOpened: boolean;
  @Output() saveInvoice: EventEmitter<Partial<Invoice>> = new EventEmitter();
  // @Output() createNewInvoice: EventEmitter<any> = new EventEmitter();
  @Output() openPanelClients: EventEmitter<any> = new EventEmitter();
  @Output() openPanelInvoices: EventEmitter<any> = new EventEmitter();
  @Output() printInvoice: EventEmitter<any> = new EventEmitter();
  form: FormGroup;
  items: FormArray;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      clientID: [null, Validators.required],
      subject: [null, Validators.minLength(3)],
      date: [null, Validators.required],
      total: null,
      items: this.fb.array([]) as FormArray,
    });
    // references to invoice items
    this.items = this.form.get('items') as FormArray;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.activeInvoice) {
      const { activeInvoice: { currentValue: currentInvoice  }} = changes;
      if (currentInvoice) {
        this.doUpdateInvoice(currentInvoice);
      } else {
        this.doCreateNewInvoice();
      }
    }
  }

  doUpdateInvoice(currentInvoice: Invoice): void {
    // remove previous invoice items
    this.items.clear();

    // add invoice items
    if (currentInvoice.items.length) { currentInvoice.items.forEach(item => this.addItem(item)); }

    // populate form
    this.form.patchValue(this.activeInvoice, { emitEvent: false });
  }

  doCreateNewInvoice(): void {
    // remove previous invoice items
    this.items.clear();

    // reset invoice data
    this.form.reset({
      // copy activeInvoice props. I.e. especially useful when a Client is updated in a new invoice with no ID
      // ...this.activeInvoice,
      // date: new Date().toISOString().substring(0, 10),
      clientID: '',
      total: 0,
    }/*, { emitEvent: false }*/);

    // Add a new empty item
    this.addItem();
  }


  createItem({ text = '', value = ''}): FormGroup {
    return this.fb.group({
      text: [text,  Validators.required],
      price: [value,  Validators.required],
    });
  }

  addItem(item: InvoiceItem = null): void {
    this.items.push(this.createItem(item || {}));
  }

  removeItem(item: AbstractControl): void {
    const index = this.items.controls.indexOf(item);
    this.items.removeAt(index);
  }

  getTotalItems(): number {
    return this.items.controls.reduce((acc: number, curr: FormGroup) => {
      return acc + +curr.controls.price.value || 0;
    }, 0);
  }

  save(): void{
    const { value } = this.form;
    this.saveInvoice.emit({
      ...value,
      clientID: +value.clientID,
      total: this.getTotalItems()});
  }
}
