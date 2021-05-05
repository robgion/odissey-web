import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
    selector: 'tcs-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnDestroy, OnChanges {

    @Output() toggleEvent: EventEmitter<any> = new EventEmitter<any>();
    @Input() itemIdx: number;
    @Input() title: string;
    @Input() showBody: boolean;

    /**
     * Lifecycle: 1 ( Una tantum )
     */
    constructor() {
        this.itemIdx = 0;
        this.title = 'Card title';
        this.showBody = true;
        console.log('CardComponent loading...');
        console.log(this.title);
    }

    /**
     * Lifecycle: 2
     * Meotodo ( Lifecycle Hooks ) che viene chiamato:
     * 1. dopo il costruttore
     * 2. tutte le volte che recepisce un cambiamento del valore in input ( Lifecycle: n )
     */
    ngOnChanges(changes: SimpleChanges): void {
        console.log('CardComponent ngOnChanges...');
        console.log(this.title);
    }

    /**
     * Lifecycle: 3 ( una tantum )
     * Metodo dell'interfaccia OnInit ovvero uno dei Lifecycle Hooks.
     * Viene eseguito dopo il costruttore ma prima del rendering della pagina.
     * Qui piazziamo le inizializzazioni del componente con eventuali "side effect" come ad es. chiamate HTTP.
     */
    ngOnInit(): void {
        console.log('CardComponent init...');
        console.log(this.title);
    }

    /**
     * Lifecycle: n ( una tantum )
     * Eseguito all'atto della distruzione del componente dal layout ( Lifecycle Hooks )
     */
    ngOnDestroy(): void {
    }

    toggle(): void {
        this.showBody = !this.showBody;

        const value = {
            idx: this.itemIdx,
            showBody: this.showBody
        };

        this.toggleEvent.emit(
            value
        );
    }
}
