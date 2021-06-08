import {Directive, ElementRef} from '@angular/core';


@Directive({
    selector: '[aqHighLight]'
})
export class HighLightDirective {

    constructor(
        private element: ElementRef
    ) {
        this.element.nativeElement.style.color = 'red';
    }
}
