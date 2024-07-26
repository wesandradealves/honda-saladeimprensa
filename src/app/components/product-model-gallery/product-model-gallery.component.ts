import { Component, OnInit, Input } from '@angular/core';
import { Releases } from 'src/app/models/releases';
import { ProductService } from 'src/app/services/product.service';
import { environment } from '../../../environments/environment';
import { FileService } from 'src/app/services/file.service';
import * as fileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';

declare let $: any;

@Component({
    selector: 'app-product-model-gallery',
    templateUrl: './product-model-gallery.component.html',
    styleUrls: ['./product-model-gallery.component.scss'],
})
export class ProductModelGalleryComponent implements OnInit {
    @Input() id: any;
    @Input() type: any;
    @Input() name: any;

    public galleries: any[] = new Array<any>();
    typePage: string = '';
    seeMore: string = '';
    selectedSegment: number = 0;
    selectedGallery: string = '';
    url: string = environment.src_url;
    slideProductConfig = {
        arrows: true,
        slidesPerRow: 3,
        rows: 2,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesPerRow: 1,
                    rows: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesPerRow: 1,
                    rows: 1,
                },
            },
        ],
    };
    slideProductConfigMobile = {
        arrows: true,
        slidesPerRow: 1,
        rows: 1,
    };

    constructor(
        private productService: ProductService,
        public fileService: FileService,
        private toastr: ToastrService
    ) {}

    ngOnInit() {
        if (this.type == 'image') {
            this.typePage = 'imagens';
            this.seeMore = 'Ver galeria';
        } else {
            this.typePage = 'vídeos';
            this.seeMore = 'Assistir galeria';
        }

        this.loadGallery();
    }

    public getMediaTypeDesc(count) {
        if (count == 1) {
            return this.typePage === 'vídeos' ? 'vídeo' : 'imagem';
        }
        return this.typePage;
    }

    public getAllGaleriesIds() {
        return [
            ...new Set(this.galleries.map((gallery) => gallery.gallery_id)),
        ];
    }

    public loadGallery() {
        this.galleries = [];
        if (this.type == 'video') {
            this.productService
                .getProductVideoGallery(this.id)
                .subscribe((data: any) => (this.galleries = data.rows));
        } else {
            this.productService
                .getProductPhotoGallery(this.id)
                .subscribe((data: any) => (this.galleries = data.rows));
        }
    }

    changeNumberPhoto(type: any, index: any) {
        if (type == 'next') {
            index = index + 1;
        } else {
            index = index - 1;
        }
    }

    loadModalGallery(id: any) {
        // console.log(id);
        this.selectedGallery = id;
    }

    download(origin, id, galleryId) {
        this.toastr.info('O arquivo será baixado em breve.');
        this.fileService.checkFilesSize(origin, id).subscribe((resp: any) => {
            this.fileService.downloadFileSingle(origin, id, galleryId).subscribe(
                (data: any) => {
                    const name = resp.infos.files[0].name;
                    const type = resp.infos.files[0].type;
                    const blob = new Blob([data], { type: type });
                    fileSaver.saveAs(blob, name);

                    this.toastr.success(
                        'O download foi concluído com sucesso.',
                        'Download Concluído.'
                    );
                },
                (err) =>
                    this.toastr.error('Houve um erro no download.', 'Error')
            );
        });
    }

    isHidden(gallery) {
        if (
            (gallery.type === 'galeria_de_videos' ||
                gallery.type === 'releases_video') &&
            !gallery.video_large_id
        ) {
            return true;
        } else {
            return false;
        }
    }

    addToCart(origin, id, title, thumb, type, gallery_id) {
        const info = {
            title,
            thumb,
            type,
        };

        this.fileService.addToCart({
            origin,
            info,
            id,
            size: 'l',
            product_id: [this.id],
            gallery_id
        });
    }

    addGalleriesToCart(ids) {
        if (ids.length) {
            ids.forEach((id) => {
                const info = {
                    title: this.name,
                    thumb: this.galleries.find((item) => item.gallery_id === id)
                        ?.image_thumbnail,
                    type: `Galeria de ${this.getMediaTypeDesc(
                        this.galleries.length
                    )}`,
                };
                this.fileService.setCart('galleries', info, id, 'l');
            });
        }
    }
}
