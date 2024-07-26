import { Component, OnInit } from '@angular/core';
import { CorporateExtra } from 'src/app/models/corporate-extra';
import { PageService } from 'src/app/services/page.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { MetadataService } from 'src/app/services/metadata.service';
import { TaxonomyService } from 'src/app/services/taxonomy.service';

@Component({
    selector: 'app-honda-corporative',
    templateUrl: './honda-corporative.component.html',
    styleUrls: ['./honda-corporative.component.scss'],
})
export class HondaCorporativeComponent implements OnInit {
    extras: CorporateExtra[] = [];
    url: string = environment.src_url;
    id: number;
    name: string = '';

    constructor(
        private pageService: PageService,
        private metadataService: MetadataService,
        private taxonomyService: TaxonomyService,
        private router: Router
    ) {}

    ngOnInit() {
        this.loadName();
    }

    loadCorporateExtra() {
        this.pageService.getCorporateExtra(this.id).subscribe((data: any) => {
            data.forEach((item: any) => {
                this.extras.push(item);
            });
        });
    }

    loadName() {
        this.taxonomyService
            .getTaxonomyInfo(this.router.url)
            .subscribe((data) => {
                const item = data[0];
                this.id = +item.tid;
                this.name = item.name;
                const title = `${this.name} - Corporativo - Honda Sala de Imprensa`;
                this.metadataService.updateMetadata({
                    title,
                });

                this.loadCorporateExtra();
            });
    }
}
