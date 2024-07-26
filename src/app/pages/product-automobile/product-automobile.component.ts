import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MetadataService } from 'src/app/services/metadata.service';
import { TaxonomyService } from 'src/app/services/taxonomy.service';

@Component({
    selector: 'app-product-automobile',
    templateUrl: './product-automobile.component.html',
    styleUrls: ['./product-automobile.component.scss'],
})
export class ProductAutomobileComponent implements OnInit {
    public id: number = 0;
    name: string = '';

    constructor(
        private router: Router,
        private taxonomyService: TaxonomyService,
        private metadataService: MetadataService
    ) {}

    ngOnInit(): void {
        this.loadName();
    }

    public loadName() {
        this.taxonomyService
            .getTaxonomyInfo(this.router.url)
            .subscribe((data) => {
                const item = data[0];
                this.id = +item.tid;
                this.name = item.name;
                const title = `${this.name} - Automóveis - Honda Sala de Imprensa`;
                this.metadataService.updateMetadata({
                    title,
                });
            });
    }
}
