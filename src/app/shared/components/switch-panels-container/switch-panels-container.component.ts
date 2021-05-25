import {Component, Input, OnInit} from '@angular/core';
import {UiStoreModel, UiStoreService} from '../../../core/services/ui-store.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'tcs-switch-panels-container',
    template: `

        <!-- LEFT PANEL -->

        <tcs-left-panel
                [show]="!(ui$ | async).isLeftPanelOpened"
                [title]="titleLeftPanel"
                (closePanel)="closeLeftPanel($event)"
        >
            <ng-content select="[left]"></ng-content>
        </tcs-left-panel>

        <div class="container-page"
             [ngClass]="{
          'container-page-with-left-panel-opened': (ui$ | async).isLeftPanelOpened,
          'container-page-with-right-panel-opened': (ui$ | async).isRightPanelOpened
        }">
            <!-- CENTER PANEL -->
            <ng-content select="[center]"></ng-content>
        </div>

        <!-- RIGHT PANEL -->
        <tcs-right-panel
                [show]="(ui$ | async).isRightPanelOpened"
                [title]="titleRightPanel"
                (closePanel)="closeLeftRight($event)"
        >
            <ng-content select="[right]"></ng-content>
        </tcs-right-panel>
    `,
    styles: [`
        .container-page {
            max-width: 960px;
            width: 100%;
            /*margin-left: 100%;
            transform: translateX(0%);*/
            margin-left: 50%;
            transform: translateX(-50%);
            /*margin-left: 500px;*/
            padding: 0 20px;
            transition: all 0.5s ease-in-out;
        }

        .container-page-left-panel-opened {
        }

        @media only screen and (min-width: 960px) {
            .container-page-with-left-panel-opened {
                margin-left: 500px;
                transform: translateX(0);
            }

            .container-page-with-right-panel-opened {
                margin-left: 0px;
                transform: translateX(0);
            }
        }
    `]
})
export class SwitchPanelsContainerComponent implements OnInit {

    ui$: Observable<UiStoreModel>;

    @Input() titleLeftPanel: string;
    @Input() titleRightPanel: string;

    constructor(
        private uiStoreService: UiStoreService
    ) {
        this.ui$ = this.uiStoreService.uiStore$;
    }

    ngOnInit(): void {
    }

    closeLeftPanel(data: any): void {
        this.uiStoreService.showLeftPanel = false;
    }
    closeLeftRight(data: any): void {
        this.uiStoreService.showRightPanel = false;
    }
}
