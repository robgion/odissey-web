import {Subject} from 'rxjs';

/**
 * Classe di base a tutti i componenti dell'applicazione
 */
export abstract class AbstractBaseComponent {

    protected notifyDestroy: Subject<any> = new Subject<any>();

    protected notifyUnsubscribe(): void {
        this.notifyDestroy.next();
        this.notifyDestroy.complete();
    }
}
