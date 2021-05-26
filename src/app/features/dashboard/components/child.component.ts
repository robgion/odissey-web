import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Data} from './father.component';
import {DataService} from './data.service';
import {takeUntil} from 'rxjs/operators';
import {AbstractBaseComponent} from './abstract-base-component';

@Component({
    selector: 'tcs-child',
    template: `
        <p>
            child works!
        </p>
        <p>{{ data?.value }}</p>
        <p>Check: {{ check}}</p>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent extends AbstractBaseComponent implements OnInit, OnDestroy {

    @Input() data: Data;
    @Input() check: boolean;

    // subscription: Subscription;

    constructor(
        private dataService: DataService,
        private cdr: ChangeDetectorRef
    ) {
        super();
        this.data = {
            value: 0
        };
        this.check = false;
    }

    ngOnInit(): void {
        // this.subscription = this.dataService.data$
        this.dataService.data$
            .pipe(
                takeUntil(this.notifyDestroy)
            )
            .subscribe(
            r => {
                this.check = r.dataBool;
                this.cdr.detectChanges();
            }
        );
    }

  ngOnDestroy(): void {
      // 1. singola unsubscribe
      // this.subscription.unsubscribe();
    // 2. caso multiplo
    this.notifyUnsubscribe();
  }

}
