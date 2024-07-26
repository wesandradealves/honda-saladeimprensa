import { Component, OnInit } from '@angular/core';

declare let $: any;

@Component({
    selector: 'info-notification',
    templateUrl: './info-notification.component.html',
    styleUrls: ['./info-notification.component.scss'],
})
export class InfoNotificationComponent implements OnInit {
    cookieConsent: Boolean = false;
    constructor() {}

    ngOnInit() {
        this.toggleInfo();
    }

    toggleInfo() {
        if (localStorage.getItem('show-warning') != 'true') {
            document
                .querySelector('.info-notification')
                .classList.add('active');
        }
        const acceptCookies = () => {
            document
                .querySelector('.info-notification')
                .classList.remove('active');
            localStorage.setItem('show-warning', 'true');
        };

        const btnCookies = document.querySelector('.btn-close');
        btnCookies.addEventListener('click', acceptCookies);
    }

    closeInfo() {
        this.cookieConsent = !this.cookieConsent;
        document.querySelector('.info-notification').classList.remove('active');
        localStorage.setItem('show-warning', 'true');
    }
}
