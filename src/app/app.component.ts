import { animate, style, transition, trigger } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('opacityInOut', [
        transition('* <=> *', [
            style({ opacity: 0 }),
            animate('0.25s linear', style({ opacity: 1 }))
        ])
    ]),
  ]
})
export class AppComponent implements OnInit {
    constructor(
        private meta: Meta,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    ngOnInit() {
        if(window.location.host == 'prodsalaimp.honda.com.br') {
            this.meta.addTag({ name: 'robots', content: 'noindex, nofollow' });
            this.meta.addTag({ name: 'googlebot', content: 'noindex, nofollow' });
        }

        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        }
    }
    onActivate(event: any) {
        if (isPlatformBrowser(this.platformId)) {
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 50);
        }

    }
    prepareAnimation(outlet: RouterOutlet) {
        return (outlet && outlet.isActivated ? outlet.activatedRoute : '');
    }
}
