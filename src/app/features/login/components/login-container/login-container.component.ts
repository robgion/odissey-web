import {Component, OnDestroy, OnInit} from '@angular/core';
import {SessionData} from '../../../../model/user';
import {SecurityService} from '../../../../core/services/security/security.service';
import {AuthStoreService} from '../../../../core/services/security/auth-store.service';
import {Router} from '@angular/router';
import {Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'tcs-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.css']
})
export class LoginContainerComponent implements OnInit, OnDestroy {

  // 1. metodo semplice per la distruzione delle subscriptions
  unsubscribe: Subscription;

  // 2. utilizzato per effettuare la unsubscribe di observable multipli
  subject: Subject<any> = new Subject<any>();


  loginData: SessionData = {
    password: null,
    username: null,
    role: null,
    token: null
  };

  constructor(
      private secService: SecurityService,
      private authStore: AuthStoreService,
      private router: Router
  ) {
    this.unsubscribe = this.authStore.authStore$
        .pipe(
            takeUntil(this.subject)
        )
        .subscribe(
        store => {
          if (!!store && !!store.token) {
            this.router.navigateByUrl('users');
          }
        }
    );
  }

  ngOnInit(): void {
  }

  login(form: NgForm): void {
    // console.log(this.loginData);
    console.log(form);
    this.secService.login(this.loginData);
  }

  ngOnDestroy(): void {
    // this.unsubscribe.unsubscribe();
    this.subject.next();
    this.subject.complete();
  }
}
