import { Component, OnInit } from '@angular/core';
import { MetadataService } from 'src/app/services/metadata.service';

@Component({
    selector: 'app-power-product',
    templateUrl: './power-product.component.html',
    styleUrls: ['./power-product.component.scss'],
})
export class PowerProductComponent implements OnInit {
    constructor(private metadataService: MetadataService) {}

    ngOnInit(): void {
        this.metadataService.updateMetadata({
            title: 'Motores e Máquinas - Honda Sala de Imprensa',
        });
    }
}
