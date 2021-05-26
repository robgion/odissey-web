import { Component, OnInit } from '@angular/core';
import {DataService} from './data.service';

export interface Data {
  value: number;
}

@Component({
  selector: 'tcs-father',
  template: `
    <p>
      father works!
    </p>
    <div>
      <button (click)="change()">CHANGE VLAUE</button>
    </div>
    <div>
        <tcs-child
            [data]="cloned"
        >
        </tcs-child>
    </div>
  `,
  styles: [
  ]
})
export class FatherComponent implements OnInit {

  data: Data;
  cloned: Data;
  check: boolean;

  constructor(
      private dataService: DataService
  ) {
    this.data = {
      value: 0
    };
    this.check = false;
  }

  ngOnInit(): void {
  }

  change(): void {
    const value = this.data.value + 10;
    this.data.value = value;
    this.cloned = this.data; // Object.assign({}, this.data); // this.cloned = {...this.data}
    // this.cloned = JSON.parse( JSON.stringify(this.data) ); // lodash
    this.check = !this.check;
    console.log(`value: ${this.data.value}`);

    // Scateno la chiamata next della Subject tramite il metodo setter
    this.dataService.data = this.check;
  }
}
