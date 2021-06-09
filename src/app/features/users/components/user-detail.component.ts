import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UsersService} from '../../../core/services/users.service';
import {map, switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {User} from '../../../model/user';
import {
    AbstractControl,
    AsyncValidatorFn,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators
} from '@angular/forms';
import {HttpClient} from '@angular/common/http';


@Component({
    selector: 'tcs-user-detail',
    template: `
        <ng-template [ngIf]="loading" [ngIfElse]="userDetail">
            <p> Nessun utente disponibile</p>
        </ng-template>
        <ng-template #userDetail>

            <div class="container mt-5">
                
                <form [formGroup]="userForm" (submit)="saveForm()">
                    
                    <div class="row">
                        <div class="col-1">
                            <label for="name">Name</label>
                        </div>
                        <div class="col-6">
                            <input class="form-control"
                                   id="name" type="text"
                                   name="name" placeholder="Name"
                                   formControlName="nameRef">
                            <small class="text-danger" *ngIf="userForm.touched && userForm.get('nameRef').hasError('required')">Nome obbligatorio</small>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-1">
                            <label for="lastname">Email</label>
                        </div>
                        <div class="col-6">
                            <input class="form-control"
                                    id="email" type="text" name="email" placeholder="Email"
                                    formControlName="emailRef">
                            <div><small class="text-danger" *ngIf="userForm.touched && userForm.get('emailRef').hasError('required')">Email obbligatoria</small></div>
                            <div><small class="text-danger" *ngIf="userForm.touched && userForm.get('emailRef').hasError('forbiddenMatching')">Email uguale a nome</small></div>
                            <div><small class="text-danger" *ngIf="userForm.touched && userForm.get('emailRef').hasError('email')">Email non valida</small></div>
                            <div><small class="text-danger" *ngIf="userForm.touched && userForm.get('emailRef').hasError('emailAlreadyInUse')">Email già in uso</small></div>
                        </div>
                    </div>
                    <div class="row mt-5">
                        <div class="col-1">
                            <input type="submit" value="SALVA" [disabled]="userForm.invalid">
                        </div>
                        <div class="col-1">
                            <input type="button" value="RESET" (click)="resetForm()">
                        </div>
                    </div>
                </form>
            </div>
        </ng-template>
    `
})
export class UserDetailComponent implements OnInit {
    loading: boolean;
    currentUser: User;
    userForm: FormGroup;

    @Output() statusChanged: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private userService: UsersService,
        private http: HttpClient
    ) {
        this.currentUser = null;
        this.loading = true;
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
        // 1. recupero dell'ID dell'utente
        this.route.params.pipe(
            tap(
                (value) => console.log(value)
            ),
            switchMap(
                // 2 Chiamata al service API ( recupero dell'utente )
                (routeValues) => this.userService.getUser(+routeValues.id)
            )
        ).subscribe(
            response => {
                console.log(response);
                // 3. Inizialzizazione del modello dei dati dell'utente
                this.currentUser = response;
                // 4. Inizialzizazione del reactuve form
                this.initForm();
            }
        );
    }

    /**
     * Metodo di creazione del form reactive
     */
    initForm(): void {

        const validators = [ Validators.required ];

        this.userForm = this.formBuilder.group({
            nameRef: [this.currentUser ? this.currentUser.name : '', validators],
            emailRef: [this.currentUser ? this.currentUser.email : '',
                Validators.compose(
                    [this.forbiddenMatchingValidator, Validators.required, Validators.email]
                ), this.userValidator()
            ]
        });
        this.userForm.valueChanges.subscribe(
            values => {
                console.log(values);
            }
        );
        this.userForm.statusChanges.subscribe(
            status => {
                console.log(status);
                console.log(this.userForm);
                this.statusChanged.emit(status);
            }
        );
        this.loading = false;
    }

    saveForm(): void {
        this.currentUser.name = this.userForm.value.nameRef;
        this.currentUser.email = this.userForm.value.emailRef;
    }

    resetForm(): void {
        this.userForm.markAsPristine();
        this.userForm.markAsUntouched();
        this.initForm();
    }

    forbiddenMatchingValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        if (!control.parent) {
            return null;
        }
        const name = control.parent.get('nameRef');
        return name && control && name.value.toLowerCase() === control.value.toLowerCase() ? { forbiddenMatching: true } : null;
    }

    userValidator(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
            return  this.userService.findUserByEmail(control.value)
                .pipe(
                    tap(
                        res => console.log(res)
                    ),
                    map((user: any) => {
                        if (user[0].id !== this.currentUser.id
                            && user[0].email === control.value) {
                            return {'emailAlreadyInUse': true};
                        } else {
                            return null;
                        }
                    })
                );
        };
    }
}

