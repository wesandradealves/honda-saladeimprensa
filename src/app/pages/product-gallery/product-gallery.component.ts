import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { FileService } from 'src/app/services/file.service';
import { PageService } from 'src/app/services/page.service';

declare let $: any;

@Component({
    selector: 'app-product-gallery',
    templateUrl: './product-gallery.component.html',
    styleUrls: ['./product-gallery.component.scss'],
})
export class ProductGalleryComponent implements OnInit {
    typeGalery: any = '';
    category: any = '';
    idCategory: number = 0;

    public releases: any[] = new Array<any>();
    public releasesFiltered: any[] = new Array<any>();
    public segments: any[] = new Array<any>();
    currentPage: number = 0;
    itemsPerPage: number = 10;
    pageSize: number = 0;
    pageNumber: number = 0;
    url: string = environment.src_url;
    totalItems: number = 0;
    typePage: string = '';
    namePage: string = '';
    nameCategory: string = '';
    linkPage: string = '';
    seeMore: string = '';
    selectedGallery: string = '';
    parentId: number;
    isGlobal = false;

    constructor(
        private productService: ProductService,
        public fileService: FileService,
        private route: ActivatedRoute,
        private pageService: PageService
    ) {
        this.route.queryParamMap.subscribe((paramMap) => {
            this.isGlobal = paramMap.get('global') == 'true';
        });
        this.route.params.subscribe((params) => {
            this.typeGalery = params['type'];
            this.parentId = params['parentId']
            this.category = params['parent'];
        });
    }

    ngOnInit() {
        if (this.typeGalery == 'imagem') {
            this.typePage = 'imagens';
            this.namePage = 'Galeria de Imagens';
            this.seeMore = 'Ver galeria';
        } else {
            this.typePage = 'vídeos';
            this.namePage = 'Galeria de Vídeo';
            this.seeMore = 'Assistir galeria';
        }

        this.linkPage = '/' + this.category;

        if (this.category == 'motocicletas') {
            this.idCategory = 12;
            this.nameCategory = 'Motocicletas';
        } else if (this.category == 'automoveis') {
            this.idCategory = 11;
            this.nameCategory = 'Automóveis';
        } else if (this.category == 'motores-e-maquinas') {
            this.linkPage = '/motores-e-maquinas';
            this.idCategory = 13;
            this.nameCategory = 'Motores e Máquinas';
        } else if (this.category == 'corporativo') {
            this.idCategory = 14;
            this.nameCategory = 'Corporativo';
        }
        // this.filterReleasesPaginated();
    }

    public getMediaTypeDesc(count) {
        if (count == 1) {
            return this.typePage === 'vídeos' ? 'vídeo' : 'imagem';
        }
        return this.typePage;
    }

    public filterReleasesPaginated() {
        this.releases = [];

        if(this.parentId) {
            if(this.typeGalery == 'imagem') {
                this.pageService.getCorporativePhotoGallery(this.pageNumber, this.parentId).subscribe((data: any) => {
                    this.releases = data.rows;
                    this.totalItems = data.pager.total_items;
                })           
            } else {
                this.pageService.getCorporativeVideoGallery(this.pageNumber, this.parentId).subscribe((data: any) => {
                    this.releases = data.rows;
                    this.totalItems = data.pager.total_items;
                }) 
            }
        } else {
            this.productService
            .getMediaGalleryPaginated(
                this.typeGalery == 'imagem' ? 'photo' : 'video',
                this.pageNumber,
                this.idCategory,
                this.itemsPerPage,
                this.isGlobal
            )
            .subscribe((data: any) => {
                this.releases = data.rows;
                this.totalItems = data.pager.total_items;
            });
        }
    }

    public onPageChange(pageNum: number): void {
        this.pageNumber = pageNum - 1;
        this.filterReleasesPaginated();
    }

    public changePagesize(num: number): void {
        this.itemsPerPage = this.pageSize + num;
    }

    loadModalGallery(id: any) {
        this.selectedGallery = id;
    }

    isHidden(gallery) {
        if (gallery.type === 'galeria_de_videos' && !gallery.video_large_id) {
            return true;
        } else {
            return false;
        }
    }

    addToCart(origin, id, title, thumb) {
        const info = {
            title,
            thumb,
            type: 'Galeria',
        };
        this.fileService.setCart(origin, info, id, 'l');
    }
}
