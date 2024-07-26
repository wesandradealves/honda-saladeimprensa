import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { PageService } from 'src/app/services/page.service';
import { environment } from '../../../environments/environment';
import { MetadataService } from 'src/app/services/metadata.service';
import { BannerService } from 'src/app/services/banner.service';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
    contact: Contact;
    url: string = environment.src_url;
    bannerUrl: string;
    bannerTitle: string;

    constructor(
        private pageService: PageService,
        private bannerService: BannerService,
        private metadataService: MetadataService
    ) {}

    ngOnInit() {
        this.loadContacts();
        this.bannerService.getContactBanner().subscribe((data) => {
            if (data.length) {
                this.bannerUrl = this.url + data[0].field_imagem_desktop;
                this.bannerTitle = data[0].title;
            }
        });

        this.metadataService.updateMetadata({
            title: 'Contatos - Honda Sala de Imprensa',
            description: 'Contatos - Honda sala de Imprensa',
            image: this.url + '/assets/img/honda_logo_thumb.png',
        });
    }

    loadContacts() {
        this.pageService.getContacts().subscribe((data: any) => {
            this.contact = data[0];
        });
    }
}
