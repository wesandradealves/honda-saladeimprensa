import { Component, OnInit } from '@angular/core';
import { Releases } from 'src/app/models/releases';
import { HomeService } from 'src/app/services/home.service';
import { environment } from '../../../environments/environment';
import { FileService } from 'src/app/services/file.service';

declare let $: any;

@Component({
    selector: 'app-last-releases',
    templateUrl: './last-releases.component.html',
    styleUrls: ['./last-releases.component.scss'],
})
export class LastReleasesComponent implements OnInit {
    public releases: any[] = new Array<any>();
    public releasesFiltered: any[] = new Array<any>();
    public segments: any[] = new Array<any>();
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
        private homeService: HomeService,
        public fileService: FileService
    ) {}

    ngOnInit() {
        this.loadSegments();
        this.loadRelease();
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
        this.homeService.getLastReleases().subscribe((data: any) => {
            data.rows.forEach((item: any) => {
                this.releases.push(item);
            });
        });
    }

    public loadSegments() {
        this.segments = [];
        this.homeService.getReleasesSegments().subscribe((data: any) => {
            data.forEach((item: any) => {
                if (item.segment_name) {
                    this.segments.push(item);
                }
            });
        });
    }

    public filterReleases(segment: any) {
        this.selectedSegment = segment;
        if (segment != 0) {
            this.releases = [];
            this.homeService
                .getReleasesFiltered(segment)
                .subscribe((data: any) => {
                    this.homeService.selectedSegment = segment;
                    data.rows.forEach((item: any) => {
                        if (item.segment_id == segment) {
                            this.releases.push(item);
                        }
                    });
                });
        } else {
            this.loadLastReleases();
        }
    }

    private loadRelease() {
        if(this.homeService.selectedSegment) {
            this.filterReleases(this.homeService.selectedSegment)
        } else {
            this.loadLastReleases();
        }
    }

    public filterReleasesMobile(event: any) {
        let segment = event.target.value;
        this.selectedSegment = segment;
        if (segment != 0) {
            this.releases = [];
            this.homeService
                .getReleasesFiltered(segment)
                .subscribe((data: any) => {
                    data.rows.forEach((item: any) => {
                        if (item.segment_id == segment) {
                            this.releases.push(item);
                        }
                    });
                });
        } else {
            this.loadLastReleases();
        }
    }

    addToCart(id, title, thumb, release_id) {
        const info = {
            id,
            title,
            thumb,
            type: 'Release'
        };
        this.fileService.setCart('files', info, id, 'l', release_id);
    }
}
