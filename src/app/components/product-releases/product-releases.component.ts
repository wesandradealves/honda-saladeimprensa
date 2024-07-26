import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { environment } from '../../../environments/environment';
import { ProductService } from 'src/app/services/product.service';
import { PageService } from 'src/app/services/page.service';
import { FileService } from 'src/app/services/file.service';
import { Router } from '@angular/router';

declare let $: any;

@Component({
    selector: 'app-product-releases',
    templateUrl: './product-releases.component.html',
    styleUrls: ['./product-releases.component.scss'],
})
export class ProductReleasesComponent implements OnInit {
    @Input() parentId: any;
    @Input() global: any;
    @Input() corporative: any;

    public releases: Array<any> = new Array<any>();
    public releasesFiltered: any[] = new Array<any>();
    public segments: any[] = new Array<any>();
    totalItems: number;
    url: string = environment.src_url;
    slideConfig = {
        slidesToShow: 1.7,
        slidesToScroll: 1,
        infinite: false,
        dots: true,
        centerMode: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    dots: true,
                },
            },
            {
                breakpoint: 680,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 580,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1.7,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 410,
                settings: {
                    slidesToShow: 1.5,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 360,
                settings: {
                    slidesToShow: 1.3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 300,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ],
    };

    constructor(
        private homeService: HomeService,
        private productService: ProductService,
        private router: Router,
        public fileService: FileService,
        private pageService: PageService
    ) {}

    ngOnInit() {
        this.loadLastReleases();
        $('.multiple-items').slick({
            infinite: false,
            slidesToShow: 1.7,
            slidesToScroll: 1,
            dots: true,
            centerMode: false,
        });
    }

    public loadLastReleases() {
        this.releases = [];
        if (this.global) {
            this.productService
                .getProductGlobalReleases(this.global)
                .subscribe((data: any) => {
                    this.getReleases(data);
                });
        } else if (this.corporative) {
            this.pageService
                .getCorporativeReleases(this.parentId)
                .subscribe((data: any) => {
                    this.getReleases(data);
                });
        } else {
            this.homeService
                .getReleasesFiltered(this.parentId)
                .subscribe((data: any) => {
                    this.getReleases(data);
                });
        }
    }

    addToCart(id, title, thumb, release_id) {
        const info = {
            id,
            title,
            thumb,
            type: 'Release',
        };
        this.fileService.setCart('files', info, id, 'l', release_id);
    }
    
    navigateTo() {
        const extra = this.corporative ? `/${this.parentId}` : '';
        const param = this.corporative ? 14 : this.parentId;
        const route = `/ultimos-releases/${param}${extra}`;
        this.router.navigate([route]);    
    }

    private getReleases(data) {
        this.totalItems = Number(data.pager.total_items);

        data.rows.forEach((item: any) => {
            this.releases.push(item);
        });
    }
}
