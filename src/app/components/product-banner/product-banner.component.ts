import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { EventService } from 'src/app/services/event.service';
import { BannerPages } from 'src/app/models/banner-pages';
import { environment } from '../../../environments/environment';
import { FileService } from 'src/app/services/file.service';
import { MetadataService } from 'src/app/services/metadata.service';
import { ViewChild, ElementRef } from '@angular/core';

declare let $: any;

@Component({
    selector: 'app-product-banner',
    templateUrl: './product-banner.component.html',
    styleUrls: ['./product-banner.component.scss'],
})
export class ProductBannerComponent implements OnInit {
    @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;

    @Input() parentName: any;
    @Input() corporative: any;
    @Input() global: any;
    @Input() product: any;
    @Input() event: any;
    description: string = '';
    banner?: BannerPages;
    banners: Array<any> = [];
    url: string = environment.src_url;
    zip: '';
    constructor(
        private productService: ProductService,
        private fileService: FileService,
        private metadataService: MetadataService,
        private eventService: EventService
    ) {}

    ngOnInit() {
        this.loadBanners();
        $('#productBanner.carousel').carousel({
            interval: 6900,
            pause: 'false',
        });
    }

    loadBanners() {
        if (this.corporative) {
            this.productService
                .getCorporativeBanners(this.corporative)
                .subscribe((data: any) => {
                    this.banner = data[0];

                    this.metadataService.updateMetadata({
                        image: this.url + this.banner.field_imagem_desktop,
                    });

                    data.forEach((item: any) => {
                        this.banners.push(item);
                    });
                });
        } else if (this.global) {
            this.productService
                .getProductGlobalBanner(this.global)
                .subscribe((data: any) => {
                    this.banner = data[0];
                    data.forEach((item: any) => {
                        this.banners.push(item);
                    });
                });
        } else if (this.event) {
            this.eventService
                .getEventBanner(this.event)
                .subscribe((data: any) => {
                    this.banner = data[0];
                    this.metadataService.updateMetadata({
                        description:
                            this.banner?.title ||
                            'Evento - Honda Sala de Imprena',
                        image: this.url + this.banner?.field_imagem_desktop,
                    });
                    data.forEach((item: any) => {
                        this.banners.push(item);
                    });
                });
        } else {
            this.productService
                .getBanners(this.parentName)
                .subscribe((data: any) => {
                    this.banner = data[0];
                    if (
                        this.parentName == 'motocicletas' ||
                        this.parentName == 'automoveis'
                    ) {
                        let title: string = '';
                        if (this.parentName == 'motocicletas') {
                            title = `Motocicletas - Honda Sala de Imprensa`;
                        } else {
                            title = `Automóveis - Honda Sala de Imprensa`;
                        }
                        this.metadataService.updateMetadata({
                            title,
                            description: this.banner?.title || title,
                            image: this.url + this.banner?.field_imagem_desktop,
                        });
                    } else {
                        this.metadataService.updateMetadata({
                            description: this.banner?.title,
                            image: this.url + this.banner?.field_imagem_desktop,
                        });
                    }
                    data.forEach((item: any) => {
                        this.banners.push(item);
                    });
                });
        }
    }

    addToCart() {
        if (this.event) {
            this.fileService.setCart('products', 'Evento', this.event);
        }

        if (this.product) {
            const info = {
                title: 'Press Kit',
            };
            this.fileService.setCart('products', 'Press Kit', this.product);
        }
    }
    downloadPressKit(origin, id, e?: any) {
        if (e) {
            e.preventDefault();
        }

        this.fileService.checkFilesSize(origin, id).subscribe((resp: any) => {
            this.fileService.download(origin, id).subscribe((data: any) => {
                this.zip = data.link;
                console.log(this.zip);
                setTimeout(() => {
                    if (this.zip) {
                        document.getElementById('link-zip-' + this.zip).click();
                    }
                }, 10);
            });
        });
    }
}
