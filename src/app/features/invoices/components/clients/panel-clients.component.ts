import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {Client} from '../../../../model/client';

@Component({
  selector: 'tcs-clients-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="sidepanel sidepanel-right bg-light vscroller"
      [ngClass]="{'sidepanel-right-hide': !show}"
    >
      <tcs-panel-client-header
          (closePanel)="closePanel.emit()"
          (addClient)="addClient.emit($event)"
      ></tcs-panel-client-header>
      <div class="list-group">
        <small class="text-center" *ngIf="clients.length"><em>Click to edit</em></small>

        <tcs-panel-clients-item
            *ngFor="let client of clients"
            [client]="client"
            (editClient)="editClient.emit($event)"
        ></tcs-panel-clients-item>
      </div>
    </div>
  `,
  styleUrls: ['./panel-clients.component.css']
})
export class PanelClientsComponent {
  @Input() show: boolean;
  @Input() clients: Client[];
  @Output() addClient: EventEmitter<Client> = new EventEmitter();
  @Output() editClient: EventEmitter<Client> = new EventEmitter();
  @Output() closePanel: EventEmitter<any> = new EventEmitter();
}
