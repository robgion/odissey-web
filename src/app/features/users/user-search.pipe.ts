import {Pipe, PipeTransform} from '@angular/core';
import {User} from '../../model/user';

@Pipe({
    name: 'userFilter'
})
export class UserSearchPipe implements PipeTransform {


    transform(users: User[], searchText: string): any {

        if (!searchText) {
            return users;
        }
        searchText = searchText.toLowerCase();
        return users.filter(
            us => us.name.toLowerCase().includes(searchText) || us.email.toLowerCase().includes(searchText)
        );
    }
}
