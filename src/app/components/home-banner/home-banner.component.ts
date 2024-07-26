import { Component, OnInit } from '@angular/core';
import { HomeBanner } from 'src/app/models/home-banner';
import { BannerService } from 'src/app/services/banner.service';
import { environment } from '../../../environments/environment';

declare let $: any;

@Component({
    selector: 'home-banner',
    templateUrl: './home-banner.component.html',
    styleUrls: ['./home-banner.component.scss'],
})
export class HomeBannerComponent implements OnInit {
    banners!: HomeBanner[];
    url: string = environment.src_url;

    constructor(private bannerService: BannerService) {}

    ngOnInit() {
        this.loadBanners();
        $('#bannerHome.carousel').carousel({
            interval: 6900,
            pause: 'false',
        });
    }

    loadBanners() {
        this.bannerService.getBanners().subscribe((result) => {
            result.forEach(banner => {  
                banner.title = banner.title.replace(/&amp;/g, "&")
                .replace(/&quot;/g, "\"")
                .replace(/&apos;/g, "'")
                .replace(/&gt;/g, ">")
                .replace(/&lt;/g, "<");
            });
           
            this.banners = result;
        });
    }
}
