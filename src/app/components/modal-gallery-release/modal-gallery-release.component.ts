import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { environment } from '../../../environments/environment';
import { FileService } from 'src/app/services/file.service';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

declare let $: any;

@Component({
    selector: 'app-modal-gallery-release',
    templateUrl: './modal-gallery-release.component.html',
    styleUrls: ['./modal-gallery-release.component.scss'],
})
export class ModalGalleryReleaseComponent implements OnInit {
    @Input() galleryArray: any;
    @Input() title: any;
    @Input() imageId: any;
    @Input() initialIndex = 0;
    @ViewChild('slickModal') slickModal: SlickCarouselComponent;

    isMobile = false;
    showModalFilesSizes: boolean = false;
    showModalFilesSizesAll: boolean = false;

    gallery: Array<any> = [];

    public isPlaying: boolean = true;

    url: string = environment.src_url;
    counter: number = 1;
    lengthGallery: number = 1;
    currentSlide: number = 0;

    slideConfigGallery = {
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.slider-nav',
        infinite: true,
    };
    slideConfigThumb = {
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        nextArrow: "<div class='nav-btn next-slide'></div>",
        prevArrow: "<div class='nav-btn prev-slide'></div>",
        dots: false,
        centerMode: true,
        focusOnSelect: true,
        infinite: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 360,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    constructor(
        private fileService: FileService,
        private breakpointObserver: BreakpointObserver
    ) {}

    ngOnInit(): void {
        this.breakpointObserver
            .observe(['(max-width: 992px)'])
            .subscribe((state: BreakpointState) => {
                this.isMobile = state.matches;
            });

        this.loadGallery();
    }

    slickInit(e) {
        requestAnimationFrame(() => {
            this.slickModal.slickGoTo(this.initialIndex);
        });
    }

    beforeChange(e) {
        this.showModalFilesSizes = false;
        this.showModalFilesSizesAll = false;
    }

    afterChange(e) {
        this.currentSlide = e.currentSlide;
        this.counter = this.currentSlide + 1;
    }

    currentId() {
        if (this.gallery[this.currentSlide]?.type !== 'releases_image') {
            return this.gallery[this.currentSlide]?.video_large_id;
        } else {
            return this.gallery[this.currentSlide]?.item_id;
        }
    }
    isHidden() {
        const slide = this.gallery[this.currentSlide];
        if (slide?.type === 'video' && !slide?.video_large_id) {
            return true;
        } else {
            return false;
        }
    }

    loadGallery() {
        // fix for slick-carousel infinite bug
        if (
            this.galleryArray.length > 2 &&
            this.galleryArray.length <= this.slideConfigThumb.slidesToShow
        ) {
            this.slideConfigThumb.slidesToShow = this.galleryArray.length - 1;
        }
        this.gallery = this.galleryArray;
        this.lengthGallery = this.gallery.length;
    }

    loadModalGallery(id: any) {
        $('ul.slick-slider').slick('refresh');
    }

    selectSize() {
        this.showModalFilesSizes = !this.showModalFilesSizes;
        if (this.showModalFilesSizes) {
            this.showModalFilesSizesAll = false;
        }
    }

    selectSizeAll() {
        this.showModalFilesSizesAll = !this.showModalFilesSizesAll;
        if (this.showModalFilesSizesAll) {
            this.showModalFilesSizes = false;
        }
    }

    addToCart(origin, size?) {
        let id;
        let thumb;

        let type = '';

        if (origin === 'galleries') {
            type = 'Galeria de Imagem';
            id = this.gallery[0].gallery_id;
            thumb = this.gallery[0].image_preview;
        } else {
            type = 'Imagem';
            id = this.gallery[this.currentSlide].item_id;
            thumb = this.gallery[this.currentSlide].image_preview;
        }

        const info = {
            title: this.title,
            thumb,
            type,
        };
        this.showModalFilesSizes = false;
        this.showModalFilesSizesAll = false;

        this.fileService.addToCart({
            origin,
            info,
            id,
            size,
            gallery_id: this.gallery[0].gallery_id,
        });
    }
}
