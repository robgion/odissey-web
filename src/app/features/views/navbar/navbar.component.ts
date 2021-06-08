import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {AuthStoreService} from '../../../core/services/security/auth-store.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'tcs-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  subject: Subject<any> = new Subject<any>();

  userRole: string;
  isUserLogged: boolean;
  constructor(
      private router: Router,
      private authStore: AuthStoreService) {
    this.isUserLogged = false;
    this.authStore.authStore$. pipe(
        takeUntil(this.subject)
    ). subscribe(
        store => this.isUserLogged = !!store && !!store.token
    );
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

  ngOnDestroy(): void {
    this.subject.next();
    this.subject.complete();
  }


}
