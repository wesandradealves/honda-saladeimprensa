import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { environment } from '../../../environments/environment';

declare let $: any;

@Component({
    selector: 'home-gallery',
    templateUrl: './home-gallery.component.html',
    styleUrls: ['./home-gallery.component.scss'],
})
export class HomeGalleryComponent implements OnInit {
    selectedGallery: string = '';
    gallery: Array<any> = [];
    banners: Array<any> = [];
    filterSegment: Array<any> = [];
    url: string = environment.src_url;

    constructor(private homeService: HomeService) {}

    ngOnInit() {
        this.loadGallery();
        this.loadBanner();
    }

    loadGallery() {
        const filterGallery: any = [];
        let line = '';
        let count = -1;

        this.homeService.getGallery().subscribe((data: any) => {
            data.rows.forEach((item: any) => {
                if (line != item.segment) {
                    line = item.segment;
                    count++;
                    filterGallery[count] = [];
                }
                filterGallery[count].push(item);
            });
            this.gallery.push(filterGallery);
        });
    }

    loadBanner() {
        this.homeService
            .getBannerFeatureGallery()
            .subscribe((data: any) => (this.banners = data));
    }

    getNameSegment(id: any) {
        for (var index in this.gallery[0]) {
            if (index == id) {
                return this.gallery[0][index][0]['segment'];
            }
        }
    }

    loadModalGallery(id: any) {
        this.selectedGallery = id;
    }
}
