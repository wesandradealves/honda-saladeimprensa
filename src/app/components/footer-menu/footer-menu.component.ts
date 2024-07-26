import { Component, OnInit } from '@angular/core';
import { FooterMenu } from 'src/app/models/footer-menu';
import { FooterService } from 'src/app/services/footer.service';

@Component({
    selector: 'footer-menu',
    templateUrl: './footer-menu.component.html',
    styleUrls: ['./footer-menu.component.scss']
})
export class FooterMenuComponent implements OnInit {

    menuItems: Array<FooterMenu> = [];
    menuItemsOther: Array<any> = [];

    constructor(private footerService: FooterService) { }

    ngOnInit() {
        this.loadMenu();
        this.loadMenuOther();
    }

    loadMenu() {
        this.footerService.getFooterMenu()
        .subscribe((data: any) => {
          data.forEach((item:any) => {
            this.menuItems.push(item);
          })
        })
        // console.log(this.menuItems);
    }

    loadMenuOther() {
        this.footerService.getFooterMenuOther()
        .subscribe((data: any) => {
          data.forEach((item:any) => {
            this.menuItemsOther.push(item);
          })
        })
        // console.log(this.menuItems);
    }
}
