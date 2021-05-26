import {BehaviorSubject, Observable, Subject} from 'rxjs';

export interface AppDataModel {
    dataBool: boolean;
    token: string;
}

export class DataService {

    // singola sorgente di verità
    private store: AppDataModel;
    initialValue = (): AppDataModel  => {
        this.store = {
            dataBool: false,
            token: null
        };
        return this.store;
    }

    // NGRX reduce-redux
    private dataSubject: BehaviorSubject<AppDataModel> = new BehaviorSubject<AppDataModel>(this.initialValue());
    public data$: Observable<AppDataModel> = this.dataSubject.asObservable();

    set data(data: boolean) {
        // 1. aggiorno lo store
        this.store.dataBool = data;
        // 2. clono lo store
        const response = {...this.store};
        // 3. notifico a tutte le componenti in ascolto che qualcosa è cambiato
        this.dataSubject.next(response);
    }
}
