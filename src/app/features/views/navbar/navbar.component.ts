import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'tcs-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userRole: string;

  constructor(private router: Router, ) {
  }

  ngOnInit(): void {
  }

  navigate(menu: string): void {
    this.router.navigateByUrl(menu);
  }

  logout(): void{
    this.router.navigateByUrl('login/signin');
  }


}
