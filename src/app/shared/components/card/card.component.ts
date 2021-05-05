import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'tcs-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnDestroy {

  constructor() {
  }

  /**
   * Metodo dell'interfaccia OnInit ovvero uno dei Lifecycle Hooks.
   * Viene eseguito dopo il costruttore ma prima del rendering della pagina.
   * Qui piazziamo le inizializzazioni del componente con eventuali "side effect" come ad es. chiamate HTTP.
   */
  ngOnInit(): void {
  }

  /**
   * Eseguito all'atto della distruzione del componente dal layout ( Lifecycle Hooks )
   */
  ngOnDestroy(): void {
  }

}
