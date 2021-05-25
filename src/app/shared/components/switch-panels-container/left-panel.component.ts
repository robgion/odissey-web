import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'tcs-left-panel',
  template: `
    <div
        class="sidepanel sidepanel-left bg-light vscroller"
        [ngClass]="{'sidepanel-left-hide': show}"
    >
      <tcs-switch-panel-header
        [title]="title"
        (closePanel)="closePanel.emit()"
      >
      </tcs-switch-panel-header>
      
      <!-- Panel content -->
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .sidepanel {
      position: fixed;
      width: 100%;
      max-width: 500px;
      padding: 10px;
      top: 0;
      height: 100vh;
      z-index: 2000;
      transition: all 1s cubic-bezier(0.77, 0, 0.175, 1);
    }
    
    .sidepanel-left {
      left: 0;
      border-right: 1px solid #666;
    }

    .sidepanel-left-hide {
      left: -500px
    }
  `]
})
export class LeftPanelComponent {

  @Input() show: boolean;
  @Input() title: boolean;
  @Output() closePanel: EventEmitter<any> = new EventEmitter();

  constructor() { }

}
