import { Component, OnInit } from '@angular/core';
import { EventInfo, EventDescription } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
import { FileService } from 'src/app/services/file.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { MetadataService } from 'src/app/services/metadata.service';

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
    id: number;
    generalInfo: EventInfo;
    events: EventDescription[];
    seeButtonsShare: boolean = false;
    releases: Array<any> = [];
    url: string = environment.src_url;

    constructor(
        private eventService: EventService,
        public fileService: FileService,
        private router: Router,
        private metadataService: MetadataService
    ) {}

    ngOnInit() {
        this.getBySlug();
    }

    getBySlug() {
        this.eventService
            .getDescriptionBySlug(this.router.url)
            .subscribe((data: any) => {
                this.events = data;

                const title = 'Evento - Honda Sala de Imprensa';
                this.metadataService.updateMetadata({
                    title,
                });
                this.id = data[0]?.nid;
                if (this.id) {
                    this.loadGeneralInfos();
                    this.loadReleases();
                }
            });
    }

    loadGeneralInfos() {
        this.eventService.getGeneralInfos(this.id).subscribe((data: any) => {
            this.generalInfo = data[0];
        });
    }

    loadReleases() {
        this.eventService.getReleases(this.id).subscribe((data: any) => {
            data.rows.forEach((item: any) => {
                this.releases.push(item);
            });
        });
    }

    openShare() {
        this.seeButtonsShare = !this.seeButtonsShare;
    }

    addToCart(id, title) {
        const info = {
            title,
            type: 'Release',
        };
        this.fileService.setCart('files', info, id);
    }
}
