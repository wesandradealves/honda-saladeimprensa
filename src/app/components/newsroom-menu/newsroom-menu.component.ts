import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'src/app/models/page';
import { PageService } from 'src/app/services/page.service';

@Component({
    selector: 'newsroom-menu',
    templateUrl: './newsroom-menu.component.html',
    styleUrls: ['./newsroom-menu.component.scss'],
})
export class NewsroomMenuComponent implements OnInit {
    pages!: Page[];
    showSubmenu: boolean = false;
    emptyMask: any;
    isMobile = false;

    constructor(
        private breakpointObserver: BreakpointObserver,
        private pageService: PageService
    ) {}

    ngOnInit() {
        this.loadPages();
        this.breakpointObserver
            .observe(['(max-width: 992px)'])
            .subscribe((state: BreakpointState) => {
                this.isMobile = state.matches;
            });
    }

    loadPages() {
        this.pageService
            .getPages()
            .subscribe((result) => (this.pages = result));
    }
    closeMenu() {
        this.showSubmenu = false;
    }
    showMenu() {
        this.showSubmenu = true;
    }

    toggleSubmenu() {
        this.showSubmenu = !this.showSubmenu;
    }

    onMenuMouseOver() {
        if (!this.isMobile) {
            this.toggleSubmenu();
        }
    }
}
