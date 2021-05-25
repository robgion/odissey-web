import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {InvoicesStoreService} from '../../../../core/services/invoices-store.service';
import {ClientsStoreService} from '../../../../core/services/clients-store.service';
import {Observable, Subject} from 'rxjs';
import {Invoice} from '../../../../model/invoice';
import {Client} from '../../../../model/client';
import {Router} from '@angular/router';
import {map, switchMap, takeUntil} from 'rxjs/operators';
import {ProfileStoreService} from '../../../../core/services/profile-store.service';
import {User} from '../../../../model/user';
import {BaseComponent} from '../../../views/base/base';

@Component({
    selector: 'tcs-print',
    encapsulation: ViewEncapsulation.None,
    template: `

        <div class="text-center">
            <div class="btn-group">
                <button class="btn btn-outline-primary" (click)="goBack()">back</button>
                <button class="btn btn-primary" (click)="printDoc()">Print</button>
            </div>
        </div>


        <div class="container">

            <!--HEADER-->
            <div
                    class="d-flex flex-row justify-content-between mt-3"
                    *ngIf="(profile$ | async) as profile"
            >
                <div
                        *ngIf="(invoice$ | async) as invoice"
                        class="text-right"
                >
                    <h4>CLIENT</h4>

                    <div><strong>{{client?.name}}</strong></div>
                    <div>{{client?.address}}</div>
                </div>

                <div class="text-right">
                    <h4>FROM</h4>
                    <br>
                    <div><strong>{{profile.name?.toUpperCase()}}</strong></div>
                    <div>{{profile.address}}</div>
                </div>
            </div>

            <hr>

            <div *ngIf="(invoice$ | async) as invoice">
                <div>
                    Invoice Number: <strong>{{invoice?.invoiceNumber}}</strong> ({{invoice.date | date}})
                </div>

                <div>
                    Subject: {{invoice.subject}}
                </div>


                <hr>
                <h3>ITEMS</h3>

                <li
                        *ngFor="let item of invoice.items"
                        class="list-group-item"
                >
                    <div class="d-flex flex-row justify-content-between">
                        <div>{{item.text}}</div>
                        <div>€ {{item.price}}</div>
                    </div>

                </li>

                <div class="d-flex flex-row justify-content-end mt-3">
                    <div class="text-right">
                        <h5>Amount: € {{invoice.total | currency}}</h5>
                        <h6>VAT: € {{invoice.total * 0.22 | currency }}</h6>
                        <h5>Total: € {{invoice.total * 1.22 | currency}}</h5>
                    </div>
                </div>

            </div>

            <!--<pre>{{$profile | async | json}}</pre>
            <pre>{{$invoice | async | json}}</pre>-->


        </div>
    `,
    styles: [`
        @media print {
            fb-navbar,
            .btn {
                display: none;
            }
        }
    `]
})
export class PrintComponent extends BaseComponent implements OnInit, OnDestroy {

    invoice$: Observable<Invoice>;
    clients$: Observable<Client[]>;
    profile$: Observable<User>;
    client: Client;

    constructor(
        private router: Router,
        private invoicesStore: InvoicesStoreService,
        private clientsStore: ClientsStoreService,
        private profileStore: ProfileStoreService
    ) {
        super();
        this.invoice$ = invoicesStore.activeInvoice$;
        this.clients$ = clientsStore.clients$;
        this.profile$ = profileStore.profile$;
        this.invoice$.pipe(
            switchMap(
                env => this.clients$.pipe(
                    takeUntil(this.destroy$),
                    map(
                        cls => cls.find(
                            cl => cl.id === env.clientID
                        )
                    ),
                )
            )
        ).subscribe(
            cl => this.client = cl
        );
    }

    ngOnInit(): void {
        this.profileStore.loadProfile();
    }

    goBack(): void {
        this.router.navigateByUrl('invoices');
    }

    printDoc(): void {
        window.print();
    }

  ngOnDestroy(): void {
    this.unsubscribe();
  }


}
