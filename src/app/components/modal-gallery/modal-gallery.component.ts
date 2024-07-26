import {
    Component,
    OnInit,
    Input,
    ViewChild,
    ElementRef,
    AfterViewInit,
    Output,
    EventEmitter,
} from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { HomeService } from 'src/app/services/home.service';
import { environment } from '../../../environments/environment';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { FileService } from 'src/app/services/file.service';

declare let $: any;

@Component({
    selector: 'app-modal-gallery',
    templateUrl: './modal-gallery.component.html',
    styleUrls: ['./modal-gallery.component.scss'],
})
export class ModalGalleryComponent implements OnInit, AfterViewInit {
    @Input() id: any;
    @Input() title: any;
    @Input() thumb: any;
    @Input() video: boolean;
    @Input() imageId: any;
    @Input() initialIndex = 0;
    @Output() onClose: EventEmitter<void> = new EventEmitter();
    @ViewChild('slickModal') slickModal: SlickCarouselComponent;
    @ViewChild('slickModalNav') slickModalNav: SlickCarouselComponent;

    @ViewChild('rootEl')
    public rootEl: ElementRef;

    isMobile = false;
    gallery: Array<any> = [];
    filterSegment: Array<any> = [];
    url: string = environment.src_url;
    numberPhoto: number = 1;
    typeGallery: string = '';
    counter: number = 1;
    lengthGallery: number = 1;

    public isOpen: boolean = true;
    private changes: MutationObserver;

    currentSlide: number = 0;

    showModalFilesSizes: boolean = false;
    showModalFilesSizesAll: boolean = false;

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
                    slidesToShow: 1.5,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 360,
                settings: {
                    slidesToShow: 1.2,
                    slidesToScroll: 1,
                },
            },
        ],
    };

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
        requestAnimationFrame(() => {
            this.currentSlide = e.currentSlide;
            this.counter = this.currentSlide + 1;
        });
    }

    constructor(
        private homeService: HomeService,
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
        if (this.video) {
            this.typeGallery = 'vídeos';
        } else {
            this.typeGallery = 'imagens';
        }
    }

    ngAfterViewInit(): void {
        // Here is the Mutation Observer for that element works
        this.changes = new MutationObserver((mutations: MutationRecord[]) => {
            if (mutations.length) {
                this.isOpen = (
                    mutations[0].target as Element
                ).classList.contains('show');
            }
        });

        // Here we start observer to work with that element
        this.changes.observe(this.rootEl.nativeElement, {
            attributes: true,
            attributeFilter: ['class'],
            childList: false,
            characterData: false,
        });
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
        this.homeService.getPhotosGallery(this.id).subscribe((data: any) => {
            const tmpGallery = [];
            data.rows.forEach((item, index) => {
                if (
                    item.yt_video_preview.startsWith(
                        'https://www.youtube.com/watch'
                    )
                ) {
                    item.type = 'video';
                    let videoId = item.yt_video_preview.split('v=')[1];
                    const ampersandPosition = videoId.indexOf('&');
                    if (ampersandPosition != -1) {
                        videoId = videoId.substring(0, ampersandPosition);
                    }
                    item.video = 'https://www.youtube.com/embed/' + videoId;
                } else {
                    item.type = 'photo';
                }

                tmpGallery.push(item);
            });

            if (tmpGallery.length === 1) {
                this.typeGallery =
                    this.typeGallery === 'vídeos' ? 'vídeo' : 'imagem';
            } else {
                // fix for slick-carousel infinite bug
                if (
                    tmpGallery.length > 2 &&
                    tmpGallery.length <= this.slideConfigThumb.slidesToShow
                ) {
                    this.slideConfigThumb.slidesToShow = tmpGallery.length - 1;
                }
            }
            this.gallery = tmpGallery;
        });
    }

    closeModal() {
        this.isOpen = false;
        this.showModalFilesSizes = false;
        this.showModalFilesSizesAll = false;
        this.onClose.emit();
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

    currentId() {
        if (this.gallery[this.currentSlide]?.type === 'video') {
            return this.gallery[this.currentSlide]?.video_large_id;
        } else {
            return this.gallery[this.currentSlide]?.image_id;
        }
    }

    addToCart(origin, size?) {
        let id;
        let thumb;

        let type = '';

        if (origin == 'galleries') {
            id = this.id;
            thumb = this.thumb;

            if (this.video) {
                type = 'Galeria de Vídeo';
            } else {
                type = 'Galeria de Imagem';
            }
        } else if (this.video) {
            type = 'Vídeo';
            id = this.gallery[this.currentSlide].video_large_id;
            thumb = this.url + this.gallery[this.currentSlide].image_thumbnail;
            size = '';
        } else {
            type = 'Imagem';
            id = this.gallery[this.currentSlide].image_id;
            thumb = this.url + this.gallery[this.currentSlide].image_thumbnail;
        }

        thumb = this.gallery[this.currentSlide]?.image_thumbnail;
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
            gallery_id: this.id,
        });
    }
}
