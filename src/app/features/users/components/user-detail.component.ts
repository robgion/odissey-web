import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UsersService} from '../../../core/services/users.service';
import {map, switchMap, tap} from 'rxjs/operators';
import {User} from '../../../model/user';
import {FormGroup} from '@angular/forms';


@Component({
    selector: 'tcs-user-detail',
    template: `
      <div class="container">
          
          <form [formGroup]="userForm" (submit)="saveForm()">
              
              
              
              <input type="submit" value="SALVA" [disabled]="userForm.invalid">
          </form>
      </div>
    `
})
export class UserDetailComponent implements OnInit {

    currentUser: User;
    userForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private userService: UsersService
    ) {
        this.currentUser = null;
    }

    /*
        ngOnInit(): void {
            this.route.params.subscribe(
                params => {
                    this.userService.getUser( +params.id).subscribe(
                        response => {
                            console.log(response);
                        }
                    );
                }
            );
        }*/


    ngOnInit(): void {
        this.route.params.pipe(
            tap(
                (value) => console.log(value)
            ),
            switchMap(
                (routeValues) => this.userService.getUser(+routeValues.id)
            )
        ).subscribe(
            response => {
                console.log(response);
                this.currentUser = response;
            }
        );
    }

    saveForm(): void {
        console.log('submitted..');
        // TODO: CHIAMATA AL SERVIZIO DI BE
    }
}
