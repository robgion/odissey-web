import { Component } from '@angular/core';

@Component({
  selector: 'tcs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'odissey-web mod.';

  cardTitle1 = 'Card title 1';
  cardTitle2 = 'Card title 2';

  cards: any[];


  constructor() {
    this.cards = [
      {
        itemIdx: 0,
        showBody: true,
        title: 'Card title 1'
      },
      {
        itemIdx: 1,
        showBody: false,
        title: 'Card title 2'
      },
      {
        itemIdx: 2,
        showBody: false,
        title: 'Card title 3'
      }
    ];
  }

  manageToggle(data: any): void{
    console.log(data);
    if (data.showBody) {
      this.cards.forEach(
          el => {
              el.showBody = el.itemIdx === data.idx;
          }
      );
    }
  }
}
