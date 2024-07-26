import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReleaseDetail } from 'src/app/models/release-detail';
import { ReleaseService } from 'src/app/services/release.service';
import { FileService } from 'src/app/services/file.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { MetadataService } from 'src/app/services/metadata.service';
import { ToastrService } from 'ngx-toastr';
declare let $: any;

@Component({
    selector: 'app-details-release',
    templateUrl: './details-release.component.html',
    styleUrls: ['./details-release.component.scss'],
})
export class DetailsReleaseComponent implements OnInit {
    @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;

    public releaseId: number = 0;
    releaseDetail: Array<ReleaseDetail> = [];
    displaySocial: boolean = false;
    numberPhoto: number = 1;
    numberVideo: number = 1;
    url: string = environment.src_url;
    open: number = 0;
    selectedVideo: any;
    field_releases_featured_image_1: null;
    image_preview: any;
    release_image_gallery: any;

    segment_id: number = 0;
    zip = '';

    segments = [
        { label: 'Corporativo', value: 14 },
        { label: 'Motocicletas', value: 12 },
        { label: 'Automóveis', value: 11 },
        { label: 'Motores e Máquinas', value: 13 },
    ];
    
    slideConfigRelease = {
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

    slideConfigGallery = {
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.slider-nav',
        infinite: true,
    };
    slideConfigThumb = {
        slidesToShow: 9,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        nextArrow: "<div class='nav-btn next-slide'></div>",
        prevArrow: "<div class='nav-btn prev-slide'></div>",
        dots: false,
        centerMode: true,
        focusOnSelect: true,
        infinite: true,
    };

    constructor(
        private releaseService: ReleaseService,
        public fileService: FileService,
        private router: Router,
        private metadataService: MetadataService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.loadRelease();
    }

    loadRelease() {
        var ogImage = '/assets/img/honda_logo_thumb.png';

        this.releaseService
            .getReleaseBySlug(this.router.url)
            .subscribe((data) => {
                if (data.length) {
                    const item = data[0];
                    this.releaseId = item.release_id;
                    this.release_image_gallery = item?.release_image_gallery;

                    if(item.field_releases_featured_image_1) {
                        this.field_releases_featured_image_1 = item.field_releases_featured_image_1.trim();
                    }
                    
                    if(item.release_image_gallery && item.release_image_gallery.length) {
                        this.image_preview = item.release_image_gallery[0].image_preview;
                    }

                    this.releaseDetail.push(item);

                    if(item.featured_gallery_image) {
                        item.featured_gallery_image.forEach((image: any) => {
                            ogImage = image.field_releases_embed;
                        });
                    }

                    const description = item.body
                        .replace(/<\/?[^>]+(>|$)/g, '')
                        .substring(0, 100);
                    this.metadataService.updateMetadata({
                        title: `${item.title} - Honda Sala de Imprensa`,
                        image: this.url + ogImage,
                        description: description,
                    });

                    this.segment_id = this.segments.find(
                        (segment) => segment.label === item.segment_title
                    )?.value;
                }
            });
    }

    toggleSocial() {
        if (this.displaySocial == false) {
            this.displaySocial = true;
        } else {
            this.displaySocial = false;
        }
    }

    printDiv() {
        const printContent = document.getElementById('release-print');
        const WindowPrt = window.open(
            '',
            '',
            'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0'
        );
        WindowPrt.document.write(`
      <html>
        <head>
          <link rel="stylesheet" type="text/css" href="detail-release.component.scss">
        </head>
        <body onload="window.print();window.close()">${printContent.innerHTML}</body>
      </html>`);
        WindowPrt.document.close();
        WindowPrt.focus();
        WindowPrt.print();
        WindowPrt.close();
    }

    changeNumberPhoto(type: any, index: any, length: any) {
        let prenumber = 0;

        if (type == 'next') {
            prenumber = index + 1;

            if (prenumber <= length && prenumber > 0) {
                this.numberPhoto = prenumber;
            } else {
                this.numberPhoto = 1;
            }
        } else {
            prenumber = index - 1;

            if (prenumber <= length && prenumber > 0) {
                this.numberPhoto = prenumber;
            } else {
                this.numberPhoto = index;
            }
        }
    }

    changeNumberVideo(type: any, index: any, length: any) {
        let prenumber = 0;
        if (type == 'next') {
            prenumber = index + 1;

            if (prenumber <= length && prenumber > 0) {
                this.numberVideo = prenumber;
            } else {
                this.numberVideo = index;
            }
        } else {
            prenumber = index - 1;

            if (prenumber <= length && prenumber > 0) {
                this.numberVideo = prenumber;
            } else {
                this.numberVideo = index;
            }
        }
    }

    loadModalGallery(imageId) {
        this.open = imageId;
    }

    loadVideoModalGallery(video) {
        this.selectedVideo = video;
    }

    getReleaseFeaturedImage(release: ReleaseDetail) {
        if(release.featured_gallery_image) {
            return release.featured_gallery_image?.[0].field_releases_embed;
        }
        return release?.field_releases_featured_image_export?.field_releases_embed
    }

    addToCart(origin, id, title, type?, thumb?, gallery_id?) {
        const info = {
            title,
            thumb,
            type: type ? type : 'Release',
        };
        this.fileService.addToCart({ origin, info, id, gallery_id, size: 'l' , release_id: this.releaseId});
    }

    downloadPressKit() {
        let releaseId = this.releaseId;
        let origin = 'releases';

        this.toastr.info('O arquivo está sendo gerado e será baixado em breve.', '', {
            disableTimeOut: true,
        });

        this.fileService.download(origin, releaseId).subscribe((data: any) => {
            this.zip = data.link;
            setTimeout(() => {
                document.getElementById(`link-zip-${this.zip}`).click();
                this.toastr.success(
                    'Arquivo gerado com sucesso. Download em andamento.',
                    'Download'
                );
            }, 150);
        });
    }
}
