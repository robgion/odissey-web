import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tcs-dashboard',
  template: `
    <div class="container mt-5">
      dashboard works!
      
      <div>
            <tcs-father></tcs-father>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
