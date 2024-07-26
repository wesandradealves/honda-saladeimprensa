import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ProductService } from 'src/app/services/product.service';
import { PageService } from 'src/app/services/page.service';
import { FileService } from 'src/app/services/file.service';
import { Router } from '@angular/router';


declare let $: any;

@Component({
    selector: 'app-product-gallery-inside',
    templateUrl: './product-gallery-inside.component.html',
    styleUrls: ['./product-gallery-inside.component.scss'],
})
export class ProductGalleryInsideComponent implements OnInit {
    @Input() parentId: any;
    @Input() typeGalery: any;
    @Input() category: any;
    @Input() global: any;
    @Input() corporative: any;

    pageNumber: number = 0;
    showSeeAllButton = true;
    public galleries: any[] = new Array<any>();
    selectedGallery: string = '';
    typePage: string = '';
    seeMore: string = '';
    selectedSegment: number = 0;
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
        private productService: ProductService,
        public fileService: FileService,
        private pageService: PageService,
        private router: Router
    ) {}

    ngOnInit() {
        if (this.typeGalery == 'imagem') {
            this.typePage = 'imagens';
            this.seeMore = 'Ver galeria';
        } else {
            this.typePage = 'vídeos';
            this.seeMore = 'Assistir galeria';
        }

        this.loadGallery();
        $('.multiple-items').slick({
            infinite: false,
            slidesToShow: 1.7,
            slidesToScroll: 1,
            dots: true,
            centerMode: false,
        });
    }

    public getMediaTypeDesc(count) {
        if (count == 1) {
            return this.typePage === 'vídeos' ? 'vídeo' : 'imagem';
        }
        return this.typePage;
    }

    public setGallery(response) {
        this.showSeeAllButton =
            response.pager?.current_page < response.pager?.total_pages - 1;
        this.galleries = response.rows;
    }

    public loadGallery() {
        this.galleries = [];
        if (this.typeGalery == 'imagem') {
            if (this.global) {
                this.productService
                    .getProductGlobalPhotos(this.global)
                    .subscribe((data: any) => this.setGallery(data));
            } else if (this.corporative) {
                this.pageService
                    .getCorporativePhotoGallery(this.pageNumber, this.parentId)
                    .subscribe((data: any) => this.setGallery(data));
            } else {
                this.productService
                    .getPhotoGallery(this.parentId)
                    .subscribe((data: any) => this.setGallery(data));
            }
        } else {
            if (this.global) {
                this.productService
                    .getProductGlobalVideos(this.global)
                    .subscribe((data: any) => this.setGallery(data));
            } else if (this.corporative) {
                this.pageService
                    .getCorporativeVideoGallery(this.pageNumber, this.parentId)
                    .subscribe((data: any) => this.setGallery(data));
            } else {
                this.productService
                    .getVideoGallery(this.parentId)
                    .subscribe((data: any) => this.setGallery(data));
            }
        }
    }
    isHidden(gallery) {
        if (gallery.type === 'galeria_de_videos' && !gallery.video_large_id) {
            return true;
        } else {
            return false;
        }
    }
    loadModalGallery(id: any) {
        // console.log(id);
        this.selectedGallery = id;
    }

    addToCart(id, title, thumb) {
        let type = 'Galeria';
        if (this.typeGalery === 'imagem') {
            type += ' de Imagem';
        } else if (this.typeGalery === 'video') {
            type += ' de Vídeo';
        }

        const info = {
            title,
            thumb,
            type,
        };

        this.fileService.setCart('galleries', info, id, 'l');
    }

    navigateTo() {
        const extra = this.category === 'corporativo' ? `/${this.parentId}` : '';
        const route = `/galeria/${this.typeGalery}/${this.category}${extra}`;
        this.router.navigate([route], { queryParams: { global: this.global ? true : undefined } });    
    }
}
