import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { SwitchPanelsContainerComponent } from './components/switch-panels-container/switch-panels-container.component';
import { RightPanelComponent } from './components/switch-panels-container/right-panel.component';
import { LeftPanelComponent } from './components/switch-panels-container/left-panel.component';
import { SwitchPanelHeaderComponent } from './components/switch-panels-container/switch-panel-header.component';
import {ProfilerDirective} from './directives/profiler.directive';

@NgModule({
  declarations: [
      CardComponent,
      SwitchPanelsContainerComponent,
      RightPanelComponent,
      LeftPanelComponent,
      SwitchPanelHeaderComponent,
      ProfilerDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent, SwitchPanelsContainerComponent, ProfilerDirective
  ]
})
export class SharedModule {
  constructor() {
    console.log('SharedModule loading...');
  }
}
