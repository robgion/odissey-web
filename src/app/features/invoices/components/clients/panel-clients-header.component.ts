import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import {Client} from '../../../../model/client';

@Component({
  selector: 'tcs-panel-client-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `

    <div class="row mb-3">
      <div class="col-8">
        <!--TITLE-->
        <div *ngIf="!isAdding" class="h3">
          <i class="fa fa-plus-circle mr-1 text-primary" (click)="addHandler()"></i>
          CLIENTS
        </div>

        <!--Form ADD CLIENT-->
        <div class="form-inline" *ngIf="isAdding">
          <input
            type="text" class="form-control mr-2"
            [(ngModel)]="clientName"
            (keyup.enter)="confirmHandler()"
            #input
            placeholder="Client Name"
          >
          <i class="fa fa-check-circle fa-2x mr-1" (click)="confirmHandler()"></i>
          <i class="fa fa-times-circle fa-2x" (click)="cancelHandler()"></i>
        </div>
      </div>

      <div class="col-4 text-right h3">
        <i
          *ngIf="!isAdding"
          class="fa fa-times-circle title "
          (click)="closePanel.emit()"></i>
      </div>
    </div>
  `,

})
export class PanelClientsHeaderComponent {
  @Output() addClient: EventEmitter<Client> = new EventEmitter();
  @Output() closePanel: EventEmitter<any> = new EventEmitter();
  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  isAdding: boolean;
  clientName: string;

  constructor(private cd: ChangeDetectorRef) {}

  addHandler(): void {
    this.isAdding = true;
    this.clientName = null;
    this.cd.detectChanges();
    this.input.nativeElement.focus();
  }

  confirmHandler(): void {
    if (this.clientName) {
      this.addClient.emit({ name: this.clientName});
      this.isAdding = false;
    }
  }

  cancelHandler(): void {
    this.isAdding = false;
  }
}
