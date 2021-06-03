import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {AuthStoreService} from '../../../core/services/security/auth-store.service';

@Component({
  selector: 'tcs-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userRole: string;
  isUserLogged: boolean;
  constructor(
      private router: Router,
      private authStore: AuthStoreService) {
    this.isUserLogged = false;
    /*this.authStore.authStore$.subscribe(
        store => this.isUserLogged = !!store && !!store.token
    );*/
  }

  ngOnInit(): void {
  }

  navigate(menu: string): void {
    this.router.navigateByUrl(menu);
  }

  logout(): void{
    this.authStore.logout();
    this.router.navigateByUrl('login');
  }


}
