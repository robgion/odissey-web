import {Component, OnInit} from '@angular/core';
import {UsersService} from '../services/users.service';

@Component({
    selector: 'tcs-user-list',
    template: `
        <div class="row mt-2">
            <div class="col-1">ID</div>
            <div class="col-2">NAME</div>
            <div class="col-3">SURNAME</div>
            <div class="col-2">USERNAME</div>
            <div class="col-2">ROLE</div>
            <div class="col-1"></div>
            <div class="col-1"></div>
        </div>
        <hr>
        <div class="row" *ngFor="let user of users">
            <div class="col-1">{{ user.id }}</div>
            <div class="col-2">{{ user.name }}</div>
            <div class="col-3">{{ user.lastName }}</div>
            <div class="col-2">{{ user.username }}</div>
            <div class="col-2">{{ user.role.code }}</div>
            <div class="col-1"></div>
            <div class="col-1"></div>
        </div>
    `,
})
export class UserListComponent implements OnInit {

    users: any[];
    // userActions: UsersService;

    /**
     * Iniezione delle dipendenze ( services )
     */
    constructor(
        private userActions: UsersService
    ) {
        // this.userActions = userServiceActions;
        this.users = [];
    }

    ngOnInit(): void {
        this.userActions.loadUsers().subscribe(
            (response) => {
                console.log(response);
                if (response) {
                    this.users = response;
                }
            },
            error => {
                console.log(error);
            }
        );
    }
}
