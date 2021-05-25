import {Subject} from 'rxjs';

export abstract class BaseComponent {

    protected destroy$: Subject<any> = new Subject<any>();

    protected unsubscribe(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
