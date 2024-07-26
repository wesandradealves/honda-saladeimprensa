import { Component, Input, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FileService } from 'src/app/services/file.service';
import { Location } from '@angular/common';
import { ProductService } from 'src/app/services/product.service';
import { PageService } from 'src/app/services/page.service';

declare let $: any;
declare let dataLayer: any;

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
    selector: 'app-last-releases-list',
    templateUrl: './last-releases-list.component.html',
    styleUrls: ['./last-releases-list.component.scss'],
})
export class LastReleasesListComponent implements OnInit {
    @Input() corporative: any;
    public releases: any[] = new Array<any>();
    public releasesFiltered: any[] = new Array<any>();
    public segments: any[] = new Array<any>();
    isLoading = true;
    paramId: number = 0;
    selectedSegment: any = 0;
    showPagination = false;
    pagecur: number = 3;
    itemsPerPage: number = 10;
    pageSize: number = 0;
    pageNumber: number = 1;
    url: string = environment.src_url;
    totalItems: number = 0;
    productId: number;
    parentId: number;

    constructor(
        private homeService: HomeService,
        private productService: ProductService,
        private route: ActivatedRoute,
        private pageService: PageService,
        public router: Router,
        public location: Location,
        public fileService: FileService
    ) {
        this.route.params.subscribe((params) => {
            this.paramId = params['id'];
            this.parentId = params['parentId'];
        });
        this.route.queryParamMap.subscribe((paramMap) => {
            this.pageNumber = parseInt(paramMap.get('pagination'), 10) || 1;
            this.productId = parseInt(paramMap.get('productId'), 10);
            this.showPagination = true;
        });
    }

    ngOnInit() {
        this.selectedSegment = this.paramId;

        this.loadSegments();
        this.filterReleasesPaginated();
    }

    public loadSegments() {
        this.segments = [];
        this.isLoading = true;
        this.homeService.getReleasesSegments().subscribe(
            (data: any) => {
                data.forEach((item: any) => {
                    if (item.segment_name) {
                        if (this.selectedSegment === item.segment_name) {
                            this.selectedSegment = item.segment_id;
                        }
                        this.segments.push(item);
                    }
                });
                this.isLoading = false;
            },
            () => (this.isLoading = false)
        );
    }

    public filterReleases(segment: any) {
        this.pageNumber = 1;
        this.selectedSegment = segment;
        this.location.replaceState(`/ultimos-releases/${segment}`);
        this.filterReleasesPaginated();
    }

    public filterReleasesMobile(event: any) {
        this.filterReleases(event.target.value);
    }

    public filterReleasesPaginated() {
        this.releases = [];
        this.isLoading = true;
        let $observable;

        if(this.productId) {
            $observable = this.productService.getProductRelease(this.productId);
        } else if(this.parentId) {
            $observable = this.pageService.getCorporativeReleases(this.parentId)
        } else {
            $observable = this.homeService.getReleasesPaginated(
                this.pageNumber - 1,
                this.selectedSegment
            ); 
        }

        this.getReleases($observable);
    }

    public onPageChange(pageNum: number): void {
        dataLayer.push({
            event: 'click',
            data: {
                category: 'ultimos releases',
                action: 'pagina',
                label: `pagina:${pageNum}`,
            },
        });

        if(this.parentId) {
            const $observable = this.pageService.getCorporativeReleasesPaginated(pageNum -1, this.parentId);
            this.getReleases($observable);
        } else {
            this.router.navigate(['/ultimos-releases/' + this.selectedSegment], {
                queryParams: { pagination: pageNum },
            });
        }
    }

    public changePagesize(num: number): void {
        this.itemsPerPage = this.pageSize + num;
    }

    formatInput(input: HTMLInputElement) {
        input.value = input.value.replace(FILTER_PAG_REGEX, '');
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

    getReleases($observable) {
        this.releases = [];
        $observable.subscribe(
            (data: any) => {
                data.rows.forEach((item: any) => {
                    if (
                        !Boolean(+this.selectedSegment) ||
                        item.segment_id == this.selectedSegment
                    ) {
                        this.releases.push(item);
                    }
                });
                this.totalItems = data.pager.total_items;
                this.isLoading = false;
            },
            () => (this.isLoading = false),
            window.scrollTo(0, 0)
        );
    }
}
