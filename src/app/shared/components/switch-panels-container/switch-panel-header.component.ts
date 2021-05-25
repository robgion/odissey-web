import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'tcs-switch-panel-header',
  template: `
    <div class="row mb-3 h3">
      <div class="col header-text">
        {{title}}
      </div>
      <div class="col text-right">
        <i class="fa fa-times-circle close-btn" (click)="closePanel.emit()"></i>
      </div>
    </div>
  `,
  styles: [`
        .close-btn {
          cursor: pointer;
        }
        .header-text {
          color: #343a40;
        }
  `]
})
export class SwitchPanelHeaderComponent {

  @Input() title: boolean;
  @Output() closePanel: EventEmitter<any> = new EventEmitter();

  constructor() { }
}
