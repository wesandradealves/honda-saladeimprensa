import { Directive, HostListener, Input } from '@angular/core';

declare let dataLayer: any;

@Directive({
    selector: '[appGtmEvent]',
})
export class GtmEventDirective {
    @Input('gtm-category') gtmCategory: string;
    @Input('gtm-action') gtmAction: string;
    @Input('gtm-label') gtmLabel: string;

    constructor() {}

    @HostListener('click', ['$event.target'])
    onClick() {
        dataLayer.push({
            event: 'click',
            data: {
                category: this.gtmCategory,
                action: this.gtmAction,
                label: this.gtmLabel || undefined,
            },
        });
    }
}
