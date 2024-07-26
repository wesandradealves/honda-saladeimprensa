import { Component, OnInit } from '@angular/core';
import { BannerPages } from 'src/app/models/banner-pages';
import { PageService } from 'src/app/services/page.service';
import { environment } from '../../../environments/environment';
import { MetadataService } from 'src/app/services/metadata.service';

declare let $: any;

@Component({
    selector: 'app-racing-banner',
    templateUrl: './racing-banner.component.html',
    styleUrls: ['./racing-banner.component.scss'],
})
export class RacingBannerComponent implements OnInit {
    banners: Array<BannerPages> = [];

    url: string = environment.src_url;

    constructor(
        private pageService: PageService,
        private metadataService: MetadataService
    ) {}

    ngOnInit() {
        this.loadBanners();
        $('#bannerRacing.carousel').carousel({
            interval: 6900,
            pause: 'false',
        });
    }

    loadBanners() {
        this.pageService.getSegmentBanners().subscribe((data: any) => {
            data.forEach((item: any) => {
                this.banners.push(item);
            });
            const title = 'Racing Spirit - Honda Sala de Imprensa';
            this.metadataService.updateMetadata({
                title,
                description: this.banners[1]?.title || title,
                image: this.url + this.banners[0]?.field_imagem_desktop,
            });
        });
    }
}
