import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserRolesManager} from '../../../model/user-roles-manager';

@Injectable()
export class UserRolesSecurityService {

    private rolesManager: UserRolesManager = new UserRolesManager();

    constructor(
        private http: HttpClient,
    ) {}

    get profiler(): UserRolesManager {
        return Object.assign({}, this.rolesManager);
    }

    public load(): void {
        this.http.get<any>('assets/roles.json').subscribe(
            res => {
                console.log(res);
                this.rolesManager.roles = res.roles as any[];
            }
        );
    }

    public hasAnyRole(userRole: string, functionName: string): boolean {
        const role = this.rolesManager.roles.find(r => r.role === userRole);
        if (role) {
            return !! (role.functions.find(f => f === functionName));
        }
        return false;
    }
}
