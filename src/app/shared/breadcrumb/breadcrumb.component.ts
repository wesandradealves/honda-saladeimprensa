import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
    @Input() routeParent: any;
    @Input() nameParent: any;
    @Input() nameChildren: any;
    @Input() type: any;

    @Input() release: boolean;
    @Input() releaseSegment: any;
    @Input() releaseCorporate: any;
    @Input() releaseCorporateTitle: any;

    @Input() intermediateName: string;
    @Input() intermediateRoute: string;

    releaseRoute: string = '';
    segmentId: number = 0;
    segmentName: string = '';

    constructor() {}

    ngOnInit(): void {
        if (this.release) {
            if (this.releaseSegment == 'Motocicletas') {
                this.segmentId = 12;
                this.segmentName = 'motocicletas';
            } else if (this.releaseSegment == 'Automóveis') {
                this.segmentId = 11;
                this.segmentName = 'automoveis';
            } else if (this.releaseSegment == 'Motores e Máquinas') {
                this.segmentId = 13;
                this.segmentName = 'motores-e-maquinas';
            } else if (this.releaseSegment == 'Corporativo') {
                this.segmentId = 14;
            }
        }
    }
}
