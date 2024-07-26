import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'src/app/models/page';
import { PageService } from 'src/app/services/page.service';

@Component({
    selector: 'modal-corp-menu',
    templateUrl: './modal-corp-menu.component.html',
    styleUrls: ['./modal-corp-menu.component.scss']
})

export class ModalCorpMenuComponent implements OnInit {

    pages!: Page[]

    constructor(
        private pageService: PageService) { }

    ngOnInit() {
        this.loadPages();
    }

    loadPages() {
        this.pageService.getPages()
            .subscribe(result => this.pages = result)
    }

}
