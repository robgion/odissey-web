import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

export interface UiStoreModel {
    isLeftPanelOpened: boolean;
    isRightPanelOpened: boolean;
}

@Injectable()
export class UiStoreService {

    private initialState: UiStoreModel = {
        isLeftPanelOpened: false,
        isRightPanelOpened: false,
    };

    private storeModelSubject: BehaviorSubject<UiStoreModel> = new BehaviorSubject<UiStoreModel>(this.initialState);
    public uiStore$: Observable<UiStoreModel> = this.storeModelSubject.asObservable();

    public set showLeftPanel(show: boolean) {
        const state: UiStoreModel = {
            isLeftPanelOpened: show,
            isRightPanelOpened: show ? !show : false
        };
        this.storeModelSubject.next(state);
    }

    public set showRightPanel(show: boolean) {
        const state: UiStoreModel = {
            isLeftPanelOpened: show ? !show : false,
            isRightPanelOpened: show
        };
        this.storeModelSubject.next(state);
    }
    constructor() {
    }
}
