import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthStoreService} from '../../core/services/security/auth-store.service';
import {UserRolesSecurityService} from '../../core/services/security/user-roles-security.service';

@Directive({
    selector: '[tcsProfiler]'
})
export class ProfilerDirective implements OnInit {

    @Input('tcsProfiler') functionName: string;

    constructor(
        private viewContainerRef: ViewContainerRef,
        private templateRef: TemplateRef<any>,
        private authStore: AuthStoreService,
        private userRoleService: UserRolesSecurityService
    ) {
        console.log(viewContainerRef);
        console.log(templateRef);
    }

    ngOnInit(): void {
        this.applyProfiler();
    }

    private applyProfiler(): void {
        if (this.functionName) {
            this.authStore.authStore$.subscribe(
                userData => {
                    if (!userData) {
                        return;
                    }
                    if (this.userRoleService.hasAnyRole(userData.role, this.functionName)) {
                        this.viewContainerRef.createEmbeddedView(this.templateRef);
                    }
                }
            );
        }
    }
}
