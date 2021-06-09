import {AbstractControl, AsyncValidatorFn} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

export class ValidatorService {
/*
    userValidator(userId: number): AsyncValidatorFn {
        return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
            return  this.userService.findUserByEmail(control.value)
                .pipe(
                    tap(
                        res => console.log(res)
                    ),
                    map((user: any) => {
                        if (user[0].id !== userId
                            && user[0].email === control.value) {
                            return {'emailAlreadyInUse': true};
                        } else {
                            return null;
                        }
                    })
                );
        };
    }*/
}
